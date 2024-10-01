let base = localStorage.getItem("karzina");
const block = document.querySelector(".block");
let new_base = JSON.parse(base);
function f() {
  block.innerHTML = `
    <p class="arrow"><i class="fa-solid fa-arrow-left"></i></p>
    <p class="total">Total price:0$ </p>
  `;
  new_base.forEach((element) => {
    block.innerHTML += `
          <div class="cart-wrapper">
          <div class="cart-card">
            <div class="product-image">
              <img src="${element.images[0]}" alt="Product Image" />
            </div>
            <div class="product-info">
              <h2 class="product-title">${element.title}</h2>
              <p class="product-price">$${element.price}</p>
              <p class="product-total"><b>total price:</b><span class ="giny">${element.price}</span><i>$</i></p>
            </div>
             <div class="product-quantity">
                    <button class="decrease-btn">-</button>
                    <input type="text" value="1" class = "quan">
                    <button class="increase-btn">+</button>
                </div>
            <div class="cart-actions">
              <button class="remove-btn">Remove</button>
            </div>
         </div>
        </div>
      `;
  });
  total();
  const buts = document.querySelectorAll(".cart-actions");
  buts.forEach((elem, ind) => {
    elem.addEventListener("click", () => {
      let first = new_base[0];
      new_base[0] = new_base[ind];
      new_base[ind] = first;
      new_base.shift();
      f();
      localStorage.clear();
      localStorage.setItem("karzina", JSON.stringify(new_base));
    });
  });
  const arrow = document.querySelector(".arrow");
  arrow.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
f();
let qan = document.querySelectorAll(".quan");
let decrese = document.querySelectorAll(".decrease-btn");
let incrase = document.querySelectorAll(".increase-btn");
let tot = document.querySelectorAll(".giny");
decrese.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    let val = qan[index].value;
    if (val > 0) {
      val--;
      qan[index].value = val;
      tot[index].innerHTML =val*new_base[index].price ;
      total();
    }
  });
});
incrase.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    let val = qan[index].value;
    val++;
    qan[index].value = val;
  tot[index].innerHTML =val*new_base[index].price 
    total();
  });
});
function total() {
  let parents = document.querySelectorAll(".giny");
  let space = document.querySelector(".total");
  let prices = 0;
  parents.forEach((elem, index) => {
    let gin = parseInt(elem.textContent);
    prices += gin ;
  });
  space.innerHTML="total price:" + prices +"$" ;
}

