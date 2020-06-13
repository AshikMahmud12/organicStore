// Global
var products = [];
var cartItems = [];
var cart_n = document.getElementById("cart_n");

// Divs
var fruitDIV = document.getElementById("fruitDIV");
var juiceDIV = document.getElementById("juiceDIV");
var saladDIV = document.getElementById("saladDIV");

// Information
var FRUIT = [
    { name: "Apple", price: 1 },
    { name: "Grape", price: 1 },
    { name: "Banana", price: 1 },
    { name: "Orange", price: 1 },
    { name: "Strawberry", price: 1 },
    { name: "kiwi", price: 1 },
    { name: "chery", price: 1 },
    { name: "Watermelon", price: 1 },
];

var Juice = [
    { name: "Juice #1", price: 14 },
    { name: "Juice #2", price: 15 },
    { name: "Juice #3", price: 16 },
    { name: "Juice #4", price: 17 },
];


var Salad = [
    { name: "Salad #1", price: 14 },
    { name: "Salad #2", price: 15 },
    { name: "Salad #3", price: 16 },
    { name: "Salad #4", price: 17 },
];

// Html

function HtmlfruitProduct(con) {
    let URL = `assets/img/fruits/fruits${con}.jpg`;
    let btn = `btnFruit${con}`;

    return `
    <div class="col s3 wow fadeInUp data-wow-delay="4s" data-wow-offset="300" ">
    <div class="card">
    <div class="card-image">
    <img height="200" width="100%" src ="${URL}" >
    <a id="${btn}" onclick="cart('${FRUIT[con-1].name}', '${
        FRUIT[con-1].price
    }','${URL}','${con}','${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
    <i class="material-icons">add</i>
    </a>
    </div>
    
    <div class="card-content">
    <i class="material-icons" style="color:orange">star</i>
    <i class="material-icons" style="color:orange">star</i>
    <i class="material-icons" style="color:orange">star</i>
    <i class="material-icons" style="color:orange">star</i>
    <i class="material-icons" style="color:orange">star</i>
    <span class="card-title">${FRUIT[con - 1].name}</span>
    <p> Price:${FRUIT[con - 1].price}</p>
    </div>
    
    </div>
    </div>
    `;
}

function HtmljuiceProduct(con) {
    let URL = `assets/img/juice/juice${con}.jpg`;
    let btn = `btnJuice${con}`;

    return `
        <div class="col s3 wow fadeInUp data-wow-delay="3s" data-wow-offset="300" ">
        <div class="card">
        <div class="card-image">
        <img height="250" width="100%" src ="${URL}">
        <a id="${btn}" onclick="cart('${Juice[con - 1].name}', '${
        Juice[con - 1].price
    }','${URL}','${con}','${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
        <i class="material-icons">add</i>
        </a>
        </div>
        
        <div class="card-content">
        <i class="material-icons" style="color:orange">star</i>
        <i class="material-icons" style="color:orange">star</i>
        <i class="material-icons" style="color:orange">star</i>
        <i class="material-icons" style="color:orange">star</i>
        <i class="material-icons" style="color:orange">star</i>
        <span class="card-title">${Juice[con - 1].name}</span>
        <p> Price:${Juice[con - 1].price}</p>
        </div>
        
        </div>
        </div>
        `;
}

function HtmlsaladProduct(con) {
    let URL = `assets/img/salad/salad${con}.jpeg`;
    let btn = `btnSalad${con}`;

    return `
            <div class="col s3 wow fadeInUp data-wow-delay="3s" data-wow-offset="300" ">
            <div class="card">
            <div class="card-image">
            <img height="200" width="100%" src ="${URL}">
            <a id="${btn}" onclick="cart('${Salad[con - 1].name}', '${
        Salad[con - 1].price
    }','${URL}','${con}','${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
            <i class="material-icons">add</i>
            </a>
            </div>
            
            <div class="card-content">
            <i class="material-icons" style="color:orange">star</i>
            <i class="material-icons" style="color:orange">star</i>
            <i class="material-icons" style="color:orange">star</i>
            <i class="material-icons" style="color:orange">star</i>
            <i class="material-icons" style="color:orange">star</i>
            <span class="card-title">${Salad[con - 1].name}</span>
            <p> Price:${Salad[con - 1].price}</p>
            </div>
            
            </div>
            </div>
            `;
}

// Animation
function animation() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });
    Toast.fire({
        type: "success",
        title: "Added to shopping cart",
    });
}
// Cart Function
function cart(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url,
    };
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}

// Render
$(".carousel.carousel-slider").carousel({
    fullWidth: true,
    indicators: true,
});
$(document).ready(function () {
    $(".modal").modal();
});

function render() {
    new WOW().init();
    for (let index = 1; index <= 8; index++) {
        fruitDIV.innerHTML += `${HtmlfruitProduct(index)}`;
    }
    for (let index = 1; index <= 4; index++) {
        juiceDIV.innerHTML += `${HtmljuiceProduct(index)}`;
        saladDIV.innerHTML += `${HtmlsaladProduct(index)}`;
    }
  if (localStorage.getItem('cart')==null) {
      
  } else {
      products=JSON.parse(localStorage.getItem('cart'));
      cart_n.innerHTML=`[${products.length}]`;

  }
}
