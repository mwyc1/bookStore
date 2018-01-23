 // this block of code is list of product (array). 
var books = [
    ["./img/libro1.jpg", "El secreto de Ile-De Sien", 16.70],
    ["./img/libro2.jpg", "La habitacion en llamas", 21.80],
    ["./img/libro3.jpg", "El extrano verano de Tom Harvey", 20.00],
    ["./img/libro4.jpg", "Patria", 15.90],
    ["./img/libro5.jpg", "Calcetines Rotos", 16.00],
    ["./img/libro6.jpg", "Los Ritos del Agua", 21.80],
    ["./img/libro7.jpg", "Cinco dias de Octubre", 15.90],
    ["./img/libro8.jpg", "Ocho dias de marzo", 15.90],
    ["./img/libro9.png", "The Alleyman", 27.00],
    ["./img/libro10.png", "Be Frank With Me", 11.90]
    ];


var counter = 1;
var shoppingCart = [];


// this block of code is used for the display on the secreen & putting it into the rows. 

function showProducts() {
    var container = document.getElementById("bookContainer");
    var output = "";
    /*
    var image = document.getElementById("bookContainer").getElementsByTagName("img");
    var title = document.getElementById("bookContainer").getElementsByTagName("h3");
    var price = document.getElementById("bookContainer").getElementsByTagName("h4");
    */

    for (var i = 0; i < books.length; i++) {

        if (i == 0) {
            output += "<div class='row'>";
        } else if (i % 4 == 0) {
            output += "</div> <div class='row'>";
        }

        /*title[i].innerHTML = "<b><u>Title </u> : </b>" + books[i][1];*/
        output += "<div class='col-xs-12 col-sm-6 col-md-3 col-lg-3 product'><img class='img-rounded' src='" +
            books[i][0] + "' alt='books'><h3 class='text-primary text-center'>" +
            books[i][1] + "</h3><h4>Price : " +
            parseFloat(books[i][2]).toFixed(2) +
            " &#x20AC </h4><button id='bookid-" + i + "' class='btn btn-primary btn-default buyBtn' onclick='buy(" + i + ")'>Buy</button></div>";
    }

    if (i != 0) {
        output += "</div>";
    }

    container.innerHTML = output;

}




// this block of code is used for the billing process.

//firts Table for the products.

function tableHead() {

    var htmlTable = document.getElementById("tableProduct");
    var header = htmlTable.createTHead();

    var x1 = document.createElement("TH");
    var t1 = document.createTextNode("#");
    x1.appendChild(t1);

    var x2 = document.createElement("TH");
    var t2 = document.createTextNode("Product");
    x2.appendChild(t2);

    var x3 = document.createElement("TH");
    var t3 = document.createTextNode("Price");
    x3.appendChild(t3);

    var x4 = document.createElement("TH");
    var t4 = document.createTextNode("Quantity");
    x4.appendChild(t4);

    var x5 = document.createElement("TH");

    header.appendChild(x1);
    header.appendChild(x2);
    header.appendChild(x3);
    header.appendChild(x4);
    header.appendChild(x5);


    /* var htmlTable = document.getElementById("tableProduct");
     var header = htmlTable.createTHead();
     var row = header.insertRow(0);
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     cell1.innerHTML = "<b>#</b>";
     cell2.innerHTML = "<b>Product</b>";
     cell3.innerHTML = "<b>Price</b>";*/
}

/*function addCart(index) {
    var book = books[index];
    //Si encuentra el libro, deja de ejecutar la funcion, "return". Si no lo encuentra, lo mete dentro de la array "shoppingCart" y luego llama a la función que actualiza el carrito de compras. 
    if (shoppingCart.indexOf(book) != -1) {
        createAlert("warning", "¡You have already added this book to your shopping cart! \n You can change the quantity at the bottom of the page.");
        return; 
    }
    book.push(1);
    shoppingCart.push(book);
    buy();
}*/



