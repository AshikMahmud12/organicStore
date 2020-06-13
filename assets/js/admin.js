function format(d) {
    return `
    
    <table>
<tr>
<td>Client:</td> 
<td>${d.userName}</td> 
</tr>

<tr>
<td>User Name:</td> 
<td>${d.userName}</td> 
</tr>


<tr>
<td>E-mail:</td> 
<td>${d.userEmail}</td> 
</tr>


<tr>
<td>Year:</td> 
<td>${d.year}</td> 
</tr>


<tr>
<td>Date:</td> 
<td>${d.date}</td> 
</tr>

<tr>
<td>Hour :</td> 
<td>${d.hour}</td> 
</tr>



<tr>
<td>Payment:</td> 
<td>${d.payment}</td> 
</tr>


<tr>
<td>Order:</td> 
<td>${d.order}</td> 
</tr>


<tr>
<td>Id:</td> 
<td>${d.id}</td> 
</tr>


<tr>
<td>Total:</td> 
<td>${d.total}</td> 
</tr>

<tr>
<td>Products:</td> 
<td>${d.products.map(function (product) {
        return `
 <ul>
 <li>Product:${product.name}</li>
 <li>Price:${product.price}</li>
 
 </ul>
 `;
    })}</td> 
</tr>

    </table>
    
    
    
    `;
}

$(document).ready(function () {
    setTimeout(function () {
        var table = $("#tableOrders").DataTable({
            data: final.data,
            select: "single",
            "columns": [
                {
                    "className": "details-control",
                    "orderable": true,
                    "data": null,
                    "defaultContent": "",
                    "render": function () {
                        return '<i class="fas fa-plus-square" area-hidden="true"></i> ';
                    },
                    width: "15px",
                },
                { "data": "id" },
                { "data": "order" },
                { "data": "date" },
                { "data": "userName" },
                { "data": "payment" },
                { "data": "total" },
            ],
            "order": [[1, "desc"]],
        });
        $("#tableOrders tbody").on("click", "td.details-control", function () {
            var tr = $(this).closest("tr");
            var tdi = tr.find("i.fa");
            var row = table.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tdi.first().removeClass("fa-minus-square");
                tdi.first().addClass("fa-plus-square");
            } else {
                row.child(format(row.data())).show();
                tr.addClass("shown");
                tdi.first().removeClass("fa-minus-square");
                tdi.first().addClass("fa-plus-square");
            }
        });
    }, 5000);
});

// firebase
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

// initialize firebase

//  firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var order = firebase.database().ref("orders");
order.on("child_added", function (data) {
    var orderValue = data.val();
    fsales(orderValue);
});
function fsales(params) {
    final.data.push(params);
}
var final = {
    data: [],
};
