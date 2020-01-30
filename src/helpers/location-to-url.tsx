// San Jose, CA => sanjose_ca

export default (location: string): string => {
  let [city, state] = location.split(',');
  city = city.replace(/\s/g, '').toLowerCase();
  state = state.replace(' ', '').toLowerCase();
  return `${city}_${state}`;
};
