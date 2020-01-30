import militaryToStandardTime from './military-to-standard-time';

test('0 return 12:00AM', () => {
    const time = 0;
    expect(militaryToStandardTime(time)).toBe('12:00AM');
});