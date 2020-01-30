import datestampToDateObject from './datestamp-to-date-object';

test('01/12/2020 returns { month: 1, day: 12, year: 2020 }', () => {
    const date = '01/12/2020';
    expect(datestampToDateObject(date)).toStrictEqual({
        month: 1,
        day: 12,
        year: 2020
    });
});