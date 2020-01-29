export default class Profile {
    name: string | null;
    zipcode: number | null;
    uid: string | null;
    address: string | null;

    constructor({ name, zipcode, uid, address }: {
        name: string | null;
        zipcode: number | null;
        uid: string | null;
        address: string | null;
    }) {
        this.name = name || null;
        this.zipcode = zipcode || null;
        this.uid = uid || null;
        this.address = address || null;
    }
}