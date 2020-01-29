// 48708 => Bay City, MI

import * as zipcodes from '../assets/zipcodes.json';

export default (zipcode: number): string | false => {
    let city = zipcodes[zipcode];
    return city || false;
}