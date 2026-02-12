let allProducts = [];
const grid = document.querySelector(".product-grid");
const cartCount = document.getElementById("cart-count");

// Load products
fetch("./data/product.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(allProducts);
  });

// Display products
function displayProducts(products) {
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

// Update cart count in navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => p.id == id);

  const existing = cart.find(item => item.id == id);

  if (existing) {
  existing.quantity += 1;
} else {
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  });
}


  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product.name + " added to cart!");
}

// Run when page loads
updateCartCount();
