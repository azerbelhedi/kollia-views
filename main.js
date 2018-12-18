console.log("start") ;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6DClDypVl6AqFWcg2c7MUu8O56JQLaOo",
    authDomain: "flybaby-00.firebaseapp.com",
    databaseURL: "https://flybaby-00.firebaseio.com",
    projectId: "flybaby-00",
    storageBucket: "flybaby-00.appspot.com",
    messagingSenderId: "614291697698"
  };
  firebase.initializeApp(config);

let database = firebase.database() ;
let ref = database.ref('views') ;


const gotData = (data) => {
    let views = 0 ;
    let init = 24 ;
    data = data.val() ;
    let keys = Object.keys(data) ;
    keys.map( x => {
        console.log(data[x].value) ;
        views += data[x].value ;
    }) ;
    document.querySelector("#views").innerHTML = "views : " + (views - init) ;
    if(init > views){
        document.querySelector("#views").style.color = "red" ;
    }    
}

const errData = (err) => {
    console.log("error : " + err) ;
}


ref.on('value' , gotData , errData) ;
