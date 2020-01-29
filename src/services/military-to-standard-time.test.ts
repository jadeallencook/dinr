import militaryToStandardTime from './military-to-standard-time';

test('0 returns 12:00AM', () => {
  const time = 0;
  expect(militaryToStandardTime(time)).toBe('12:00AM');
});
test('61 returns 1:01AM', () => {
  const time = 61;
  expect(militaryToStandardTime(time)).toBe('1:01AM');
});
test('90 returns 1:30AM', () => {
  const time = 90;
  expect(militaryToStandardTime(time)).toBe('1:30AM');
});
test('101 returns 1:01AM', () => {
  const time = 101;
  expect(militaryToStandardTime(time)).toBe('1:01AM');
});
test('"0:0" returns 12:00AM', () => {
  const time = "0:0";
  expect(militaryToStandardTime(time)).toBe('12:00AM');
});
test('13 returns 12:13AM', () => {
  const time = 13;
  expect(militaryToStandardTime(time)).toBe('12:13AM');
});
test('1300 returns 1:00PM', () => {
  const time = 1300;
  expect(militaryToStandardTime(time)).toBe('1:00PM');
});
test('"13:00" returns 1:00PM', () => {
  const time = "13:00";
  expect(militaryToStandardTime(time)).toBe('1:00PM');
});
test('"1300" returns 1:00PM', () => {
  const time = "1300";
  expect(militaryToStandardTime(time)).toBe('1:00PM');
});
test('"48:00" returns 12:00PM', () => {
  const time = "48:00";
  expect(militaryToStandardTime(time)).toBe('12:00AM');
});
test('"49:00" returns 1:00AM', () => {
  const time = "49:00";
  expect(militaryToStandardTime(time)).toBe('1:00AM');
});
test('134 returns 1:34AM', () => {
  const time = 134;
  expect(militaryToStandardTime(time)).toBe('1:34AM');
});
test('1361 returns 2:01PM', () => {
  const time = 1361;
  expect(militaryToStandardTime(time)).toBe('2:01PM');
});
