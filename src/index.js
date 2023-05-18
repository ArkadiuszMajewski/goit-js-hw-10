import './css/styles.css';

const DEBOUNCE_DELAY = 300;
// import { create, reject } from 'lodash';
import Notiflix from 'notiflix';
const searchBox = document.querySelector("#search-box")
const ul = document.querySelector(".country-list")
const url = "https://restcountries.com/v3.1/name/"
let country = searchBox
let data = []
searchBox.addEventListener("input",event=>{
    getUrl(url,country) .then((data) => {
        console.log(data)
        ul.innerHTML = ""
        drawResults(data)
      }).catch((error)=> console.log("error"))
         
})

function getUrl(url,country){return new Promise((resolve, reject) => {
    fetch (`${url}${country.value}`, {method:"GET"})

.then((response)=>{
    console.log(response.ok)
return response.json()})
.then((data)=>{

    resolve(data)
})
.catch((error)=>reject(error))

})}
function drawResults(data){
    
if(data.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}
else{
    for (var i=0; i<data.length; i++){

        var li=document.createElement('li');
    
        ul.appendChild(li);
        li.innerHTML=li.innerHTML + data[i].name.official; 
    
    }
   }
}

