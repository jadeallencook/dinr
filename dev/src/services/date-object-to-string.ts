import { Date } from '../interfaces';

export default (date: Date): string => {
    let { month, day, year } = date;
    return `${month}${day.length === 1 ? `0${day}`: day}${year}`;
}