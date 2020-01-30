// const isValidUser: number;
// const isInvalidUse: number;
function validateEmail(email: string): boolean {
    const re: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    const temp: boolean = re.test(email);
    return temp;
}
export { validateEmail };

