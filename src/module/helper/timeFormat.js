
function timeDisplay(timeStamp) {
    const commentSubmitTime = new Date(timeStamp);//UTC time format
    const currentTime = new Date();//UTC time format
    const timeElapsed = currentTime - commentSubmitTime;//UTC time format
    let timeString = "";
    //formating the time elapsed of comments in ms
    if (timeElapsed < 60000) {//shorter than 1min
        timeString = `${Math.round(timeElapsed / 1000)} seconds ago`;
    } else if (timeElapsed >= 60000 && timeElapsed < 3600000) {//shorter than 1hour
        timeString = `${Math.round(timeElapsed / 60000)} minutes ago`;
    } else if (timeElapsed >= 3600000 && timeElapsed < 86400000) {//longer than 1hour shorter than 1day
        timeString = `${Math.round(timeElapsed / 3600000)} hours ago`;
    } else if (timeElapsed >= 86400000 && timeElapsed < 2592000000) {//longer than 1 day shorter than 30days
        timeString = `${Math.round(timeElapsed / 86400000)} days ago`;
    } else {
        timeString = new Date(timeStamp).toLocaleDateString("en-US");//changing the date format to match mockup month/day/year
    }
    return timeString;
}
export default timeDisplay;