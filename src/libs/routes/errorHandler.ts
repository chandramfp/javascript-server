const errorHandler = (err, req, res, next) => {
    console.log('Error', err);
    res.send({
        error: err.error,
        message: err.error || err.message,
        status: err.code,
        timestamp: new Date()
    });
};
export default errorHandler;