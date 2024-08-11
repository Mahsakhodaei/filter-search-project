// http://localhost:3000/items

// ------------- variables ------------
let allProductsData = [];
let filters = {
  searchItems: "",
};

// ------------- selecting ------------
const searchInput = document.querySelector("#search");
const productDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

// ------------- event ------------
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.searchItems = filter;
    renderProducts(allProductsData , filters)
  });
});
// ------------- function ------------

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productDOM.innerHTML = "";
  console.log(filteredProducts);
  // render to DOM
  filteredProducts.forEach((item) => {
    //create
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    // content
    productsDiv.innerHTML = `  <div class="img-container">
      <img src=${item.image} class="product-img" />
    </div>
    <div class="product-desc">
      <p class="product-price">$ ${item.price}</p>
      <p class="product-title">${item.title}</p>
    </div>`;
    // append to product
    productDOM.appendChild(productsDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      console.log(res.data);
      allProductsData = res.data;
      //render products on DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => {
      console.log(err);
    });
});
