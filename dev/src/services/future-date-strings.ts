export default (start?: string): string[] => {
    const date = start ? new Date(start) : new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let dates: string[] = [];
    for (let num = 0; num < 30; num++) {
      let dayString = (day.toString().length === 1) ? `0${day}` : day;
      let monthString = (month.toString().length === 1) ? `0${month}` : month;
      let dateString = `${monthString}${dayString}${year}`;
      dates.push(dateString);
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