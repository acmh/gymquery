var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var SubmissionSchema = new Schema({
    date: {type: Date, default: Date.now},
    userId: {type: Schema.Types.ObjectId},
    code: {type: String},
    veredict: {type: String},
    questionId: {type: Schema.Types.ObjectId},
    taskId: {type: Schema.Types.ObjectId}
});

mongoose.model('Submission', SubmissionSchema);
