import Ipermission from '../libs/interface'
const permissions: Ipermission = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer','head-trainer'],
        write: ['trainer','head-trainer'],
        delete: ['head-trainer'],
    }
};

export default permissions;