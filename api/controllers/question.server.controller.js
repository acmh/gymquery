var Question = require('mongoose').model('Question');
var Database = require('../models/postgres.server.model');
var User = require('mongoose').model('User');
var parser = require('pg-query-parser');
var async = require('async');

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

    var query_creation = parser.parse(question.creationScript);
    var query_populate = parser.parse(question.populateScript);

    var tables = [];

    if(query_creation.error == undefined && query_populate.error == undefined){

      async.series([
        function(callback){

          for(var i = 0; i < query_creation.query.length; i++){

            var columns = [];

            if(query_creation.query[i].CreateStmt){
              //console.log(query_creation.query[i].CreateStmt.tableElts);
              for(var j = 0; j < query_creation.query[i].CreateStmt.tableElts.length; j++){
                columns.push(query_creation.query[i].CreateStmt.tableElts[j].ColumnDef.colname);
              }

              tables.push({
                table: query_creation.query[i].CreateStmt.relation.RangeVar.relname,
                columns: columns
              });
            }

            if(i + 1 == query_creation.query.length){
              question.tables = tables;
              callback();
            }
          }

        }
      ], function(){

        question.save(function(err, addedQuestion) {
              if (err) {
                  return next(err);
              } else {
                User.findOneAndUpdate({email: req.decoded.email}, {"$inc": {"contributions": 1}} ,function(err){
                  if(err){
                    res.status(500).json({
                      success: false,
                      error: err.message
                    })
                  }else{
                    res.status(200).json({
                        success:true,
                        questionId: addedQuestion._id
                    });
                  }
                });
              }
          });
      })
    }else{
      res.status(500).json({
        success: false,
        error: "Erro de Sintaxe, verifique o seu script"
      })
    }




};

exports.questionsPaginated = function(req, res){

    var query = {};
    var options = {};

    options.page = req.query.page;
    options.limit = 10;
    options.select = "title tags author updated";

    if(req.query.title){
        query.title = {"$regex": req.query.title, "$options": "i"};
    }

    if(req.query.sort){
        options.sort = {"date": req.query.sort};
    }

    if(req.query.author){
        query.author = {"$regex": req.query.author, "$options": "i"};
    }

    if(req.query.tags){
        //If only one tag, put into an array: $in only accepts arrays
        if(req.query.tags.constructor !== Array){
            req.query.tags = [req.query.tags];
        }
        query.tags = { "$in": req.query.tags};
    }

    Question.paginate(query,options, function(err, result){
        if(err){
            res.status(500).json({
                message: err.message
            });
        }else{

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
            question: req.question
        });
    }
    else{
        res.status(400).json({
            message: "Questao nao encontrada"
        });
    }

}

exports.getQuestionById = function(req, res, next){
    var _id = req.params.id;

    Question.findOne({_id: _id}, function(err, question){
        req.question = question;
        next();
    });

}

exports.answer = function(req, res){
    var id = req.params.id;
    var taskID = req.body.taskID;
    var answer = req.body.answer;

    Question.findOne({_id: id}, 'creationScript populateScript taskList', function(err, question){
        if(err){
            res.status(500).json({
                success: false,
                error: err.message
            })
        }else if(question == null){
            res.status(200).json({
                success: false,
                message: "Questão não encontrada"
            })
        }else{
            var taskList;

            //Pego o taskList escolhido pelo usuario
            for(var i = 0; i < question.taskList.length; i++){
                if(taskID == question.taskList[i]._id){
                    taskList = question.taskList[i];
                }
            }

            Database.getQuestionVeredict(question.creationScript, question.populateScript, taskList, answer);
    //         .then(function(result){
    //             var veredict = JSON.stringify(result[0]) === JSON.stringify(result[1])
    //             if(veredict){
    //               User.findOneAndUpdate({email: req.decoded.email}, {"$inc": {"acc": 1}} ,function(err){
    //                 if(err){
    //                   res.status(500).json({
    //                     success: false,
    //                     error: err.message
    //                   })
    //                 }
    //               });
    //               res.status(200).json({
    //                   message: "Correct Answer",
    //                   success: true
    //               });
    //             }else{
    //               User.findOneAndUpdate({email: req.decoded.email}, {"$inc": {"tried": 1}} ,function(err){
    //                 if(err){
    //                   res.status(500).json({
    //                     success: false,
    //                     error: err.message
    //                   })
    //                 }
    //               });
    //
    //               res.status(200).json({
    //                   message: "Wrong Answer",
    //                   success: true
    //               })
    //             }
    //         }).catch(function(error){
    //             res.status(500).json({
    //                 success:false,
    //                 error: error
    //             })
    //         })
    //
         }
     })
  }
