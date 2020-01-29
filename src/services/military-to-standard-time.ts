export default (military: string | number): string => {
    if(typeof(military) === 'string') {
        military = Number(military.includes(':') ? military.replace(':', '') : military)
    }
    let minutes = (military%100), hours = (military - minutes)/100
    if(minutes >= 60) {
        hours++
        minutes -= 60
    }
    let result = `${(hours%12 == 0) ? '12' : hours%12}:${String(minutes).padStart(2, '0')}`
    result += Math.floor(hours/12) % 2 == 0 ? 'AM' : 'PM'
    return result
}