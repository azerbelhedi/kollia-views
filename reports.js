console.log("reports script !");
let reportsRef = database.ref("admin/reports") ;
let reports = [] ;
let reportedFiles = [] ;
let doneReports = 0 ;
let waitingReports = 0 ;

const errReport = (err) => {
    console.log("err : " + err) ;
}

const getKeyFromFilesList = (file) => {
    let filesListRef = database.ref("files") ;
    let result = undefined;
    const gotFiles = (data) => {
        data = data.val() ;
        let keys = Object.keys(data) ;
        keys.map(x => {
            if(data[x].name == file){
                console.log("file keyyy : " ) ;
                console.log(x) ;
                document.querySelector("#keyReport").innerHTML = "key : " + x ;
            }
        });
        //return "file not found" ;
    } 

    const errFiles = (err) => {
        console.log("err : " +  err) ;
    }

    filesListRef.on('value' , gotFiles , errFiles) ;
}

const displayReportDetails = (file) =>{
    let filtredList = [] ;
    let uploader ;
    let reasons = [] ;
    let details = [] ;
    let keyFromFilesList = getKeyFromFilesList(file) ;
    
    console.log(file) ;
    // get the needed data : all the reports //  details  , path , reason , user , waiting 
    reports.map(x => {
        console.log(x) ;
        if(x.file == file){
            filtredList.push(x);
            uploader = x.user ;
            reasons.push(x.reason) ;
            details.push(x.details) ; 
        }
    }) ;
    console.log("filtred ::: !!!! " ) ;
    console.log(filtredList) ;
    console.log(uploader) ;
    console.log(reasons) ;
    console.log(details) ;
    getKeyFromFilesList() ;

    document.querySelector("#fileNameReport").innerHTML = "file : " + file ;
    document.querySelector("#reportersReport").innerHTML = "reporters : " + filtredList.length ; 
    document.querySelector("#uploaderReport").innerHTML = "uploader : " + uploader ;
    let a = 0 ;
    document.querySelector("#full-reasons-details").innerHTML = "" ;
    reasons.map(x => {
        document.querySelector("#full-reasons-details").innerHTML += "[" + x + "] : " + details[a]  + "<br/>"; 
        a++;
    })
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
    let i = "a";
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
            document.querySelector("#reportedFiles").innerHTML += "<h6 id = '"+ i + "' class = 'reportList'>"+ x.file+"</h6>" ;
            //let id ="#a"+i ;
            //alert(id) ;
            /*
            document.querySelector("#"+i).addEventListener('click' ,function(){
                //console.log(i) ;
                displayReportDetails(i) ;
            });
            i += "a" ;
            */
            document.querySelector("#n-reports").innerHTML += "<h6 class = 'reportList'>"+ fileIteration(x.file)+"</h6>" ;
            document.querySelector("#report-reason").innerHTML += "<h6 class = 'reportList'>"+x.reason+"</h6>" ;
        }
    });
    reports.map(x =>{

    })
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


document.getElementById("reportedFiles").addEventListener("click" , function(e){
    displayReportDetails(e.target.innerHTML);
    document.querySelector("#full-report").style.display = "block" ;
});

const hideReport = () => {
    document.querySelector("#full-report").style.display = "none" ;
}