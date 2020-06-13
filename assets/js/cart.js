// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCu2VivOKBqGzaiUBUz954sxxoVsHyBVG8",
    authDomain: "organic-store-52805.firebaseapp.com",
    databaseURL: "https://organic-store-52805.firebaseio.com",
    projectId: "organic-store-52805",
    storageBucket: "organic-store-52805.appspot.com",
    messagingSenderId: "855605704890",
    appId: "1:855605704890:web:3900a23a0cde2e84bcea83",
    measurementId: "G-B5XGKSHQS2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Global
var products = JSON.parse(localStorage.getItem("cart"));
var cartItem = [];
var cart_n = document.getElementById("cart_n");
var table = document.getElementById("table");
var total = 0;
// HTML
function tableHTML(i) {
    return `<tr class="">
    <th scope="row">${i + 1}</th>
    <td><img style="width:90px;" src="${products[i].url}"></td>
    <td>${products[i].name}</td>
    <td>${1}</td>
    <td>${products[i].price}</td>
    </tr>
    `;
}

// form Cart
document.getElementById("formCart").addEventListener("submit", function (e) {
    e.preventDefault();
    userName = document.getElementById("userName");
    userEmail = document.getElementById("userEmail");
    userSelect = document.getElementById("userSelect");
    var d = new Date();
    var t = d.getTime();
    var order = t - 300;
    firebase
        .database()
        .ref("orders")
        .push({
            id: t + 1,
            order: order,
            userName: userName.value,
            userEmail: userEmail.value,
            payment: userSelect.value,
            date:
                d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
            hour: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            year: d.getFullYear(),
            products: JSON.parse(localStorage.getItem("cart")),
            total: total
        });
    swal.fire({
        position: "center",
        type: "success",
        title: "purchase made successfully!",
        text: `Your purchase order is: ${order}`,
        showConfirmButton: true,
        timer: 50000
    });
    clean();
});
function clean() {
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    total = 0;
    table.innerHTML = `
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    </tr>
    
    `;
    document.getElementById("btnBuy").style.display = "none";
    document.getElementById("btnClean").style.display = "none";
}

// Render
function render() {
    for (let index = 0; index < products.length; index++) {
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    table.innerHTML += `
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"> Total $${total}.00</th>  
    </tr>


    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
    <button id="btnClean" onclick="clean()" class="btn yellow darken-4">Clean Shopping Cart</button>
    </th>
    <th scope="col">
    <button id="btnBuy" href="#modal1"  class="modal-trigger waves-effect waves-light btn ">Buy</button> 
    </th>
    </tr> 
    `;
}
$(document).ready(function () {
    $(".modal").modal();
});
