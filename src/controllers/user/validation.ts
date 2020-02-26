const validation = {
    login: {
        email: {
            required: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/,
            in: ['body'],
            errorMessage: 'email is required'

        },
        password: {
            required: true,
            errorMessage: 'Password is required'
        }
    }
};
export default validation;