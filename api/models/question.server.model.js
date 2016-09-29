var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');

var QuestionSchema = new Schema({
    title: String,
    background: String,
    creationScript: {type: String, select: false},
    populateScript: {type: String, select: false},
    author: String,
    updated: {type: Date, default: Date.now},
    taskList: [{task:String, answer: {type:String, select: false}}],
    tags: [String]
});

QuestionSchema.plugin(mongoosePaginate);

//PRE MIDDLEWARE FOR QUESTION VALIDATION
QuestionSchema.pre('save',
	function(next) {
				next();
	}
);

mongoose.model('Question', QuestionSchema);
