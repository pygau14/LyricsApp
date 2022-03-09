const form = document.getElementById("form");
const search =document.getElementById("search");
const result = document.getElementById("result");
const more =document.getElementById("more");

const apiURL = 'https://api.lyrics.ovh';

//event listeners
form.addEventListener("submit",e=>{
    e.preventDefault();
    const searchTerm = search.value.trim();
    document.getElementById("search").value="";
    if(!searchTerm){
        alert("Please enter any artist or song name");
    }
    else{
        searchSongs(searchTerm);
    }
})


async function searchSongs(term){
    const mainURL = apiURL+"/suggest/"+term
    const res = await fetch(mainURL);
    const data = await res.json();
    showData(data);
}

function showData(data){
    document.getElementById("result").innerText = "";
    const unorderList = document.createElement("ul");
    data.data.forEach(element => {
        const obj = " - "+element.title;
        const listElement = document.createElement("li");
        listElement.setAttribute("class","listclass");
        const mainSpan = document.createElement("span");
        const spanElement = document.createElement("strong");
        spanElement.innerText = element.artist.name;
        spanElement.setAttribute("class","span1");
        const spanElement2 = document.createElement("span");
        spanElement2.innerText = obj;
        spanElement2.setAttribute("class","span2");
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("class","btn");
        buttonElement.setAttribute("data-artist",element.artist.name);
        buttonElement.setAttribute("data-songTitle",element.title);
        buttonElement.innerText = "Get Lyrics";
        mainSpan.appendChild(spanElement);
        mainSpan.appendChild(spanElement2);
        listElement.appendChild(mainSpan);
        listElement.appendChild(buttonElement);
        unorderList.appendChild(listElement);
   });
   document.getElementById("result").appendChild(unorderList);
}

result.addEventListener("click",e=>{
    const clickEl = e.target;
    if(clickEl.tagName === "BUTTON"){
        const artist = clickEl.getAttribute('data-artist');
        const songName = clickEl.getAttribute('data-songTitle');
        getLyrics(artist,songName);
    }
});
async function getLyrics(artist,songName){
    document.getElementById("result").innerText ="";
    const mainURL2 = apiURL+"/v1/"+artist+"/"+songName;
    const res = await fetch(mainURL2);
    const data = await res.json();
    const headElement = document.createElement("h1");
    headElement.setAttribute("class","head-rect");
    const strongElement = document.createElement("strong");
    strongElement.innerText = artist+" - ";
    const spanElement = document.createElement("span");
    spanElement.innerText = songName;
    headElement.appendChild(strongElement);
    headElement.appendChild(spanElement);
    const paraElement = document.createElement("p");
    paraElement.innerText = data.lyrics;
    paraElement.setAttribute("class","para-rect");
    document.getElementById("result").appendChild(headElement);
    document.getElementById("result").appendChild(paraElement);
}

