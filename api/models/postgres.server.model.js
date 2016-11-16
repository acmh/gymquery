var pgp = require('pg-promise')({
    disconnect: function(client, dc) {
       var cp = client.connectionParameters;
       console.log("Disconnecting from database:", cp.database);
    }
});
var Question = require('mongoose').model('Question');

var config = {
  user: 'postgres',
  database: 'questoes',
  password: 'root',
  host: 'localhost',
  port: 5432,
  poolSize: 10, // max number of clients in the pool
};

exports = module.exports = {};

exports.init = function(done){
    var pool = pgp(config);
    done();
}

exports.db = function getDb(){
    return exports.__pool || (exports.__pool = pgp(config));
}

exports.getTables = function(queryString){
    var db = exports.db();

    var idx = 0;
    var tables = {};
    var erro = {};
    var queryArray = queryString.split(";");
    var queries = [];
    var columns_queries = [];

    queryArray.forEach(function(query){
        query = query.toLowerCase();

        if(idx = query.indexOf("create") > -1){

            //No final da transação espera-se que a tabela tenha sido deletada
            query = query.substring(0, idx + 6) + "temporary" + query.substring(idx + 5, query.length);

            var tableName = query.split(" ");

            //Possivelmente o nome da tabela
            tableName = tableName[3];

            //console.log(tableName);

            if(tableName.indexOf('(') > -1){
                var sidx = tableName.indexOf('(');
                var fidx  = tableName.length;

                tableName = tableName.replace(tableName.substring(sidx, fidx),"");
            }

            var column_query = "SELECT * FROM information_schema.columns WHERE table_name = \'" + tableName + "\'";

            queries.push({query: query});
            columns_queries.push({query: column_query});
        }
    });

        var q = pgp.helpers.concat(queries);
        var f = pgp.helpers.concat(columns_queries);

        return db.task(function(t){
            return t.none(q).then(function(){
                return t.any(f);
            })
        })
}

exports.getQuestionVeredict = function(creationScript, populateScript, taskList, answer){
    var db = exports.db();

    var queries = [];

    creationScript = creationScript.split(';');
    populateScript = populateScript.split(';');

    creationScript.forEach(function(query){
        query = query.toLowerCase();
        if(idx = query.indexOf("create") > -1){
            //No final da transação espera-se que a tabela tenha sido deletada
            query = query.substring(0, idx + 6) + "temporary" + query.substring(idx + 5, query.length);
        }
        queries.push({query:query});
    })

    var q = pgp.helpers.concat(queries);
    var p = pgp.helpers.concat(populateScript);

    var monitorAnswer, studentAnswer;

    return db.tx(function(t){
        var queries = [];
        queries.push(
            this.task(function(t){
               return t.none(q).then(function(){
                   return t.none(p).then(function(){
                       return t.any(taskList.answer);
                   })
               })
           })
        )
        queries.push(
            db.task(function(z){
               return z.none(q).then(function(){
                   return z.none(p).then(function(){
                       return z.any(answer);
                   })
               })
           })
        )
        return this.batch(queries);

    })

}
