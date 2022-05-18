export const formatTime = (hours: number, minutes: number, seconds: number): string => {
    let secondsString = "00";
    if (seconds.toString().length == 1) {
        secondsString = `0${seconds}`;
    } else if (seconds.toString().length == 2) {
        secondsString = `${seconds}`;
    }
    let minutesString = `${minutes}`;
    if (hours > 0) {
        minutesString = "00";
        if (minutes.toString().length == 1) {
            minutesString = `0${minutes}`;
        } else if (minutes.toString().length == 2) {
            minutesString = `${minutes}`;
        }
        let hoursString = `${hours}`;
        return `${hoursString}:${minutesString}:${secondsString}`;
    } else {
        return `${minutesString}:${secondsString}`;
    }
};
