const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayProducts(list) {
  productList.innerHTML = "";
  list.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartCount();
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(value)));
});

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  if (value === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.category === value));
});

displayProducts(products);
updateCartCount();

/* SIDEBAR */
const sidebar = document.getElementById("sidebar");
document.getElementById("hamburger").onclick = () => sidebar.classList.add("open");
document.getElementById("closeSidebar").onclick = () => sidebar.classList.remove("open");

/* FORM VALIDATION */
document.getElementById("contactForm").addEventListener("submit", e => {
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
    document.getElementById("success").textContent = "Message sent successfully!";
    e.target.reset();
  }
});
