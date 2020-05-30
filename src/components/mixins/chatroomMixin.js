var chatroomMixin = {
    methods: {
        getChatroomId(userid1, userid2, postid) {
            let chatroomid;
            //compare lexicographically, greatest first:
            if (userid1.localeCompare(userid2) > 0) {
                chatroomid = userid1 + '_' + userid2 + '_' + postid;
            } else {
                chatroomid = userid2 + '_' + userid1 + '_' + postid;
            }
            return chatroomid;
        },
        displayTime(timestamp) {
            console.log("requested displaytime of message: ",timestamp)
            let dateObj = timestamp.toDate();
            const time = formatTime(dateObj);
            const date = formatDate(dateObj);
            let datetext;
            datetext = date + " kl. " + time;
            return datetext;
          }
    }
}

function  formatDate(date) {
    let day = "0" + date.getDate();
    let month = date.getMonth() + 1;
    month = "0" + month;
    const year = date.getFullYear();
    let formattedDate = day.substr(-2) + "." + month.substr(-2) + "." + year;
    return formattedDate;
  }
function formatTime(date) {
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    // let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime =
      hours.substr(-2) + ":" + minutes.substr(-2) 
      // + ":" + seconds.substr(-2);
    return formattedTime;
  }

export default chatroomMixin;