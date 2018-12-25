/*
let todayRef = database.ref('today') ;
todayRef.push({
    rank : 1 ,
    year : 2018 ,
    month : 12 ,
    day : 25 ,
    views : 30 ,
    users : 0 ,
    files : 0    
}) ;

*/

let globalFiles ;
let globalUsers ;
let globalViews ;

let viewsState = 0 ;
let filesState = 0 ;
let usersState = 0 ;

let notYet = 1 ;

const loadviews = (viewsData) => {
    globalViews = viewsData ;
    viewsState = 1 ;
    callToday() ;
}

const loadFiles = (filesData) => {
    globalFiles = filesData ;
    filesState = 1 ;
    callToday() ;
}

const loadUsers = (usersData) => {
    globalUsers = usersData ;
    usersState = 1 ;
    callToday() ;
}


const callToday = () => {
    if(usersState && viewsState && filesState){
        //alert("ready") ;
        // get nominal allData 
        //alert(globalFiles+"/"+globalUsers+"/"+globalViews) ;
        // get nominam yesterday 's data 
        let todayRef = database.ref('today') ;

        const errYesterday = (error) => {console.log("error : " + error) ; }

        const gotYesterday = (data) => {
            //notYet = 1 ;
            data = data.val() ;
            let yesterdayKeys = Object.keys(data) ;
            console.log(yesterdayKeys.length) ;
            console.log(data[yesterdayKeys[yesterdayKeys.length - 1 ]]) ;
            // calculate  today which is th differnce
            let d = new Date() ;
            let thisMonth = d.getMonth() + 1 ;
            let thisYear = d.getFullYear() ;
            let thisDay = d.getDate() ;
            console.log(thisDay + " " + thisMonth + " " + thisYear) ;
            let myDate = data[yesterdayKeys[yesterdayKeys.length - 1 ]] ;
            //console.log(myDate.day) ;
            if(myDate.day == thisDay && myDate.year == thisYear && myDate.month == thisMonth){
                if(notYet){
                    notYet = 0 ;
                    //alert("today !!") ;
                    let newRefString = 'today/' + yesterdayKeys[yesterdayKeys.length - 1 ]
                    console.log('path : ' + newRefString) ;
                    let specialRef = database.ref(newRefString) ;
                    specialRef.set({
                        rank : myDate.rank ,
                        year : myDate.year ,
                        month : myDate.month ,
                        day : myDate.day ,
                        views : globalViews ,
                        users : globalUsers ,
                        files : globalFiles  
                    }) ;  
                }
            } 
            else{
                //alert("it was yesterday") ;
                let newRank = myDate.rank + 1 ;
                console.log(newRank) ;
                console.log(thisMonth) ;
                console.log(thisYear) ;
                console.log(thisDay) ;
                console.log(globalFiles) ;
                console.log(globalUsers) ;
                console.log(globalViews) ;
                todayRef.push({
                    rank : newRank ,
                    year : thisYear ,
                    month : thisMonth ,
                    day : thisDay ,
                    views : globalViews ,
                    users : globalUsers ,
                    files : globalFiles    
                }) ;
            }
            // display today
            let difUsers = 0 ;
            let difFiles = 0 ;
            let difViews = 0 ;
            // calculate  from data
            difUsers = data[yesterdayKeys[yesterdayKeys.length - 1 ]].users - data[yesterdayKeys[yesterdayKeys.length - 2 ]].users ;
            difFiles = data[yesterdayKeys[yesterdayKeys.length - 1 ]].files - data[yesterdayKeys[yesterdayKeys.length - 2 ]].files ;
            difViews = data[yesterdayKeys[yesterdayKeys.length - 1 ]].views - data[yesterdayKeys[yesterdayKeys.length - 2 ]].views ;
            document.querySelector("#views2").innerHTML = "today views : +" + difViews ;
            document.querySelector("#files2").innerHTML = "today files : +" + difFiles ;
            document.querySelector("#users2").innerHTML = "today users : +" + difUsers ;
        }
        
        todayRef.on('value' , gotYesterday , errYesterday) ;
    }
    
}
