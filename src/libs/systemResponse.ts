class SystemResponse {
    static success = (res, data, message ='sucess') =>{
        return res.status(200).send({
            status: 'Ok',
            message,
            data
        })
    }
}

export default SystemResponse;