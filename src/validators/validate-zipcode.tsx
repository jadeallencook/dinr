export default (zipcode: string | number): boolean => {
  zipcode = Number(zipcode);
  return !isNaN(zipcode) && zipcode >= 10000 && zipcode <= 99999;
};
