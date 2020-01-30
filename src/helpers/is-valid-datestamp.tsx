// 01/12/2020 => true
// 1/12/2020 => false
// 1/45/2020 => false

export default (datestamp: string): boolean => {
    if(datestamp.length != 10) {
        return false;
    } else {
        let [month,day] = datestamp.split('/')
        return (Number(month) < 1 || Number(month) > 12 || Number(day) < 1 || Number(day) > 31) ? false : true;
    }
}