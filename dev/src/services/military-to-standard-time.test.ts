import militaryToStandardTime from './military-to-standard-time';
import { Time } from '../interfaces';

test('0 returns 12:00AM', () => {
  const time: Time = 0;
  expect(militaryToStandardTime(time)).toBe('12:00AM');
});

test('1 returns 1:00AM', () => {
  const time: Time = 1;
  expect(militaryToStandardTime(time)).toBe('1:00AM');
});

test('13 returns 1:00PM', () => {
  const time: Time = 13;
  expect(militaryToStandardTime(time)).toBe('1:00PM');
});
