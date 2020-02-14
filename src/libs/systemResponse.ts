class SystemResponse {
    static success = (res, data, message ='sucess') =>{
        return res.status(200).send({
            status: 'Ok',
            message,
            data
        })
    }
    static error = (res: any , data: any, message: any = 'error occured'): any => {
        return res.status(500).send({
            status: 'not ok',
            message,
            data

        });
      }
}

export default SystemResponse;