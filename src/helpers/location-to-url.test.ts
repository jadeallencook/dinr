import locationToUrl from './location-to-url';

test('San Jose, CA returns sanjose_ca', () => {
    const location = 'San Jose, CA';
    expect(locationToUrl(location)).toBe('sanjose_ca');
});
test('Frankenmuth, MI returns frankenmuth_mi', () => {
    const location = 'Frankenmuth, MI';
    expect(locationToUrl(location)).toBe('frankenmuth_mi');
});
test('Somewhere Made Up, Hb returns somewheremadeup_hb', () => {
    const location = 'Somewhere Made Up, Hb';
    expect(locationToUrl(location)).toBe('somewheremadeup_hb');
});