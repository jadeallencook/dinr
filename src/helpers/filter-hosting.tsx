/*

filters out reservations before the current date
example: if today was 3/8/2020

{
  "3_7_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2": "sanjose_ca_3_2020/3_7_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2"
  "3_9_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2": "sanjose_ca_3_2020/3_9_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2"
} => [
  "sanjose_ca_3_2020/3_9_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2"
]
*/

export default (listings: object): string[] => {
  return Object.keys(listings)
    .filter((key: string) => {
      const listing = listings[key];
      const array = listing.split(/[_/]+/);
      const date = new Date(
        `${array[4]}/${array[5]}/${array[6]} ${array[7]}:${array[8]} ${array[9]}`
      );
      return date >= new Date() ? listing : null;
    })
    .map(key => listings[key]);
};
