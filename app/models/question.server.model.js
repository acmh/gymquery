var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    title: String,
    creationScript: String,
    populateScript: String
    //questionList: [{question:String, answer: String}]
});

//PRE MIDDLEWARE FOR QUESTION VALIDATION
QuestionSchema.pre('save',
	function(next) {
				next();
	}
);


mongoose.model('Question', QuestionSchema);
