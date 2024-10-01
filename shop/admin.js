const engine = document.querySelector("#engine_form");
engine.addEventListener("submit", adder);

function adder(e) {
    const arr = JSON.parse(localStorage.getItem("product")) || [];
    e.preventDefault();
    const name = document.querySelector("#product-name").value;
    const price = document.querySelector("#product-price").value;
    const description = document.querySelector("#product-description").value;
    const category = document.querySelector("#product-category").value;
    const images = document.querySelector("#product-image").files;
    const image = URL.createObjectURL(images[0]);
    const prod = {
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "image": image,
        "rating": 0
    };
    arr.push(prod)

    const product = JSON.stringify(arr);
    localStorage.setItem("product", product);


    // console.log();
}