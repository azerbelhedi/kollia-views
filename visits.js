console.log("visits js ready !") ;

let visitsRef = database.ref("timer");
let fullDuration = 0 ;

const errVisits = (err) => {
    console.log("err : " + err) ;
} 

const gotVisits = (data) =>{
    let todayVisits = 0 ; 
    let todayDuration = 0 ;
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
    //
}

visitsRef.on("value" , gotVisits , errVisits) ;