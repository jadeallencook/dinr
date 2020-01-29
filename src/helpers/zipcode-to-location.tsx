// 48708 => Bay City, MI

import zipcodes from '../assets/zipcodes.json';

export default (zipcode: number): string | false => {
    let city = zipcodes[zipcode.toString()];
    return city || false;
}