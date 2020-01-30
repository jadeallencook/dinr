export default (datestamp: string): boolean => {
  if (datestamp.length !== 10) {
    return false;
  } else {
    let [month, day, year] = datestamp.split('/');
    return !(
      Number(month) < 1 ||
      Number(month) > 12 ||
      month.match(/^[A-Za-z]+$/) ||
      Number(day) < 1 ||
      Number(day) > 31 ||
      day.match(/^[A-Za-z]+$/) ||
      Number(year) < 2020 ||
      year.match(/^[A-Za-z]+$/)
    );
  }
};
