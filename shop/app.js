const space = document.querySelector(".area");
let tiv = 6;
async function reader() {
    const date = await fetch("https://dummyjson.com/products");
    let base = await date.json();
    space.innerHTML = "";
    /*baza sovorakan */
    const more = document.querySelector("#learn_more");
    const other = localStorage.getItem("product");
    let admin = JSON.parse(other);
    // console.log(admin);
    if (admin) {

        admin.forEach((elem, ind) => {
            space.innerHTML += `
                <div class="cart-container">
                   <div class="cart-item">
                       <div class="product-image">
                           <img src="${elem.image}" alt="Product Image">
                       </div>
                           <div class="product-details">
                               <h2 class="product-title">${elem.name}</h2>
                               <p class="product-description">${elem.description}</p>
                               <div class="product-rating">
                               ${elem.rating}/5
                           </div>
                               <button class="add-to-cart-btn">Add to Cart</button>
                           </div>
                               <br>
                               <p class="product-price">${elem.price}$</p>
                       </div> 
                   </div>
            `
        })
    }

    more.addEventListener("click", () => {
        tiv += 6;
        let k = 30 + admin.length;
        reader();
        if (tiv >= k) {
            more.style = "display:none;";
        }
    });

    base["products"].forEach((elem, ind) => {
        if (ind >= tiv) {
            return;
        }
        space.innerHTML += `
            <div class="cart-container">
               <div class="cart-item">
                   <div class="product-image">
                       <img src="${elem.images[0]}" alt="Product Image">
                   </div>
                       <div class="product-details">
                           <h2 class="product-title">${elem.title}</h2>
                           <p class="product-description">${elem.description}</p>
                           <div class="product-rating">
                           ${elem.rating}/5
                       </div>
                           <button class="add-to-cart-btn">Add to Cart</button>
                       </div>
                           <br>
                           <p class="product-price">${elem.price}$</p>
                   </div> 
               </div>
        `
    });
    /* manramasn bajin */
    let img = document.querySelectorAll("img");
    img.forEach((element, ind) => {
        element.addEventListener("click", function() {
            let new_base = JSON.stringify(base["products"][ind])
            localStorage.setItem("product", new_base)
            draw()
        })
    });
    /*Add to cart */
    let but = document.querySelectorAll(".add-to-cart-btn");
    let shop = [];
    but.forEach((elem, index) => {
            elem.addEventListener("click", function() {
                let num = document.querySelector(".numb");
                let karzin = localStorage.getItem("karzina") || "[]";
                let parse = JSON.parse(karzin);
                let item = base["products"][index].id;
                let checked = shop.includes(item);
                if (checked != true) {
                    parse.push(base["products"][index]);
                    console.log(item, parse);
                    let st = JSON.stringify(parse);
                    localStorage.setItem("karzina", st);
                    num.innerHTML = parse.length;
                }
                shop.push(item)
            })
        })
        /* karzina mtnel */
    let wind = document.querySelector(".karzina");
    wind.addEventListener("click", function() {
            window.location.href = "karzina.html"
        })
        /* karzinayi qanak */
    function qanak() {
        let numb = document.querySelector(".numb");
        let number = document.querySelector(".number");
        let qan = localStorage.getItem("karzina");
        let qan_parsed = JSON.parse(qan);
        numb.innerHTML = qan_parsed.length || 0;
        number.innerHTML = qan_parsed.length || 0;
    }
    qanak();

    function second() {
        let body = document.querySelector("body");
        let numb = document.querySelector(".karzina");
        let number = document.querySelector(".special_li");
        number.addEventListener("click", function() {
            window.location.href = "karzina.html"
        })
        let flag
        if (body.getBoundingClientRect().y < -88) {
            flag = true;
        } else {
            flag = false;
        }
        if (flag === false) {
            numb.style = "display: none;";
            number.style = "display: block;";
        } else {
            numb.style = "display: block;";
            number.style = "display: none;";
        }
    }
    second();
    window.addEventListener("scroll", second);
}
reader()
    // searching system
let ser = document.querySelector("#searching");
ser.addEventListener("input", search)
async function search() {
    let date = await fetch("https://dummyjson.com/products");
    let base = await date.json();
    let area = document.querySelector(".area")
    area.innerHTML = ``; // clear old content
    base["products"].forEach((elem, ind) => {
        for (let key in elem) {
            if (key == "brand" || key == "category" || key == "sku" || key == "title") {
                let checked = elem[key].match(ser.value);
                if (checked != null) {
                    area.innerHTML += `
                        <div class="cart-container">
                           <div class="cart-item">
                               <div class="product-image">
                                   <img src="${elem.images[0]}" alt="Product Image">
                               </div>
                                   <div class="product-details">
                                       <h2 class="product-title">${elem.title}</h2>
                                       <p class="product-description">${elem.description}</p>
                                       <div class="product-rating">
                                       ${elem.rating}/5
                                   </div>
                                       <button class="add-to-cart-btn">Add to Cart</button>
                                   </div>
                                       <br>
                                       <p class="product-price">${elem.price}$</p>
                               </div> 
                           </div>
                    `
                }
                break;
            }
        }
    })
}

function draw() {
    let bl = document.querySelector('.bl');
    let baza = localStorage.getItem("product");
    let new_baza = JSON.parse(baza);
    bl.innerHTML = `
        <div class="product-card">
            <img src="${new_baza.images[0]}" alt="Product Image" class="product-images">
            <div class="product-info">
            <button class="cl" id="closeTheWindow">
                <i class="fa-solid fa-xmark"></i>
            </button>
                <h2 class="product-titles">${new_baza.title}</h2>
    
                <div class="rating">
                    RATING <span>(${new_baza.rating}/5)</span>
                </div>
                <p class="product-description">
                    ${new_baza.description}
                </p>
                <p class="product-price">${new_baza.price}$</p>
                <p class="stock-status">In Stock</p>
                <!--<button class="buy-now">Buy Now</button>--> 
            </div>
        </div> 
    `
    document.getElementById("closeTheWindow").addEventListener("click", function() {
        bl.innerHTML = "";
        localStorage.removeItem("product");
    })
}