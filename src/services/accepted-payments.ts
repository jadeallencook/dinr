import { Payment } from '../interfaces';

export default (payments: Payment): string => {
    let filtered = Object.keys(payments)
        .filter(key => payments[key])
        .map(string => {
            if (string === 'paypal') {
                return 'PayPal';
            } else if (string === 'cashapp') {
                return 'Cash App';
            } else {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        });

    if (filtered.length === 1) {
        return `Only ${filtered[0]}`
    } else if (filtered.length === 2) {
        return `${filtered[0]} and ${filtered[1]}`;
    } else if (filtered.length > 2) {
        filtered[filtered.length - 1] = `and ${filtered[filtered.length - 1]}`;
        return filtered.join(', ');
    } else {
        return `No Payment`;
    }
}