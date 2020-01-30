// San Jose, CA => sanjose_ca

export default (location: string): string => {
  let [city, state] = location.split(',');
  return `${(city.replace(/\s/g, '')).toLowerCase()}_${(state.replace(' ', '')).toLowerCase()}`;
};
