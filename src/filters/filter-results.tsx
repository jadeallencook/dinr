export default (results: any[]): object[] => {
  const today = new Date();
  return results.filter(result => {
    return (
      !result ||
      !result.datestamp ||
      !result.plates ||
      today <= new Date(result?.datestamp) ||
      (result.guests && result.guests.length - result.plates <= 0)
    );
  });
};
