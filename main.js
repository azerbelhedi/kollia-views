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


let users = [] ;
let usersFiles = [] ;
//let state = "loading" ;
let d = new Date() ;

let day = d.getDate();
let month = d.getMonth() + 1 ; 
let year = d.getFullYear() ;
let hour = d.getHours() ;
let minute = d.getMinutes() ;
let zero = "" ;
if(minute < 10 ){zero = "0" ;}
let dateText = year + '/' + month + '/' + day + ' | ' + hour + ':' + zero + minute ;
console.log("date : " + dateText) ;
document.querySelector("#date").innerHTML = dateText ;

let database = firebase.database() ;
let ref = database.ref('views') ;

const refresh = () => {
    location.reload() ;
}

const switchDisplay = () => {
    let state = document.querySelector("#usersButton").innerHTML ;
    if(state == "show users"){
        document.getElementsByClassName("sides")[0].style.display = "flex" ;
        document.querySelector("#usersButton").innerHTML = "hide users" ;
        state = document.querySelector("#usersButton").innerHTML ;
    }
    else if(state == "hide users"){
        document.getElementsByClassName("sides")[0].style.display = "none" ;
        document.querySelector("#usersButton").innerHTML = "show users" ;
        state = document.querySelector("#usersButton").innerHTML ;
    }
}

const writeData = () => {
    document.querySelector("#names").innerHTML = "user name <hr>" ;
    users.map(x =>{
        document.querySelector("#names").innerHTML += ("<br>" +  x) ;
    }) ;
    document.querySelector("#filesList").innerHTML = "files <hr>" ;
    usersFiles.map(y =>{
        document.querySelector("#filesList").innerHTML += ("<br>" +  y) ;
    }) ;

}


const loadUsersData = (data , keys) => {
    console.log("users") ;
    keys.map(x => {
        let pureData = data[x].name ;
        let pureKeys = Object.keys(pureData) ;
        //console.log(pureData[pureKeys[0]].name) ;
        users.push(pureData[pureKeys[0]].name) ;
        let pureFiles = data[x].files ;
        let pureFilesKeys = Object.keys(pureFiles) ;
        //console.log(pureData[pureKeys[0]].name) ;
        //console.log(pureFilesKeys.length - 1) ;
        usersFiles.push(pureFilesKeys.length - 1 ) ;
    }) ;
    console.log(users) ;
    console.log(usersFiles) ;
    writeData() ;
}

const gotData = (data) => {
    let views = 0 ;
    let init = 24 ;
    data = data.val() ;
    let keys = Object.keys(data) ;
    keys.map( x => {
        //console.log(data[x].value) ;
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


let filesRef = database.ref('files');

const gotFiles = (data) => {
    data = data.val() ;
    let keys = Object.keys(data) ;
    document.querySelector("#files").innerHTML = "files : " + keys.length ;
    //alert("files : " + keys.length) ;
}

const errFiles = (error) => {
    console.log("error : " + error ) ;
}

let usersRef = database.ref('users') ;

const errUsers = (err) => {
    console.log("error : " + err) ;
}

const gotUsers = (data) => {
    data = data.val();
    let keys = Object.keys(data) ;
    document.querySelector("#users").innerHTML = "users : " + keys.length ;
    // wrtite data on arrays
    loadUsersData(data , keys) ;
    document.querySelector("#usersButton").innerHTML = "show users" ;
}

usersRef.on('value' , gotUsers , errUsers) ;
filesRef.on('value' , gotFiles , errFiles) ;
ref.on('value' , gotData , errData) ;


