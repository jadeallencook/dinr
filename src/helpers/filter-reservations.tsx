/*

filters out reservations before the current date
example: if today was 3/8/2020

{
    -M1kmBUpkZ8nQSZG4T4F: "dinners/sanjose_ca_3-7-2020/-M1kmBUpkZ8nQSZG4T4F"
    -M1nM5DhfBm-6ZwurDQK: "dinners/sanjose_ca_3-9-2020/-M1nM5DhfBm-6ZwurDQK"
} => [
    "dinners/sanjose_ca_3-7-2020/-M1kmBUpkZ8nQSZG4T4F", 
    "dinners/sanjose_ca_3-9-2020/-M1nM5DhfBm-6ZwurDQK"
]

*/

export default (reservations: object): string[] => {
  return Object.keys(reservations).filter((key: string) => {
    const reservation = reservations[key].replace('dinners/', '');
    const date = new Date(reservation.split('/')[0].split('_')[2]);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }).map(key => reservations[key]);
};
