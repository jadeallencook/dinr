import {Time} from '../interfaces';

export default (military: Time): string => {
    return military == 0 ? `12:00AM` : military == 12 ? '12:00PM' : military > 12 ? `${military-12}:00PM` : `${military}:00AM`;
}