// script.js
class ShoppingCart {
    constructor() {
      this.products = [];
      this.taxRate = 0.08;
    }
  
    addItem(productId, products) {
      const product = products.find((product) => product.id === productId);
      if (product) {
        this.products.push(product);
        this.calculateTotal();
      }
    }
  
    removeItem(productId) {
      this.products = this.products.filter((product) => product.id !== productId);
      this.calculateTotal();
    }
  
    calculateTotal() {
      const subtotal = this.products.reduce((total, product) => total + product.price, 0);
      const taxes = this.calculateTaxes(subtotal);
      const total = subtotal + taxes;
      document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById("taxes").textContent = `$${taxes.toFixed(2)}`;
      document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    }
  
    calculateTaxes(amount) {
      return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }
  
    clearCart() {
      this.products = [];
      this.calculateTotal();
    }
  
    getCounts() {
      return this.products.length;
    }
  }
  
  const cart = new ShoppingCart();
  const products = [
    { id: 1, name: "Product 1", price: 10.99, category: "Category 1" },
    { id: 2, name: "Product 2", price: 9.99, category: "Category 2" },
    { id: 3, name: "Product 3", price: 12.99, category: "Category 3" },
  ];
  
  const cartContainer = document.getElementById("cart-container");
  const productsContainer = document.getElementById("products-container");
  const dessertCards = document.getElementById("dessert-card-container");
  const cartBtn = document.getElementById("cart-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const totalNumberOfItems = document.getElementById("total-items");
  const cartSubTotal = document.getElementById("subtotal");
  const cartTaxes = document.getElementById("taxes");
  const cartTotal = document.getElementById("total");
  const showHideCartSpan = document.getElementById("show-hide-cart");
  let isCartShowing = false;
  
  products.forEach((product) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${product.name}</h2>
        <p class="dessert-price">$${product.price}</p>
        <p class="product-category">Category: ${product.category}</p>
        <button id="${product.id}" class="btn add-to-cart-btn">Add to cart</button>
      </div>
    `;
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
    Array.from(addToCartBtns).forEach((btn) => {
      btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id), products);
        totalNumberOfItems.textContent = cart.getCounts();
      });
    });
  
    cartBtn.addEventListener("click", () => {
      isCartShowing = !isCartShowing;
      showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
      cartContainer.style.display = isCartShowing ? "block" : "none";
    });
  
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the cart?")) {
        cart.clearCart();
        totalNumberOfItems.textContent = cart.getCounts();
      }
    });
  });