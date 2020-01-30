import isValidDatestamp from './is-valid-datestamp';

const array = [
  { date: '01/12/2020', result: true },
  { date: '1/12/2020', result: false },
  { date: '01/45/2020', result: false },
  { date: '01/12/2020', result: true },
  { date: '01/12/////', result: false },
  { date: '01/12/abcd', result: false },
  { date: 'mm/12/2020', result: false },
  { date: '01/dd/2020', result: false }
];

for (const item of array) {
  const { date, result } = item;
  test(`${date} returns ${result}`, () =>
    expect(isValidDatestamp(date)).toBe(result));
}
