// Variables zone
const cards = document.getElementById("cards");
const templateCard = document.getElementById("template-card").content;
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
    // console.log(data);
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

const setProduct = (productsSelected) => {
  const product = {
    id: productsSelected.querySelector(".btn-dark").dataset.id,
    title: productsSelected.querySelector("h5").textContent,
    price: productsSelected.querySelector("p").textContent,
    stock: 1,
  };

  if (cart.hasOwnProperty(product.id)) {
    product.stock = cart[product.id].stock + 1;
  }

  cart[product.id] = { ...product };

  console.log(cart);
};
