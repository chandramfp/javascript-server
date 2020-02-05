interface Iusers {
    reviewerEmail: string;
    traineeEmail: string;
}
interface Ipermission {
    getUsers: Ipermi;
}
interface Ipermi {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
}
export { Iusers, Ipermission };