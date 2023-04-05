"use strict";

const myName = document.getElementById("name");
const myPlanet = document.getElementById("planet");
const myMovies = document.getElementById("movies");
const myButton = document.getElementById("btn1");

myButton.onclick = function (e) {
  e.preventDefault();
  onClickEvent();
};

// another way:
// myButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   onClickEvent();
// })

function onClickEvent() {
  myName.innerHTML = "Loading ...";
  myPlanet.innerHTML = "";
  myMovies.innerHTML = "";
  const personId = Math.ceil(Math.random() * 83);
  fetch(`https://swapi.dev/api/people/${personId}`)
    .then((response) => response.json())
    .then((data) => {
      myName.innerHTML = "<div class='inner-item'> " + data.name + "</div>";
      myPlanet.innerHTML = "Loading ...";
      fetch(data.homeworld)
        .then((response) => response.json())
        .then((data2) => {
          myPlanet.innerHTML = "<div class='inner-item'> " + data2.name + "</div>";
        });
      myMovies.innerHTML = "Loading ...";
      data.films.forEach((element) => {
        fetch(element)
          .then((response) => response.json())
          .then((data3) => {
            if (myMovies.innerHTML === "Loading ...") {
              myMovies.innerHTML = "";
            }
            myMovies.innerHTML += "<div class='inner-item'> " + data3.title + "</div>";
          });
      });

      // console.log(data.films);
      // console.log(data.homeworld);
      //   console.log(data);
    });
}
