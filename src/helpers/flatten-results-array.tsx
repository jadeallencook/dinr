export default (results: object[]): object[] => {
  results = results
    .filter(result => result != null)
    .map(object => Object.keys(object).map(key => object[key]))
    .reduce((array, result) => [...array, ...result], []);
  return results;
};
