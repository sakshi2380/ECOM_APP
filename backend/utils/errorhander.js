class ErrorHandler extends Error{
    constructor(message,statusCode,...params){
        super(message,...params);
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor);
    }
    
}

module.exports = ErrorHandler