const validation = {
    create: {
        address: {
            required: true,
            in: ['body'],
            string: true,
            errorMessage: 'Address is required',
        },
        email: {
            required: true,
            string: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/,
            in: ['body'],
            errorMessage: 'Email is required',
        },
        mobileNumber: {
            required: true,
            number: true,
            in: ['body'],
            errorMessage: 'Number is required',
        },
        hobbies: {
            in: ['body'],
            required: true,
            isObject: true,
            errorMessage: 'Hobbies is required'
        },
        role: {
            in: ['body'],
            required: true,
            isObject: true,
            errorMessage: 'Role is required'
        },
        password: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Password is required'

        },
        name: {
            required: true,
            regex: /^[a-zA-Z ]{2,30}$/,
            in: ['body'],
            errorMessage: 'Name is required',

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