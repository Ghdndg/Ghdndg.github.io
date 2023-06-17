let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let items = [
  {    
    id: "1",
    image: "1.PNG",    
    name: "SUN FOCUS Гель для лица и тела после загара",
    price: 399,  
  },
  {    
    id: "2",
    image: "2.PNG",    
    name: "SHISEIDO Питательный крем для рук",
    price: 3499,  
  },
  {    
    id: "3",
    image: "3.PNG",    
    name: "PERLIER Гель для душа Fresia",
    price: 529,  
  },
  {    
    id: "4",
    image: "4.PNG",
    name: "MEA Молочко для тела",    
    price: 849,
  },
  {    
    id: "5",    
    image: "5.PNG",
    name: "EISENBERG Дезодорант-спрей 24 часа",    
    price: 1645,
  },
  {    
    id: "6",    
    image: "6.PNG",
    name: "KUNDAL Гель для душа Английская роза",    
    price: 1499,
  },
];

let cartItems = [];

function addToCart(itemId) {
  const existingItem = cartItems.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const item = items.find((item) => item.id === itemId);
    item.quantity = 1;
    cartItems.push(item);
  }
  updateCartCounter();
}
function updateCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  cartCounter.textContent = cartItems.length;
}
function removeFromCart(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);
  updateCart();
  updateCartCounter();
}

function increaseQuantity(itemId) {
  const item = cartItems.find((item) => item.id === itemId);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

function decreaseQuantity(itemId) {
  const item = cartItems.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  }
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.classList.add("cart-item-image");

    const nameElement = document.createElement("p");
    nameElement.textContent = item.name;
    nameElement.classList.add("cart-item-name");

    const priceElement = document.createElement("p");
    priceElement.textContent = "Цена: " + item.price + "₽";
    priceElement.classList.add("cart-item-price");

    const quantityElement = document.createElement("div");
    quantityElement.classList.add("cart-item-quantity");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("btn", "btn-quantity");
    decreaseButton.addEventListener("click", () => decreaseQuantity(item.id));


    const quantityValue = document.createElement("span");
    quantityValue.textContent = item.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.classList.add("btn", "btn-quantity");
    increaseButton.addEventListener("click", () => increaseQuantity(item.id));


    quantityElement.appendChild(decreaseButton);
    quantityElement.appendChild(quantityValue);
    quantityElement.appendChild(increaseButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.classList.add("btn", "btn-remove");
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    itemElement.appendChild(imageElement);
    itemElement.appendChild(nameElement);
    itemElement.appendChild(priceElement);
    itemElement.appendChild(quantityElement);
    itemElement.appendChild(removeButton);

    cartItemsElement.appendChild(itemElement);
  });
  const totalPrice = calculateTotal(cartItems);
  const cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = "Итого: " + totalPrice + "₽";

  if (cartItems.length > 0) {
    document.getElementById("cart-container").style.display = "block";
  } else {
    document.getElementById("cart-container").style.display = "none";
  }
}
function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach(function (item) {
    total += item.price * item.quantity;
  });
  return total;
}

let showCartBtn = document.getElementById("show-cart-btn");
showCartBtn.addEventListener("click", () => {
  document.getElementById("cart-container").style.display = "block";
  updateCart();
});

let closeCartBtn = document.getElementById("btn-close-cart");
closeCartBtn.addEventListener("click", () => {
  document.getElementById("cart-container").style.display = "none";
});

items.forEach((item, index) => {
  let addToCartBtn = document.getElementById("btn" + (index + 1));
  addToCartBtn.addEventListener("click", () => addToCart(item.id));
});
window.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
});
let button_buy = document.getElementById("button_buy");

popup__buy.addEventListener("click", () => {
let price = document.getElementById("cost").value;
let name = document.querySelector(".header-item").innerHTML;

data = {
price: price,
name: name
}
tg.sendData(JSON.stringify(data));
tg.close();
});

