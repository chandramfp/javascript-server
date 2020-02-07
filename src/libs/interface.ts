interface Ipermission {
    getUsers: Ipermi;
}
interface Ipermi {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
}
export default Ipermission ;