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
    fetch (`${url}${country.value}`)

.then((response)=>{
    // console.log(response.ok)
    if(response.ok===false){
        Notiflix.Notify.failure('Oops, there is no country with that name"');
    }
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
    for (let i=0; i<data.length; i++){
       const li=document.createElement('li');
        if(data.length<2){
            let img = document.createElement("img")
            img.src = `${data[i].flags.svg}`
            img.alt = `${data[i].flags.alt}`
            img.classList.add("flag-elarge")
            li.appendChild(img)
            ul.appendChild(li);
            li.innerHTML=li.innerHTML + data[i].name.official + data[i].capital
             li.classList.add("li-enlarge")
           

            
            

        }
   else{  
    let img = document.createElement("img")
   img.src = `${data[i].flags.svg}`
   img.alt = `${data[i].flags.alt}`
   img.classList.add("flag")
   li.appendChild(img)
   ul.appendChild(li);
   li.innerHTML=li.innerHTML + data[i].name.official; 
   
} } }}

