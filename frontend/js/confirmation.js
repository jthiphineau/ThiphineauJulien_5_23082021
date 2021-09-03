//RECUPERATION DES DONNEES URL
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem("contact"));

// RECUPERATION DU PRIX TOTAL
let totalPriceCalculation = JSON.parse(
  localStorage.getItem("totalPriceCalculation")
);

// AFFICHAGE HTML
let confirmationContainer = document.getElementById("confirmationContainer");
function confirmationView() {
  confirmationContainer.innerHTML = `<div class="text-center mt-1 mb-2">
    <h1 class="display-5 fw-bolder text-center">Confirmation de votre commande</h1>
    <p class="text-center"> Merci ${contact.firstName} ${contact.lastName} !</p>
    <p class="text-center"> Votre commande a bien été enregistrée avec le n° ${orderId} </br>
    pour un montant total de ${totalPriceCalculation / 100}€</br>
    Un email vous sera envoyé à l'adresse suivante ${
      contact.email
    } au moment de l'expédition. </br>  
    <a id="backHome" href="../index.html" class="btn btn-outline-dark mt-5 display-5">Retour à l'accueil <i class="fas fa-camera-retro"></i></a>
</div>`;
}

confirmationView();

function refresh() {
  localStorage.clear();
  window.location.reload();
}

let backHome = document.getElementById("backHome");
backHome.addEventListener("click", refresh);
