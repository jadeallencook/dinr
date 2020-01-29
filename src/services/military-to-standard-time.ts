import {Time} from '../interfaces';

export default (military: Time): string => {
    if (military === 0) {
        return `12:00AM`;
    } else if (military < 1200) {
        return `${military}:00AM`;
    } else if (military === 1200) {
        return `12:00PM`;
    } else {
        return `${military-12}:00PM`;
    }
}