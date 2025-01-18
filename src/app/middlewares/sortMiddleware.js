module.exports = function sortMiddleware(req,res,next) {
    res.locals._Sort = {
        enable: false,
        type: "default",
    };

    if(req.query.hasOwnProperty("_Sort")){
        Object.assign(res.locals._Sort,{
            enable: true,
            type: req.query.type,
            column: req.query.column
        });
    }

    next();
}