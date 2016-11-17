exports = module.exports = {};

exports.allowStudent = function(req, res, next){
    if(req.decoded.role == req.app.get("STUDENT_ROLE")){
        next();
    }else{
        res.status(400).json({
            message: "You don't have the permision to access this route",
            success: false
        })
    }
}

exports.allowMonitor = function(req, res, next){
    if(req.decoded.role == req.app.get("MONITOR_ROLE")){
        next();
    }else{
        res.status(400).json({
            message: "You don't have the permision to access this route",
            success: false
        })
    }
}
