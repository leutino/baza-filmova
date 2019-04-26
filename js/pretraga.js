const url = "https://baza-filmova.herokuapp.com/filmovi/";
const prikaz = document.getElementById('filmovi')
const kriterij = document.getElementById('title')
const strGoreGod = document.getElementById('gore_god')
const strDoleGod = document.getElementById('dole_god')
const strGoreNaz = document.getElementById('gore_naz')
const strDoleNaz = document.getElementById('dole_naz')
let godina;
let naziv;
let slika;
let _id;
let dodat;
let sviFilmovi = [];
const user = document.getElementById('user')
const pass = document.getElementById('pass')
const login= document.getElementById('login')
const pronadji = document.getElementById('pronadji')

//povlacenje filmova sa API-ja
fetch(url)
    .then(response => response.json())
    .then(function (response) {
        sviFilmovi = response;
        // console.log(response);
        let prostorUpisaFilma = document.getElementById("filmovi");
        let sablonUpisaFilma = ``;

        for (let i = 0; i < response.length; i++) {
            godina = response[i].godina;
            naziv = response[i].naziv;
            slika = response[i].slika;
            _id = response[i]._id;
            dodat = response[i].dodat;
            if (naziv != "Budjenje pacova")
                sablonUpisaFilma += `
                <div class="movie">
                <div class="iks">X<span>${_id}</span></div>
                    <img src=${slika} alt="Movie poster"  class="movie-img">
                    <div class="movie-body">
                        <center><h3>${naziv}</h3></center>
                        <p>${godina}</p>
                    </div>
                </div>

            `;
            else
                sablonUpisaFilma += `
                <div class="movie">
                    <img src="slike/BUDJENJE-PACOVA.jpg" alt="Movie poster" width="300px" height="450px" class="movie-img">
                    <div class="movie-body">
                        <center><h3>${naziv}</h3></center>
                        <p>${godina}</p>

                    </div>
                </div>
            `;
        }

        //
        prostorUpisaFilma.innerHTML = sablonUpisaFilma;


        // ispis trazenog filma
        pronadji.addEventListener("input", function () {
            prostorUpisaFilma.innerHTML = "";
            let str = document.getElementById("pronadji").value;
            for (i = 0; i < response.length; i++) {
                let n = response[i].naziv.toUpperCase();
                str = str.toUpperCase(); //pretraga ce raditi bez obzira na velicinu unetih slova
                if (n.search(str) != -1) {
                    prostorUpisaFilma.innerHTML +=
    `<div class="ispis movie">
    <div class="iks">X<span>${response[i]._id}</span></div>
    <img src="${response[i].slika}" > </img>
    <center><h3> ${response[i].naziv}  <h3></center>
    <p> ${response[i].godina}  </p>
    </div> <br>`;
                }
            }
        });
    });




// funkcija za ispis sortiranih rezultata
    function render(niz) {
      stringUpis = ""
      for (let i = 0; i < niz.length; i++) {
        stringUpis +=
          `
          <div class="filmski-div-sortirano movie">
          <div class="iks">X<span>${niz[i]._id}</span></div>
          <img src=${niz[i].slika} alt="" class="slike" >
          <center><h3 class= "naslov-filma">${niz[i].naziv}</h3></center>
          <p> Godina : ${niz[i].godina}</p>
          </div>
        `
      }
      prikaz.innerHTML = stringUpis;
    }


//funkcija za sortiranje prema godini UP
    function compareGodinaUp(a, b) {
      if (a.godina < b.godina)
        return -1;
      if (a.godina > b.godina)
        return 1;
      return 0;
    }

//event listener na dugmetu za sortiranje prema godini filma  - UP, sa pozivom na funkciju za sortiranje,kao i funkciju za ispis rezultata
    strGoreGod.addEventListener('click', function (e) {
      e.preventDefault();
      let sortirano = sviFilmovi.sort(compareGodinaUp);
      render(sortirano);
      // console.log(sortirano);
    });


//funkcija za sortiranje prema godini DOWN
    function compareGodinaDown(a, b) {
      if (a.godina > b.godina)
        return -1;
      if (a.godina < b.godina)
        return 1;
      return 0;
    }

//event listener na dugmetu za sortiranje prema godini filma  - DOWN, sa pozivom na funkciju za sortiranje,kao i funkciju za ispis rezultata
    strDoleGod.addEventListener('click', function (e) {
      e.preventDefault();
      let sortirano = sviFilmovi.sort(compareGodinaDown);
      render(sortirano);

      // console.log(sortirano);
    });


//SORTIRANJE PREMA NAZIVU


//funkcija za sortiranje prema nazivu UP
function compareNazivUp(a, b) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

//event listener na dugmetu za sortiranje prema nazivu filma  - UP, sa pozivom na funkciju za sortiranje,kao i funkciju za ispis rezultata
strGoreNaz.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivUp);
  render(sortirano);
  // console.log(sortirano);
});

//funkcija za sortiranje prema nazivu DOWN
function compareNazivuDown(a, b) {
  if (a.naziv > b.naziv)
    return -1;
  if (a.naziv < b.naziv)
    return 1;
  return 0;
}

//event listener na dugmetu za sortiranje prema nazivu filma  - DOWN, sa pozivom na funkciju za sortiranje,kao i funkciju za ispis rezultata
strDoleNaz.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivuDown);
  render(sortirano);
  // console.log(sortirano);
});





// MODAL
$(document).on("click", ".movie", function (){
  $("#myModal").modal("show");
  let ime = $(this).find("h3").html()
  fetch(`https://www.omdbapi.com/?t=${ime}&plot=full&apikey=c3d2adef`)
  .then(res => res.json())
  .then(data => {
    document.querySelector(".naziv").innerHTML = data.Title;
    document.querySelector(".glumci").innerHTML = data.Actors;
    document.querySelector(".plot").innerHTML = data.Plot;
    document.querySelector(".nagrade").innerHTML = data.Awards;
})

});
$('#ok').on('click', function () {
  $("#myModal").modal('hide');
})
// MODAL END



// dodavanje opcije za brisanje filma nakon validacije Username-a i Password-a
login.addEventListener('click', function () {
  if (user.value == "admin" && pass.value == "admin") {
    const iks = document.getElementsByClassName('iks')
    for (let i = 0; i < iks.length; i++) {
      iks[i].style.display = "block";
    }
  }
})





/// delete funkcija
function deleteData(item) {
  return fetch(`'https://baza-filmova.herokuapp.com/obrisi-film/'${item}`, {
    method: 'delete'
  })
  .then(response => response.json());
}

//klikom na "X" trazi se  ID konkretnog filma i preko pozvane funkcije se salje zahtev DELETE na server
$(document).on('click', ".iks", function (){
  let deleteId = $(this).find('span').html()
  console.log(deleteId);
  deleteData(deleteId)
});
