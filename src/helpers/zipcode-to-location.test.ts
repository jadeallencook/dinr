import zipcodeToLocation from './zipcode-to-location';

test('48734 returns frankenmuth:mi', () => {
    const zipcode = 48734;
    expect(zipcodeToLocation(zipcode)).toBe('frankenmuth:mi');
});