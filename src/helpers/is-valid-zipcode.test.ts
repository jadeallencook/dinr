import isValidZipcode from './is-valid-zipcode';

test('1 returns false', () => {
    const zipcode = 1;
    expect(isValidZipcode(zipcode)).toBe(false);
});