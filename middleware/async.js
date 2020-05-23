function asyncMiddleware(handler) {
    //return factory that creates a route handler
    //whihc express would call and pass the req, res, and next() 
    //parameters for us, at runtime.
    return async (req, res, next) => {
        try {
            return await handler(req, res);
        } catch (ex) {
            //because in index.js we registerd our error middleware after all 
            //the existing middleware functions, when we call next we would
            //end up in our error handler middlware, and the exception we
            //pass to next, would be the first argument of the error middleware function
            next(ex);
        }
    }
}

module.exports = asyncMiddleware;