function buy(index1) {
    var htmlTable = document.getElementById("tableProduct");
    document.getElementById('bookid-' + index1).disabled = true;

    var row = htmlTable.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = counter;
    cell2.innerHTML = books[index1][1];
    cell3.innerHTML = parseFloat(books[index1][2]).toFixed(2) + " &#x20AC";
    cell4.innerHTML = "<input type='number' onChange='updateQuantity(this.value," + index1 + ")' value='1' min='1'></input>";
    cell5.innerHTML = "<button onClick='removeBook(" + index1 + ")'>Remove</button>";

    counter++;
    shoppingCart.push([index1, 1]);
    updateCart();
}


function removeBook(bookIndex) {
    document.getElementById('bookid-' + bookIndex).disabled = false;
    console.log("removeBook");
    var cart = findIndex(bookIndex);
    shoppingCart.splice(cart, 1);
    refreshTable();
}

function findIndex(bookIndex) {
    for (var i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i][0] === bookIndex) {
            return i;
        }
    }
}

function updateQuantity(value, index) {

    var input = document.getElementsByTagName("input");

    for(var i = 0; i < input.length; i++) {
        if (input[i].value == "" || input[i].value == null) {
        input[i].style.border = '1px solid red';
    } 
    else {
        shoppingCart[findIndex(index)][1] = parseInt(value);
        updateCart();
        input[i].style.border = "1px solid #cdcdcd";
    }
    }
    
}


function refreshTable() {
    counter = 1;
    var htmlTbody = document.getElementById("tableProduct");
    htmlTbody.innerHTML = "";
    tableHead();

    for (var i = 0; i < shoppingCart.length; i++) {
        var index2 = shoppingCart[i][0];
        var quantity = shoppingCart[i][1];
        var row = htmlTbody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = counter;
        cell2.innerHTML = books[index2][1];
        cell3.innerHTML = parseFloat(books[index2][2]).toFixed(2) + " &#x20AC";
        cell4.innerHTML = "<input type='number' onChange='updateQuantity(this.value," + index2 + ")' value='" + quantity + "' min='1'></input>";
        cell5.innerHTML = "<button onClick='removeBook(" + index2 + ")'>Remove</button>";

        counter++;
    }
    updateCart();
}

function totalCart() {
    var totalSum = 0;
    for (i = 0; i < shoppingCart.length; i++) {
        totalSum += (books[shoppingCart[i][0]][2] * shoppingCart[i][1]);
    }
    document.getElementById("total_purchase").innerHTML = totalSum.toFixed(2) + " €";
    return totalSum;
}

//Hace visible en pantalla el descuento que se aplicará al total, en funcion de la cantidad de libros. 
function discount(price) {
    var finalDiscount = 0;
    var discountPercent = 0;
    var bookQuantity = 0;
    for (i = 0; i < shoppingCart.length; i++) {
        bookQuantity += shoppingCart[i][1];
    }
    if (bookQuantity >= 7) {
        discountPercent = 10;
        finalDiscount = (price * discountPercent) / 100;
    } else if (bookQuantity >= 5) {
        discountPercent = 7.5;
        finalDiscount = (price * discountPercent) / 100;
    } else if (bookQuantity >= 3) {
        discountPercent = 5;
        finalDiscount = (price * discountPercent) / 100;
    } else {
        finalDiscount = 0;
    }

    document.getElementById("discount_purchase").innerHTML = finalDiscount.toFixed(2) + " € (" + discountPercent + "%)";
    return finalDiscount;

}

function updateCart() {
    var total = totalCart();
    var priceDiscount = discount(total);
    var IVA = totalIVA(total - priceDiscount);
    var superTotal = total - priceDiscount + IVA;
    document.getElementById("super_total").innerHTML = superTotal.toFixed(2) + " €";
}

//Hace visible el IVA que se aplicará. 
function totalIVA(price) {
    var IVA = (price * 21) / 100;
    document.getElementById("iva_purchase").innerHTML = IVA.toFixed(2) + " € (21%)";
    return IVA;
}

showProducts();
tableHead();
