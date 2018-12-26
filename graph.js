let datesList = [] ;
let viewsList = [] ;
let filesList = [] ;
let usersList = [] ;
let colorStateViews = 'green' ;

function drawViews(){
    var ctx = document.getElementById("myChart");

    //Chart.defaults.global.defaultColor = "red" ;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesList, // days
            datasets: [{
                label: 'views',
                data: viewsList,
                backgroundColor: [
                    colorStateViews ,
                ],
                borderColor: [
                    'black'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        } ,
    });
    
}

var graphViewsRef = database.ref("today") ;

const errGraphView = (err) => {
    console.log("error : " + err )
}

const gotGraphView = (data) => {
    data = data.val() ;
    let keys = Object.keys(data) ;
    let last = 0 ;
    let days = 0 ;
    keys.map(x => {
        days++ ;
        //if(days < 8){
            let diff = data[x].views - last ;
            let localDate = data[x].year + "/" + data[x].month + "/" + data[x].day ;
            datesList.push(localDate) ;
            last = data[x].views ;
            console.log("totla view : " + diff) ;
            viewsList.push(diff) ;
       // }        
    })
    console.log(viewsList) ;

    if(viewsList[viewsList.length - 1 ] > viewsList[viewsList.length - 2 ]){colorStateViews = 'green' ;}
    else{colorStateViews = "red" ;}
    drawViews() ; 
}

graphViewsRef.on('value' , gotGraphView , errGraphView) ;
//drawViews() ;