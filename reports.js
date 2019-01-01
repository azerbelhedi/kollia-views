console.log("reports script !");
let reportsRef = database.ref("admin/reports") ;
let reports = [] ;
let reportedFiles = [] ;

const errReport = (err) => {
    console.log("err : " + err) ;
}

const gotReports = (data) => {
    data = data.val() ;
    let keys = Object.keys(data) ;
    keys.map(x => {
        reports.push(data[x]) ;
        //reportedFiles.push(data[x].file) ;  
    });
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
        }
    });
    
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
