/*
    Returns date stamps for next 30 days
    ["1012020", "1022020", "1032020", "1042020"]
*/

export default (): string[] => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let dates: string[] = [];
    for (let num = 0; num < 30; num++) {
      let dayString = (day.toString().length === 1) ? `0${day}` : day;
      let string = `${month}${dayString}${year}`;
      dates.push(string);
      day++;
      if (day > 31) {
        day = 1;
        month++;
        month = month > 12 ? 1 : month;
        year = month === 1 ? year + 1 : year;
      }
    }
    return dates;
}