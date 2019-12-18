/*
    Converts date object to string
    {
        day: "1",
        month: "1",
        year: "2020"
    } => "1012020"
*/

export default (date: object): string | false => {
    let string = '';

    //month
    if(date.month == null || (typeof date.month == typeof true)) {
        return false;
    } else {
        if(0 <= Number(date.month) && Number(date.month) <= 12) {
            string += date.month;
        } else {
            return false;
        }
    }

    //day
    if(date.day == null || (typeof date.day == typeof true)) {
        return false;
    } else {
        if(0 <= Number(date.day) && Number(date.day) <= 12) {
            if(Number(date.day) < 10) {
                string += 0;
            }
            string += date.month;
        } else {
            return false;
        }
    }

    //year
    if(date.year == null || (typeof date.year == typeof true)) {
        return false;
    } else {
        if(0 < Number(date.year)) {
            string += date.year;
        } else {
            return false;
        }
    }
 
    return string;
}