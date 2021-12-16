"use strict"

let witacz = document.getElementById("witacz")

let odwiedzajacy = prompt("Wpisz swoje imię");
  if (odwiedzajacy !== null) {
    witacz.innerHTML = "Witaj na stronie " + odwiedzajacy + "!";
    
  }