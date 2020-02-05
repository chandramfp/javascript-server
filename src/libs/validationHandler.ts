import { Request, Response, NextFunction } from 'express';
function checkRegex(stringtovalidate: string, regex: RegExp): boolean {
    return regex.test(stringtovalidate);
}
export default (config: object) => (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate: any = req.body;
    const dataFromParams: any = req.params;
    const dataFromQuery: any = req.query;
    const errorMsg: any = [];

    console.log('CONFIG', config);
    console.log('Body', dataToValidate);
    const validationKeys: any = Object.keys(config);
    validationKeys.forEach(validateKey => {
        const validationRules = config[validateKey];
        let requireFlag = false;
        const errorchecker = ( validationRuleserror: any , validateKeyerror: any) => {
            if (Object.keys(validationRuleserror).includes('errorMessage')) {
                errorMsg.push(validationRuleserror.errorMessage);
            }
            else if ( Object.keys(validationRuleserror).includes('custom')) {
                errorMsg.push(validationRuleserror.custom(validateKeyerror));
            }
            else {
                errorMsg.push('error is occured');
            }
            };

    if (Object.keys(validationRules).includes('in')) {
        if (
                (validationRules.in.includes('body') && Object.keys(dataToValidate).includes(validateKey))
                || (validationRules.in.includes('param') && Object.keys(dataFromParams).includes(validateKey))
                || (validationRules.in.includes('query') && Object.keys(dataFromQuery).includes(validateKey))
            ) {
                    if (Object.keys(validationRules).includes('required') )  {
                        if (validationRules.required === true) {
                            requireFlag = true;
                        } else if (validationRules.required === false || Object.keys(dataToValidate).includes(validateKey) ) {
                            requireFlag = true;
                          }
                    }
                if (requireFlag === true) {
                    if (Object.keys(validationRules).includes('string')) {
                        if ( typeof dataToValidate[validateKey] === 'string' ) {//
                        }
                        else {
                            errorchecker (validationRules, validateKey );
                        }
                    }
                    if (Object.keys(validationRules).includes('number')) {
                        if (validationRules.number === true && typeof dataToValidate[validateKey] === 'number' ) {//
                        }
                        else {
                            errorchecker (validationRules, validateKey );
                        }
                    }
                    if (Object.keys(validationRules).includes('isObject')) {
                        if (validationRules.number === true && dataToValidate[validateKey]  === true ) {//
                        }
                        else {
                            errorchecker (validationRules, validateKey );
                        }
                    }
                    if (Object.keys(validationRules).includes('regex')) {
                        if (checkRegex(dataToValidate[validateKey], validationRules.regex) ){//
                        }
                        else {
                            errorchecker (validationRules, validateKey );
                        }
                    }
                    if (Object.keys(validationRules).includes('default')) {
                        if ( (validationRules.default === '0' && dataToValidate[validateKey] === 'skip' )
                        || (validationRules.default === '10' && dataToValidate[validateKey] === 'limit' )) {//
                        }
                        else {
                            errorchecker (validationRules, validateKey );
                        }
                    }
                }
        }
                else  {
                    errorchecker (validationRules, validateKey );
                }
    }
  });
   res.send(errorMsg)
   console.log('errors', errorMsg );
   next();
};