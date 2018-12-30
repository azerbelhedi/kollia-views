console.log("average") ;
let averageRef =database.ref('today') ;

const errAverage = (err) => {
    console.log("err : " + err) ;
}

const gotAverage = (data) => {
    data = data.val() ;
    let keys = Object.keys(data) ;
    let tViews = data[keys[keys.length - 1]].views ;
    let tDays = data[keys[keys.length - 1 ]].rank + 6 ; // cause day to day stats started 6 days after launch of kollia 
    let average = tViews / tDays ;
    console.log("avv total views : " + tViews + " " + tDays + " " + Math.round(average)) ;
    document.querySelector("#average").innerHTML = "average views : " +  Math.round(average) + "/day" ;   
}

averageRef.on('value' , gotAverage , errAverage) ;
