// RECUPERATION LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart"));

let cartContainer = document.getElementById("cartContainer");

// AFFICHAGE SI LE PANIER EST VIDE
if (cart == null || cart == []) {
  cartContainer.innerHTML = `<div class="text-center mt-1 mb-2">
        <h1 class="display-5 fw-bolder text-center">est vide...</h1>
        <a href="../index.html" class="btn btn-dark btn-outline-dark mt-5 display-5">Remplissez-le ! <i class="fas fa-camera-retro"></i></a>
    </div>`;

  // AFFICHAGE SI LE PANIER CONTIENT UN OU DES PRODUITS
} else {
  //EN TETE DU TABLEAU
  theadContainer = document.getElementById("theadContainer");
  theadContainer.innerHTML = `<tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Option</th>
        <th>Prix Unitaire</th>
        <th>Quantité</th>
        <th>Prix Total</th>
        <th>Supprimer</th>
    </tr>`;

  //AFFICHAGE DES PRODUITS DANS BODY DU TABLEAU
  for (i = 0; i < cart.length; i++) {
    cartContainer.innerHTML += `<tr>
        <td class="w-25"><img class="card-img" src="${cart[i].imageUrl}"></td>
        <td class="align-middle">${cart[i].name}</td>
        <td class="align-middle">${cart[i].lenses}</td>
        <td class="align-middle">${cart[i].price / 100}€</td>
        <td class="align-middle">${cart[i].quantity}</td>
        <td class="align-middle">${
          (cart[i].quantity * cart[i].price) / 100
        }€</td>
        
        <td class="align-middle"><button class="delete1Item btn btn-outline-dark" data-id="${i}"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`; //a voir pour pouvoir modifier la quantité sur cette page et que le calcul des prix suivent

    // BOUCLE POUR AJOUTER ID PRODUITS
    var addIdCart = [];
    for (j = 0; j < cart[i].quantity; j++) {
      addIdCart.push(cart[i].id);
    }
  }

  // SUPPRIMER UN ARTICLE
  delete1 = (id) => {
    if (cart[id].quantity > 1) {
      cart[id].quantity--;
    } else {
      cart.splice(id, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  document.querySelectorAll(".delete1Item").forEach((btnDelete) => {
    btnDelete.addEventListener("click", () => delete1(btnDelete.dataset.id));
  });

  //CALCUL DU PRIX DU PANIER
  totalPrice = [];
  for (k = 0; k < cart.length; k++) {
    priceInCart = cart[k].price * cart[k].quantity;
    totalPrice.push(priceInCart);
  }

  reducer = (accumulator, currentValue) => accumulator + currentValue;
  totalPriceCalculation = totalPrice.reduce(reducer, 0);

  // AFFICHAGE DU PRIX DANS FOOTER DU TABLEAU
  totalPriceContainer = document.getElementById("totalPriceContainer");
  totalPriceContainer.innerHTML = `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <th>TOTAL</th>
    <th>${totalPriceCalculation / 100}€</th>
    <th><button id="deleteAll" class="btn btn-outline-dark">Tout supprimer</button></th>
    </tr`;

  localStorage.setItem(
    "totalPriceCalculation",
    JSON.stringify(totalPriceCalculation)
  );

  // SUPRIMER TOUT LE PANIER
  deleteCart = () => {
    if (cart == null) {
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };
  deleteAll = document.getElementById("deleteAll");
  deleteAll.addEventListener("click", deleteCart);

  // AFFICHAGE DU FORMULAIRE DE COMMANDE
  formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = `
    <div class="form-group col-md-6 mt-3">
        <input type="text" required class="form-control" id="inputfirstName" placeholder="Nom">
    </div>
    <div class="form-group col-md-6 mt-3">
        <input type="text" required class="form-control" id="inputlastName" placeholder="Prénom">
    </div>

    <div class="form-group col-md-6 mt-3">
        <input type="email" required class="form-control" id="inputEmail" placeholder="Email">
    </div>
    <div class="form-group col-md-6 mt-3">
        <input type="text" required class="form-control" id="inputAddress" placeholder="Adresse">
    </div>
    <div class="form-group col-md-6 mt-3">
        <input type="text" required class="form-control" id="inputAddress2" placeholder="Complément d'adresse">
    </div>
    <div class="form-group col-md-6 mt-3">
        <input type="number" min="0" max="100000" required class="form-control" id="inputPostalCode" placeholder="Code Postal">
    </div>
    <div class="form-group col-md-6 mt-3">
        <input type="text" required class="form-control" id="inputCity" placeholder="Ville">
    </div>
    <a title="Commander" href="confirmation_page.html">
        <button id="order" type="submit" class="btn btn-dark mt-3">
            Commander
        </button>
    </a>
    `;

  // PREPARATION DE LA COMMANDE
  sendOrder = () => {
    if (formContainer.reportValidity() == true && addIdCart.length > 0) {
      var contact = {
        firstName: document.getElementById("inputfirstName").value,
        lastName: document.getElementById("inputlastName").value,
        email: document.getElementById("inputEmail").value,
        address: document.getElementById("inputAddress").value,
        address2: document.getElementById("inputAddress2").value,
        postalCode: document.getElementById("inputPostalCode").value,
        city: document.getElementById("inputCity").value,
      };

      products = [addIdCart];

      customerOrder = {
        contact,
        products,
      };

      // REQUETE API FETCH POST
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(customerOrder),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (r) {
          localStorage.setItem("contact", JSON.stringify(r.contact));
          window.location.assign("confirmation_page.html?orderId=" + r.orderId);
        })
        .catch(function (err) {
          console.log("fetch Error");
        });
    }
  };

  order = document.getElementById("order");
  order.addEventListener("click", function (e) {
    e.preventDefault();
    sendOrder();
  });
}
