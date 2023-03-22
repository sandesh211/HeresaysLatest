import React from 'react'

const TimeFun = () => {
    const currentDate = new Date();
    const specificDate = '2023-03-17 11:01:00.944000'
    const timeDiff = currentDate.getTime() - specificDate.getTime();
    var days = timeDiff/(1000*3600*24)
    var finalDay = parseInt(days,10)
    var date =  new Date(timeDiff * 1000);
    // var days = date.getDays();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    console.log(formattedTime);
}

export default TimeFun