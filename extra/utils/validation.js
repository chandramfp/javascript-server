let validUserCount = 0;    //for number of  valid user 
let invalidUserCount = 0;  //for number of invalid user

let isValidUser = [];    
let isInvalidUser = [];

let users = [ {

    traineeEmail: 'trainee1@suessive.tech',
    reviewerEmail: 'reviewer1@successive.tech',

    },
    {

        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    
    },
    {

        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
        
    },
    {

        traineeEmail: 'trainecessive.tech',
        reviewerEmail: 'reviewccessive.tech',
        
    },
];



function validateEmail(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    temp = re.test(email);

    if(temp == true)
    isValidUser.push(email);
    else
    isInvalidUser.push(email);

    return temp;

}


function validateUsers(users){
    
   users.forEach(element => {

       const {traineeEmail, reviewerEmail} = element;

       let check = validateEmail(traineeEmail);

       if(check == true)
       validUserCount++;
       else
       invalidUserCount++;

       let check1 = validateEmail(reviewerEmail);

       if(check1 == true)
       validUserCount++;
       else
       invalidUserCount++;

   });

}

validateUsers(users);

console.log("validUserCount: " + validUserCount);
console.log("invalidUserCount: " + invalidUserCount);

console.log("validUser: " + isValidUser);
console.log("invalidUser: " + isInvalidUser);





