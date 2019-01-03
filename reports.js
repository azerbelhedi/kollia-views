console.log("reports script !");
let reportsRef = database.ref("admin/reports") ;
let reports = [] ;
let reportedFiles = [] ;
let doneReports = 0 ;
let waitingReports = 0 ;

const errReport = (err) => {
    console.log("err : " + err) ;
}

const displayReportDetails = (test) =>{
    alert(test) ;
}

const fileIteration = (fileName) => {
   let n = 0 ;
   reports.map(x => {
        if(x.file == fileName){
            n++ ;
        }
   });
   return n ;
}

const gotReports = (data) => {
    data = data.val() ;
    let keys = Object.keys(data) ;
    keys.map(x => {
        if(data[x].waiting){
            reports.push(data[x]) ;
            //reportedFiles.push(data[x].file) ;
        }else{
            doneReports++ ;
        }
    });
    document.querySelector("#done-reports").innerHTML = "done reports : " + doneReports ;
    console.log(reports) ;
    // push to reported files now 
    reports.map(x => {
        let result = reportedFiles.find(element => {
            return element.name == x.file ;
        });
        if(result == undefined){
            // pushing the file data to the reportedFiles[]
            //get the file key ;
            reportedFiles.push({name : x.file , data : x, key : "get key"}) ;
            waitingReports++ ;
            document.querySelector("#reportedFiles").innerHTML += "<h6 id = "+ "something"+" class = 'reportList'>"+ x.file+"</h6>" ;
            document.querySelector("#n-reports").innerHTML += "<h6 class = 'reportList'>"+ fileIteration(x.file)+"</h6>" ;
            document.querySelector("#report-reason").innerHTML += "<h6 class = 'reportList'>"+x.reason+"</h6>" ;
        }
    });
    document.querySelector("#waiting-reports").innerHTML = "waiting reports : " + waitingReports ;

    console.log("reported files names :") ;
    console.log(reportedFiles) ;
    /*let result = reportedFiles.find( element => {
        return element == "D1.pdf" ;
    });
    console.log(result) ;
    */
    //console.log(result.length) ;
}

reportsRef.on("value" , gotReports , errReport) ;
