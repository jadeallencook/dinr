import dinners from '../assets/dinners-snapshot.json';

export default (uri: string): any => {
    if (!uri) {
        return false;
    }
    const parts = uri.split('/');
    let listing = dinners;
    parts.forEach(part => {
        if (!listing[part]) {
            return false;
        } else {
            listing = listing[part];
        }
    })
    return listing;
}