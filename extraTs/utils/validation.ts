import { validateEmail } from './helpers';
import { Iusers } from '../interfaces';
let validUserCount = 0;
let invalidUserCount = 0;
const isValidUser = [];
const isInvalidUser = [];
export default function validateUsers(users: Iusers[]): void {
    users.forEach((element: any) => {
        const { traineeEmail, reviewerEmail } = element;
        const check = validateEmail(traineeEmail);
        if (check === true) {
            isInvalidUser.push(traineeEmail);
            validUserCount++;
        }
        else {
            invalidUserCount++;
            isInvalidUser.push(traineeEmail);
        }
        const check1 = validateEmail(reviewerEmail);
        if (check1 === true) {
            validUserCount++;
            isValidUser.push(reviewerEmail);
        }
        else {
            invalidUserCount++;
            isInvalidUser.push(reviewerEmail);
        }
    });
    console.log('validUserCount: ' + validUserCount);
    console.log('invalidUserCount: ' + invalidUserCount);
    console.log('validUser: ' + isValidUser);
    console.log('invalidUser: ' + isInvalidUser);
}

