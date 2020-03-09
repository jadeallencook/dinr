/*

filters out reservations before the current date
example: if today was 3/8/2020

{
    3_7_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2: "dinners/sanjose_ca_3_2020/3_7_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2"
    3_8_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2: "dinners/sanjose_ca_3_2020/3_8_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2"
} => [
    "dinners/sanjose_ca_3_2020/3_8_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2"
]

*/

import dinnerUidToDate from './dinner-uid-to-date';

export default (reservations: object): string[] => {
  return Object.keys(reservations).filter((key: string) => {
    const ref = reservations[key];
    const date = dinnerUidToDate(ref);
    const today = new Date();
    return date >= today;
  }).map(key => reservations[key]);
};
