// 1 => false
// 12345 => true

import zipcodes from '../assets/zipcodes.json';

export default (zipcode: string | number): boolean => {
    return zipcodes[zipcode.toString()] ? true : false; 
}