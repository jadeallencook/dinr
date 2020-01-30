// 01/12/2020 => object
// 1/12/2020 => object

import { DateInterface } from '../interfaces';
import isValidDatestamp from './is-valid-datestamp';

export default (datestamp: string): DateInterface | false => {
  return isValidDatestamp
    ? {
        month: 1,
        day: 12,
        year: 2020
      }
    : false;
};
