const previewUrl = document.getElementById ('previewUrl');
const preview = document.getElementById ('preview');
const dodajIme = document.getElementById("dodajIme");
const dodajGodina = document.getElementById("dodajGodina");
const urlDodaj = "https://baza-filmova.herokuapp.com/dodaj-film/";
const method = "POST";
const dodajDugme = document.getElementById("dodajDugme");


//funkcija za dodavanje filmova sa podacima popunjenim u formi
dodajDugme.addEventListener('click', function (e) {
  e.preventDefault();
    let postData = {
    naziv: dodajIme.value,
    godina: dodajGodina.value,
    slika: previewUrl.value
  }
    // slanje podataka na server
  $.post(urlDodaj, postData, function(data, status) {
    //povratna poruka sa servera o uspesnom postavljanju filma
    let msgUspeh = document.getElementById("msgUspeh");
    msgUspeh.innerHTML = data;
  });
});


//prikazivanje slike za koju je upisan URL
previewUrl.addEventListener('input', function() {
    preview.src = previewUrl.value;
  });
