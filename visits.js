console.log("visits js ready !") ;

let first = 0 ;
let visitsRef = database.ref("timer");
let fullDuration = 0 ;
let todayDuration ;
let lastDuration ;
let seconds = 0 ;

let browserData = {
    appCodeName : navigator.appCodeName ,
    appName : navigator.appName ,
    product : navigator.product ,
    userAgent : navigator.userAgent ,
    platform : navigator.platform
} ;

const errVisits = (err) => {
    console.log("err : " + err) ;
} 

const gotVisits = (data) =>{
    let todayVisits = 0 ; 
    todayDuration = 0 ;
    fullDuration = 0 ;
    data = data.val() ;
    let keys = Object.keys(data) ;
    //alert(keys.length) ;
    document.querySelector("#visits").innerHTML = "visits : " + keys.length ;
    keys.map(x => {
        console.log(data[x].duration) ;
        fullDuration += data[x].duration ;
    });
    document.querySelector("#duration").innerHTML = "duration : " + fullDuration + " min" ; 

    //  daily visits and duration
    let today = new Date() ;
    let todayYear = today.getFullYear() ;
    let todayMonth = today.getMonth() + 1 ;
    let todayDay = today.getDate() ;
    keys.map(x => {
        console.log(data[x].date.day) ;
        if(todayYear == data[x].date.year && todayMonth == data[x].date.month && todayDay == data[x].date.day ){
            todayVisits++ ;
            todayDuration += data[x].duration ;
        }
    });
    document.querySelector("#visits2").innerHTML = "today visits : " + todayVisits ;
    document.querySelector("#duration2").innerHTML = "today Duration : " +  todayDuration + "min";
    // ** there was a failure on github page , i am  trying again to push  // again 
    if(first == 0){
        first = 1 ;
        lastDuration = todayDuration ;
    }
    
}

visitsRef.on("value" , gotVisits , errVisits) ;

console.log("connections js ready !") ;

const check = () => {
    let connections = todayDuration - lastDuration ;
    document.querySelector("#online").innerHTML = connections + " connection(s)" ;
    lastDuration = todayDuration ;
}

setInterval(check , 60000) ;

const counter = () => {
    seconds-- ;
    if(seconds < 0){
        seconds = 59;
    }
    document.querySelector("#count").innerHTML = "(" + seconds + ")" ;
}

setInterval(counter , 1000) ;