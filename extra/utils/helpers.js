let isValidUser;
let isInvalidUse
function validateEmail(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    let temp = re.test(email);

   
    return temp;

}
export { validateEmail }

