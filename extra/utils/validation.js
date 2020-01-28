let validUserCount = 0;    //for number of  valid user 
let invalidUserCount = 0;  //for number of invalid user

let isValidUser = [];    
let isInvalidUser = [];

import  { validateEmail } from "./helpers";

export default function validateUsers(users){
    
   users.forEach(element => {

       const {traineeEmail, reviewerEmail} = element;

       let check = validateEmail(traineeEmail);

       if(check == true){
       isInvalidUser.push(traineeEmail);
       validUserCount++;
       }
       else{
       invalidUserCount++;
       isInvalidUser.push(traineeEmail);
       }
       let check1 = validateEmail(reviewerEmail);

       if(check1 == true){
        validUserCount++;
        isValidUser.push(reviewerEmail);

       }
       
       else{
        invalidUserCount++;
        isInvalidUser.push(reviewerEmail);

       }
       

   });


    console.log("validUserCount: " + validUserCount);
    console.log("invalidUserCount: " + invalidUserCount);

    console.log("validUser: " + isValidUser);
    console.log("invalidUser: " + isInvalidUser);
}

