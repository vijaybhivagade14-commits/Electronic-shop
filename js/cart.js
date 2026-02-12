
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update navbar count
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQty;
}

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Display cart items
function displayCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <button onclick="decreaseQty(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${item.id})">+</button>
          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
      <hr>
    `;
  });

  cartTotal.textContent = total;
}

// Increase quantity
function increaseQty(id) {
  const item = cart.find(p => p.id == id);
  item.quantity += 1;
  saveCart();
}

// Decrease quantity
function decreaseQty(id) {
  const item = cart.find(p => p.id == id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id != id);
  }

  saveCart();
}

// Remove item
function removeItem(id) {
  cart = cart.filter(p => p.id != id);
  saveCart();
}

// Initial load
updateCartCount();
displayCart();
