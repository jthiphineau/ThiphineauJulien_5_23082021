// RECUPERATION URL
let params = new URL(document.location).searchParams;

// RECUPERATION DE L'ID DANS L'URL
let id = params.get("id");

// AFFICHAGE HTML ITEM DANS ITEM_PAGE
let itemContainer = document.getElementById("itemContainer");
itemView = (item) => {
  itemContainer.innerHTML = `<div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src=${
    item.imageUrl
  } alt="..." /></div>
        <div class="col-md-6">
            <div class="small mb-1">Ref:${item.id}</div>
            <h1 class="display-5 fw-bolder">${item.name}</h1>
            <div class="fs-5 mb-5">
            <span>${item.price / 100}€</span>
        </div>
        <p class="lead">${item.description}</p>
        <div class="d-flex">
            <input class="form-control text-center me-3" id="inputQuantity" type="number" value="1" min="1" max="20" style="max-width: 4.5rem" />
            <select id="options" class="me-3 dropdown">
            
            </select>
        </div>
        <a title="Ajouter au panier" href="cart_page.html">
            <button  id="addCart" class="btn btn-outline-dark flex-shrink-0 mt-3">
                <i class="bi-cart-fill me-1"></i>
                Ajouter au panier
            </button>
        </a>
    </div>`;

  // SELECTION LENSES
  for (lenses of item.lenses) {
    options = document.getElementById("options");
    options.innerHTML += `<option value="${lenses}">${lenses}</option>`;
  }

  //ECOUTE AU CLIC
  addCart = document.getElementById("addCart");
  addCart.addEventListener("click", function () {
    addToCart(item);
  });
};

// LOCAL STORAGE
addToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//AJOUT AU PANIER
addToCart = (item) => {
  item.lenses = document.getElementById("options").value;
  item.quantity = parseInt(document.getElementById("inputQuantity").value);
  //RECUPERATION DU PANIER
  cart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  // BOUCLE FOR PARCOURIR LIGNE PANIER
  cameraExistIndex = false;
  for (i = 0; i < cart.length; i++) {
    item2 = cart[i];
    if (item.id === item2.id) {
      cameraExistIndex = i;
    }
  }
  if (false !== cameraExistIndex) {
    cart[cameraExistIndex].quantity =
      parseInt(cart[cameraExistIndex].quantity) + item.quantity;
  } else {
    cart.push(item);
  }
  addToLocalStorage(cart);
};

// REQUETE API
fetch("http://localhost:3000/api/cameras/" + id)
  .then((res) => res.json())
  .then(function (cam) {
    let item = new Product(cam);
    itemView(item);
  })
  .catch(function (err) {
    console.log("fetch Error");
    alert("Désolé aucun produit n'a été trouvé !");
  });
