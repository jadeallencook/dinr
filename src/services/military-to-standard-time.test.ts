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

test('6 returns 6:00AM', () => {
  const time: Time = 6;
  expect(militaryToStandardTime(time)).toBe('6:00AM');
});

test('6 returns 11:00AM', () => {
  const time: Time = 11;
  expect(militaryToStandardTime(time)).toBe('11:00AM');
});

test('12 returns 12:00PM', () => {
  const time: Time = 12;
  expect(militaryToStandardTime(time)).toBe('12:00PM');
});

test('13 returns 1:00PM', () => {
  const time: Time = 13;
  expect(militaryToStandardTime(time)).toBe('1:00PM');
});
