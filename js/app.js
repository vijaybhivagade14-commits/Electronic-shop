document.addEventListener("DOMContentLoaded", () => {

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const cartCount = document.getElementById("cart-count");
const sidebar = document.getElementById("sidebar");
const contactForm = document.getElementById("contactForm");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ✅ FIXED CART COUNT (Quantity Based) */
function updateCartCount() {
  if (cartCount) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ✅ Display Products */
function displayProducts(list) {
  if (!productList) return;

  productList.innerHTML = "";

  list.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}" width="150">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

/* ✅ FIXED Add To Cart */
window.addToCart = function(id) {

  const existingItem = cart.find(p => p.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // const product = products.find(p => p.id === id);
    const product = products.find(p => p.id == id);


    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,  // 🔥 Important mapping
      quantity: 1
    });
  }

  updateCartCount();
};

/* Search */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    displayProducts(products.filter(p =>
      p.name.toLowerCase().includes(value)
    ));
  });
}

/* Filter */
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;

    if (value === "all") {
      displayProducts(products);
    } else {
      displayProducts(products.filter(p => p.category === value));
    }
  });
}

/* Sidebar */
if (sidebar) {
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("closeSidebar");

  if (hamburger)
    hamburger.onclick = () => sidebar.classList.add("open");

  if (closeSidebar)
    closeSidebar.onclick = () => sidebar.classList.remove("open");
}

/* Contact Form */
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errors = document.querySelectorAll(".error");

    errors.forEach(e => e.textContent = "");

    if (!/^[A-Za-z ]{3,}$/.test(name.value)) {
      errors[0].textContent = "Invalid name";
      valid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errors[1].textContent = "Invalid email";
      valid = false;
    }

    if (message.value.length < 10) {
      errors[2].textContent = "Message too short";
      valid = false;
    }

    if (valid) {
      document.getElementById("success").textContent =
        "Message sent successfully!";
      e.target.reset();
    }
  });
}

/* Initial Load */
if (typeof products !== "undefined") {
  displayProducts(products);
}

updateCartCount();

});
