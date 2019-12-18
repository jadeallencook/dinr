import dateObjectToString from './date-object-to-string';
import { Date } from '../interfaces';

test('1/1/2020 returns 1012020', () => {
  const date: Date = { 
    month: '1',
    day: '1',  
    year: '2020' 
  };
  expect(dateObjectToString(date)).toBe('1012020');
});

test('12/12/2020 returns 12122020', () => {
  const date: Date = { 
    month: '12',
    day: '12',  
    year: '2020' 
  };
  expect(dateObjectToString(date)).toBe('12122020');
});

test('12/1/2020 returns 12012020', () => {
  const date: Date = { 
    month: '12',
    day: '1',  
    year: '2020' 
  };
  expect(dateObjectToString(date)).toBe('12012020');
});
