// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Render cart items in table
function renderCart() {
  console.log("Rendering cart with items:", cart);
  const tbody = document.querySelector("#cart-table tbody");
  tbody.innerHTML = "";
  let totalHarga = 0;

  // Show/hide empty cart message
  if (cart.length === 0) {
    console.log("Cart is empty, showing empty message");
    document.getElementById("empty-cart").classList.remove("d-none");
    document.getElementById("cart-content").classList.add("d-none");
    // Also clear any displayed receipt when cart is empty
    const outputStruk = document.getElementById("outputStruk");
    if (outputStruk) {
      outputStruk.textContent = ""; // Clear the receipt display
      outputStruk.style.display = "none"; // Hide the receipt display
    }
    const btnDownload = document.getElementById("btn-download");
    if (btnDownload) {
      btnDownload.style.display = "none"; // Hide download button
    }
  } else {
    console.log("Cart has items, showing content");
    document.getElementById("empty-cart").classList.add("d-none");
    document.getElementById("cart-content").classList.remove("d-none");
  }

  // Add each item to the table
  cart.forEach((item, index) => {
    const totalItem = item.price * item.qty;
    totalHarga += totalItem;

    tbody.innerHTML += `
            <tr>
              <td>${item.name}</td>
              <td>Rp ${item.price.toLocaleString("id-ID")}</td>
              <td>
                <div class="input-group" style="max-width: 120px">
                  <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)" ${
      item.qty <= 1 ? "disabled" : ""
    }>-</button>
                  <input type="text" class="form-control text-center" value="${
                    item.qty
                  }" readonly>
                  <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
              </td>
              <td>Rp ${totalItem.toLocaleString("id-ID")}</td>
              <td>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          `;
  });

  // Update total price
  document.getElementById("total-harga").textContent =
    "Total: Rp " + totalHarga.toLocaleString("id-ID");
}

// Update item quantity
function updateQuantity(index, change) {
  cart[index].qty += change;

  // Remove item if quantity becomes 0 or negative
  if (cart[index].qty <= 0) {
    removeItem(index);
    return;
  }

  // Save to localStorage and update display
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Clear entire cart
function clearCart() {
  // Directly clear the cart as confirm() is not allowed
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
  // Clear the receipt display after clearing cart
  const outputStruk = document.getElementById("outputStruk");
  if (outputStruk) {
    outputStruk.textContent = "";
    outputStruk.style.display = "none";
  }
  const btnDownload = document.getElementById("btn-download");
  if (btnDownload) {
    btnDownload.style.display = "none";
  }
}

// Initialize page and add click handlers for all add-to-cart buttons
document.addEventListener("DOMContentLoaded", function () {
  // Add direct click event handlers to all add-to-cart buttons
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  renderCart();
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((button) => {
    button.onclick = function () {
      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");
      const category = this.getAttribute("data-category");

      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex((item) => item.name === name);

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        cart[existingItemIndex].qty += 1;
      } else {
        // Add new item
        cart.push({
          name: name,
          price: parseInt(price),
          category: category,
          qty: 1,
        });
      }

      // Save to localStorage and update display
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();

      // Scroll to cart section (assuming this section exists in index.html)
      const cartSection = document.getElementById("cart");
      if (cartSection) {
        cartSection.scrollIntoView({ behavior: "smooth" });
      }

      // Prevent default action
      return false;
    };
  });

  // Initial render
  updateCartCount();
  renderCart();
});
