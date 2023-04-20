// Variables zone
const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

// Events listener zone
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

items.addEventListener("click", (e) => {
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
  items.appendChild(fragment);
};

const addProduct = (e) => {
  console.log(e.target);
  console.log(e.target.classList.contains("btn-dark"));
};
