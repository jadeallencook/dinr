import dateObjectToString from './date-object-to-string';

test('Description of test', () => {
  //odd input
  expect(dateObjectToString({day: null, month: null, year: null})).toBe(false);
  expect(dateObjectToString({day: 1, month: true, year: 20})).toBe(false);

  //big nums
  expect(dateObjectToString({day: "1", month: "100", year: "2020"})).toBe(false);
  expect(dateObjectToString({day: 1, month: 100, year: 2020})).toBe(false);
  expect(dateObjectToString({day: "100", month: "1", year: "2020"})).toBe(false);
  expect(dateObjectToString({day: 100, month: 1, year: 2020})).toBe(false);

  //negatives
  expect(dateObjectToString({day: -1, month: 1, year: 2020})).toBe(false);
  expect(dateObjectToString({day: 1, month: -1, year: 2020})).toBe(false);
  expect(dateObjectToString({day: 1, month: 1, year: -2020})).toBe(false)
  expect(dateObjectToString({day: "-1", month: "1", year: "2020"})).toBe(false);
  expect(dateObjectToString({day: "1", month: "-1", year: "2020"})).toBe(false);
  expect(dateObjectToString({day: "1", month: "1", year: "-2020"})).toBe(false);
  
  //correct runs
  expect(dateObjectToString({day: "1", month: "1", year: "2020"})).toBe('1012020');
  expect(dateObjectToString({day: 1, month: 1, year: 2020})).toBe('1012020');
  expect(dateObjectToString({day: 1, month: "1", year: "2020"})).toBe('1012020');
});
