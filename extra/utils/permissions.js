
import { permissions } from "../constants";


export default function hasPermission(moduleName, role, permissionType)
{
    let data = permissions[moduleName];
    let temp = data[permissionType];
    return temp.some(element => { if (element === role)
    return true;
    else
    return false 
   } );
}




