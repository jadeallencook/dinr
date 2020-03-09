/*

filters out reservations before the current date
example: if today was 3/8/2020

"dinners/sanjose_ca_3_2020/3_7_2020_6_00_PM_nfYF8vwm8MUCXR6ixTFxMAYlqjw2"
=> new Date("3/7/2020 6:00 PM")

*/

export default (ref: string): Date | null => {
  if (!ref || ref.split('/').length < 3) {
    return null;
  }
  const uid = ref.split('/')[2];
  const x = uid.split('_');
  return new Date(`${x[0]}/${x[1]}/${x[2]} ${x[3]}:${x[4]} ${x[5]}`);
};
