/*
    "#/dinners/sanjose_ca_3_2020/3_9_2020_6_00_PM_K0bwbytfpDP8ZyzuDfhXTXxEPJR2"
    => {
        city: "sanjose",
        state: "ca",
        month: 3,
        day: 9,
        year: 2020,
        hour: "6",
        minute: "00",
        ampm: "PM",
        datestamp: "3/9/2020 6:00 PM",
        uid: "K0bwbytfpDP8ZyzuDfhXTXxEPJR2"
    }
*/

export default (hash: string): {
    city: string;
    state: string;
    month: string;
    day: string;
    year: string;
    hour: string;
    minute: string;
    ampm: string;
    datestamp: string;
    uid: string;
  } | false  => {
  const a1 = hash.split('/');
  if (a1.length < 4) {
    return false;
  }
  const a2 = a1[2].split('_');
  const a3 = a1[3].split('_');
  return {
    city: a2[0],
    state: a2[1],
    month: a3[0],
    day: a3[1],
    year: a3[2],
    hour: a3[3],
    minute: a3[4],
    ampm: a3[5],
    datestamp: `${a3[0]}/${a3[1]}/${a3[2]} ${a3[3]}:${a3[4]} ${a3[5]}`,
    uid: a3[6]
  };
};
