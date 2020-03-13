import { Request, Response, NextFunction } from 'express';

function checkRegex(stringtovalidate: string, regex: RegExp): boolean {
    return regex.test(stringtovalidate);
}


let errorMsg: any = [];
const errorchecker = (validationRuleserror: any, validateKeyerror: any) => {
    if (Object.keys(validationRuleserror).includes('errorMessage')) {
        errorMsg.push(validationRuleserror.errorMessage);
    } else if (Object.keys(validationRuleserror).includes('custom')) {
        errorMsg.push(validationRuleserror.custom(validateKeyerror));
    } else {
        errorMsg.push('error is occured');
    }
};




const validateData = (validationRules, dataToValidate, validateKey) => {
    let requireFlag = false;

    if (Object.keys(validationRules).includes('required')) {
        if (validationRules.required === true) {
            requireFlag = true;
        } else if (validationRules.required === false || Object.keys(dataToValidate).includes(validateKey)) {
            requireFlag = true;
        }
    }



    if (requireFlag === true) {
        if (
            Object.keys(validationRules).includes('string') &&
            (typeof dataToValidate[validateKey] !== 'string')
        ) {

            errorchecker(validationRules, validateKey);
        }
        // console.log(dataToValidate)
        if (
            Object.keys(validationRules).includes('number') &&
            (isNaN(parseInt(dataToValidate[validateKey])))
        ) {
            errorchecker(validationRules, validateKey);
        }
        if (
            Object.keys(validationRules).includes('isObject') &&
            (validationRules.isObject === true && typeof dataToValidate[validateKey] !== 'object')
        ) {
            errorchecker(validationRules, validateKey);
        }
        if (
            Object.keys(validationRules).includes('regex')
            && !checkRegex(dataToValidate[validateKey], validationRules.regex)
        ) {
            errorchecker(validationRules, validateKey);
        }
    }
}

export default (config: object) => (req: Request, res: Response, next: NextFunction): void => {
    errorMsg = [];
    const dataFromBody: any = req.body;
    const dataFromParams: any = req.params;
    const dataFromQuery: any = req.query;

    const validationKeys: any = Object.keys(config);


    validationKeys.forEach(validateKey => {
        const validationRules = config[validateKey];


        if (Object.keys(validationRules).includes('in')) {

            if (validationRules.in.includes('body') && Object.keys(dataFromBody).includes(validateKey)) {

                validateData(validationRules, dataFromBody, validateKey)
            } else if (validationRules.in.includes('params') && Object.keys(dataFromParams).includes(validateKey)) {

                validateData(validationRules, dataFromParams, validateKey)
            } else if (validationRules.in.includes('query') && Object.keys(dataFromQuery).includes(validateKey)) {

                validateData(validationRules, dataFromQuery, validateKey)
            } else if (validationRules !== 'skip' && validationRules !== 'limit') {
                req.query = {
                    ...req.query,
                    skip: '0',
                    limit: '10'
                };

            }

        }





    });
    if (errorMsg.length > 0) {
        res.send(errorMsg);
    } else {
        next();
    }

};