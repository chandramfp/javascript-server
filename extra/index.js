import  { diamond, equilateral }  from "./patterns/index"; 

import { haspermission, validateUsers } from "./utils";
import { users } from "./constants"


diamond(Number(process.argv[2]));
equilateral(Number(process.argv[3]));

let temp = haspermission("getUsers","trainer","read");
console.log(temp);

validateUsers(users);