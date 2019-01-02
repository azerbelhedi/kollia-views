console.log("visits js ready !") ;

let visitsRef = database.ref("timer");
let fullDuration = 0 ;

const errVisits = (err) => {
    console.log("err : " + err) ;
} 

const gotVisits = (data) =>{
    data = data.val() ;
    let keys = Object.keys(data) ;
    //alert(keys.length) ;
    document.querySelector("#visits").innerHTML = "all visits : " + keys.length ;
    keys.map(x => {
        console.log(data[x].duration) ;
        fullDuration += data[x].duration ;
    });
    document.querySelector("#duration").innerHTML = "duration : " + fullDuration + " min" ; 
}

visitsRef.on("value" , gotVisits , errVisits) ;