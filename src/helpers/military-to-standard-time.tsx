// 0 => 12:00 AM
// 30 => 12:30 AM
// 1330 => 1:30 PM

export default (time: string | number): string | false => {
    if(typeof(time) === 'string') {
        time = Number(time.includes(':') ? time.replace(':', '') : time)
    }
    let minutes = (time%100), hours = (time - minutes)/100
    if(minutes >= 60) {
        hours++
        minutes -= 60
    }
    let result = `${(hours%12 == 0) ? '12' : hours%12}:${String(minutes).padStart(2, '0')}`
    result += Math.floor(hours/12) % 2 == 0 ? 'AM' : 'PM'
    return result
}