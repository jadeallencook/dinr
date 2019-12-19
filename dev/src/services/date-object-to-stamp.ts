import { Date } from '../interfaces';

export default (date: Date): string => {
    let { month, day, year } = date;
    const dayString = day < 10 ? `0${day}`: day;
    const monthString = month < 10 ? `0${month}`: month;
    return `${monthString}/${dayString}/${year}`;
}