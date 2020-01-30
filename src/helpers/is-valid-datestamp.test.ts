import isValidDatestamp from './is-valid-datestamp';

test('01/12/2020 returns true', () => {
    const datestamp = '01/12/2020';
    expect(isValidDatestamp(datestamp)).toBe(true);
});
test('1/12/2020 returns false', () => {
    const datestamp = '1/12/2020';
    expect(isValidDatestamp(datestamp)).toBe(false);
});
test('01/45/2020 returns false', () => {
    const datestamp = '01/45/2020';
    expect(isValidDatestamp(datestamp)).toBe(false);
});