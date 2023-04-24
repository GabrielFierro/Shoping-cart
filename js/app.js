// Variables zone
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCart = document.getElementById("template-cart").content;
const fragment = document.createDocumentFragment();
let cart = {}; // It's an object without elements

// Events listener zone
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

cards.addEventListener("click", (e) => {
  addProduct(e);
});

// Functions zone
const fetchData = async () => {
  try {
    const res = await fetch("../api.json");
    const data = await res.json();
    displayCards(data);
  } catch (error) {
    console.log(error);
  }
};

const displayCards = (data) => {
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = product.price;
    templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);

    templateCard.querySelector(".btn-dark").dataset.id = product.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addProduct = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setProduct(e.target.parentElement); // Send to the parent object the information
  }
  e.stopPropagation(); // Stop another event that can be generated
};

const setProduct = (item) => {
  const product = {
    title: item.querySelector("h5").textContent,
    price: item.querySelector("p").textContent,
    id: item.querySelector(".btn-dark").dataset.id,
    cant: 1,
  };

  if (cart.hasOwnProperty(product.id)) {
    product.cant = cart[product.id].cant + 1;
  }

  cart[product.id] = { ...product };
  displayCart();
};

const displayCart = () => {
  items.innerHTML = "";

  Object.values(cart).forEach((product) => {
    templateCart.querySelector("th").textContent = product.id;
    templateCart.querySelectorAll("td")[0].textContent = product.title;
    templateCart.querySelectorAll("td")[1].textContent = product.cant;
    templateCart.querySelector(".btn-info").dataset.id = product.id;
    templateCart.querySelector(".btn-danger").dataset.id = product.id;
    templateCart.querySelector("span").textContent =
      product.cant * product.price;

    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);

  displayFooter();
};

const displayFooter = () => {
  footer.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    return;
  }

  const nCant = Object.values(cart).reduce((acc, { cant }) => acc + cant, 0);
  const nPrice = Object.values(cart).reduce(
    (acc, { cant, price }) => acc + cant * price,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCant;
  templateFooter.querySelector("span").textContent = nPrice;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const button = document.querySelector("#vaciar-carrito");
  button.addEventListener("click", () => {
    cart = {};
    displayCart();
  });
};
