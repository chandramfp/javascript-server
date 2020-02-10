const validation = {
    create: {
        name: {
            required: true,
            regex: /^[a-zA-Z ]{2,30}$/,
            in: ['body'],
            errorMessage: 'Name is required'
            
        },
        address: {
            required: false,
            in: ['body'],
            errorMessage: 'Address is required'


        },
        email: {
            required: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/,
            in: ['body'],
            errorMessage: 'email is required'

        },
        
        mobile: {
            required: false,
            number: true,
            in: ['body'],
            errorMessage: 'MobileNumber is required'
        },
        hobbies: {
            required: false,
            in: ['body'],
            errorMessage: 'hobbie is required'


        }
    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params'],
            custom: function (dataToUpdate) {
                console.log('dataToUpdate', dataToUpdate); throw {
                    error: "Id is required",
                    timestamp: new Date(),
                    status: 500,
                }

            },
        }
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
            
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
            
        }
    },
    update: {
        id: {
            required: true,
            string: true,
            in: ['body'],
            

        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: function (dataToUpdate) {
                console.log('dataToUpdate', dataToUpdate); throw {
                    message: "Id is required",
                    timestamp: new Date(),
                    status: 500,
                }

            },
        }
    }
}


export default validation;