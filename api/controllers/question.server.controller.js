var Question = require('mongoose').model('Question');
var Database = require('../models/postgres.server.model');

exports = module.exports = {};

exports.createQuestion = function(req, res, next) {

    var tables = {};

    var question = new Question({
        title: req.body.title,
        background: req.body.background,
        creationScript: req.body.creation,
        populateScript: req.body.populate,
        author: req.body.author,
        taskList: req.body.taskList,
        tags: req.body.tags
    });



    Database.getTables(req.body.creation).then(function(data){

        var response = {};

        data.forEach(function(x){
            if(!response[x.table_name]){
                response[x.table_name] = [];
                response[x.table_name].push(x.column_name);
            }else{
                response[x.table_name].push(x.column_name);
            }
        })

        tables = [];

        for(var table in response){
            tables.push({
                table: table,
                columns: response[table]
            })
        }

        question.tables = tables;

        question.save(function(err, addedQuestion) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    success:true,
                    questionId: addedQuestion._id
                });
            }
        });

    }).catch(function(error){

        if(error.code == "42601"){
            res.status(500).json({
                success:false,
                erro: "Syntax Error"
            })
        }else{
            res.status(500).json({
                success:false,
                erro: error
            })
        }
    })



};

exports.questionsPaginated = function(req, res){

    var query = {};
    var options = {};

    options.page = req.query.page;
    options.limit = 10;
    options.select = "title tags author updated";

    if(req.query.title){
        query.title = { "$regex": req.query.title };
    }

    if(req.query.sort){
        options.sort = {"date": req.query.sort};
    }

    if(req.query.author){
        query.author = req.query.author;
    }

    if(req.query.tags){
        //If only one tag, put into an array: $in only accepts arrays
        if(req.query.tags.constructor !== Array){
            req.query.tags = [req.query.tags];
        }
        query.tags = { "$in": req.query.tags};
    }


    Question.paginate(query, options, function(err, result){
        if(err){
            res.status(500).json({
                message: err.message
            });
        }else{
            console.log(result);
            res.status(200).json({
                success:true,
                questions: result
            });
        }
    });

}

exports.question = function(req,res){
    if(req.question){
        res.status(200).json({
            success: true,
            question: question
        });
    }
    else{
        res.status(400).json({
            message: "Questao nao encontrada"
        });
    }

}

exports.getQuestionById = function(req, res){
    var _id = req.params.id;
    Question.findOne({_id: _id}, function(err, question){
        req.question = question;
    });
    next();
}

exports.answer = function(req, res){

}
