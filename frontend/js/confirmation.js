//RECUPERATION DES DONNEES URL
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem(""))