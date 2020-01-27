
const permissions =
{
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: [],
    }

};

function hasPermission(moduleName, role, permissionType)
{
    let data = permissions[moduleName];
    let temp = data[permissionType];
    return temp.some(element => { if (element === role)
    return true;
    else
    return false 
   } );
}
//console.log(hasPermission("getUsers","tra","read"));
let result = (hasPermission("getUsers","trainer","read"));
console.log(result)