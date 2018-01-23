// Empty JS for your own code to be here

var libros = [["img/libro1.jpg", "Calcetines rotos", 16.7],
["img/libro2.jpg", "Patria", 15.9],
["img/libro3.jpg", "Los ritos del agua", 21.8],
["img/libro4.jpg", "El extraño verano de Tom Harvey", 20.0],
["img/libro5.jpg", "La habitacion en llamas", 21.8],
["img/libro6.jpg", "El secreto de Eli", 16.7],
["img/libro7.jpg", "Ocho días de marzo", 15.9],
["img/libro8.jpg", "Cinco dias de octubre", 15.9],
["img/libro9.jpg", "La millor historia del mon", 16.8],
["img/libro10.jpg", "Deu relats ecofuturistes", 15.0]];
//var libros = [];
//libros[0] = ["img/libro1.jpg", "Calcetines rotos", 16.7];
//libros[1] = ["img/libro2.jpg", "Patria", 15.9];
//libros[2] = ["img/libro3.jpg", "Los ritos del agua", 21.8];
//libros[3] = ["img/libro4.jpg", "El extraño verano de Tom Harvey", 20.0];
//libros[4] = ["img/libro5.jpg", "La habitacion en llamas", 21.8];
//libros[5] = ["img/libro6.jpg", "El secreto de Eli", 16.7];
//libros[6] = ["img/libro7.jpg", "Ocho días de marzo", 15.9];
//libros[7] = ["img/libro8.jpg", "Cinco dias de octubre", 15.9];

 var llista_preus = [];
//accedeix a les posicions 0 i dins del 0, la posicio 1, en aqest cas "calcetines rotos"
//console.log(libros[0][1]);

var div = document.getElementById("contenedor_libros");
//    titulos=div.getElementsByTagName("h3");
//    img=div.getElementsByTagName("img");
//    preu=getElementsByTagName("p");

var salida = "";



for (var i = 0; i < libros.length; i++) {
    //titulos[i].innerHTML = "<b><u>Título:</u></b> " + libros[i][1];


    if (i == 0) {
        salida +=
            "<div class='row'>";
    } else if (i % 4 == 0) {
        salida +=
            "</div><div class='row'>";
    }

    salida +=
        "<div class='col-md-3 col-xs-6 col-sm-4 producto'><img alt='titulo-libro' src='" +
        libros[i][0] +
        "'><h4 class='text-primary text-center'> " +
        libros[i][1] +
        "</h4><p>" +
        libros[i][2] +
        " €</p><button type='button' class='btn btn-primary' onclick='comprar(this)' id='button-" + i + "'>Comprar</button></div>";
}
if (i != 0) {
    salida += "</div>";
    //    por si no hubiera ningun libro
}
div.innerHTML = salida;

var counter = 1;



function comprar(boton) {

    var posicion = boton.id;
    //    console.log(posicion);
    var res = posicion.split("button-"),numero = res[1];
    console.log(numero);

//    desabilitar boto de compra un cop el clico
    document.getElementById(boton.id).setAttribute("disabled","disabled");
    
    
    
    document.getElementById("nou_llibre").innerHTML +=
        "<tr id='"+ numero + 
        "'><td>" +
        counter++ +
        "</td><td>" +
        libros[numero][1] +
        "</td><td>" +
        libros[numero][2] +
        "</td><td><input type='number' name='quantity' min='1' max='100' id='quantity' value='1'></input></td><td><button type='button' class='btn btn-primary' onclick='remove(this)'id='"+ i + 
        "'>X</button></tr>";

    actualizatodo(numero);

}
var quantity = document.getElementById('textbox_id')[i].value;
consol.log(quantity);

function remove(button){    
    
    var td = button.parentElement;
    var tr = td.parentElement;
    var tabla = tr.parentElement;
    tabla.removeChild(tr);
    
    
       
}

function actualizatodo(numero) {
   
    llista_preus.push(libros[numero][2]);
//    console.log(llista_preus);
    var suma = 0;
    
// console.log(numero);   
//console.log(llista_preus);
    for (numero = 0; numero < llista_preus.length; numero++){

        suma += llista_preus[numero];
       
    }
    console.log("cantidad llibres en el carro" + llista_preus.length);
    document.getElementById("subtotal").innerHTML=suma+"€";

console.log("holaaaaa"+llista_preus.length);
var discount, discount_percent;
if (llista_preus.length>=3 && llista_preus.length<5 ){
    discount_percent=" (5%) ";
    discount=parseFloat((parseFloat(suma).toFixed(2)*5)/100).toFixed(2);
}else if (llista_preus.length>=5 && llista_preus.length<7 ){
    discount_percent=" (7,5%) ";
    discount=parseFloat((parseFloat(suma).toFixed(2)*7.5)/100).toFixed(2);
}else if (llista_preus.length>=7 ){
    discount_percent=" (10%) ";
    discount=parseFloat((parseFloat(suma).toFixed(2)*10)/100).toFixed(2);
}else{
//if lenght<3
    discount_percent=" (0%) ";
    discount=0.00;
}

    

var iva_subt = suma;
    var iva_desc = discount;
    var import_brut= iva_subt-iva_desc;
    var import_net= (import_brut*21)/100;
    var total=import_brut+import_net;

    document.getElementById("descuento").innerHTML = discount +"€"+ discount_percent;
console.log("descuento aplicado"+ discount_percent);
    document.getElementById("iva").innerHTML=parseFloat(import_net).toFixed(2)+"€";
    document.getElementById("total").innerHTML=parseFloat(total).toFixed(2)+"€";
     console.log( "import_net "+import_net);
}
