/** Aufgabe 1 */
function identity(x) {
    return x;
}
function identity_function(x) {
    return function(x) {
        return x;
    }
}
function add(x,y) {
    return x+y;
}
console.log("add(5,5):")
console.log(add(5,5));
function mul(x,y) {
    return x*y;
}
console.log("mul(5,6):")
console.log(mul(5,6));
function addf(x) {
    return function(y) {
        return x+y;
    }
}

console.log("addf(5)(5):")
console.log(addf(5)(5))

function applyf(f) {
    return function(x = "x") {
        return function(y = "y") {
            return f(x,y);
        }
    }
}
let addfn = applyf(add);
//console.log("addf(x)(y):")
//console.log(addfn(x)(y));
console.log("applyf(mul)(5)(6):")
console.log(applyf(mul)(5)(6));


/** Aufgabe 2 */

/* Person(name, vorname, autos) {
    this.name = name;
    this.vorname = vorname;
    this.autos = autos;
}*/

var Auto = {
    farbe: this.farbe,
    toString: function() {
        return this.farbe;
    }
};
var grünesAuto = {
    __proto__: Auto,
    farbe: 'Grün'
};

console.log(grünesAuto);

//const myAuto = new Auto("grün", "bmw");
//const mySelf = new Person("Lukas", "Busse", [myAuto]);
//const notMe = new Person("Peter","Zwegat",[myAuto]);

function conflict(auto) {

}

//** Was zur Hölle soll ich hier tun */
    

/** Aufgabe 3 */
function fibo() {
    var fibos = [];
    var max_safe_integer_fibo, max_value_fibo;
    var executed_max = false;
    var executed_safe = false;
    
    for(var i=0; i<2000; i++) {
        if (i === 0 ) fibos[i] = 0;
        if (i === 1 ) fibos[i] = 1;
        if (i>1) fibos[i] = fibos[i-2] + fibos[i-1];
        if(fibos[i]>Number.MAX_SAFE_INTEGER && !executed_safe) {
            max_safe_integer_fibo = fibos[i-1];
            executed_safe = true;
        }
        if(fibos[i]>Number.MAX_VALUE && !executed_max) {
            max_value_fibo = fibos[i-1];
            executed_max = true;
        }
        console.log(fibos[i]);
    }
    console.log("Größte Fibonacci-Zahl kleiner als Number.MAX_SAFE_INTEGER:");
    console.log(max_safe_integer_fibo);
    console.log("Größte Fibonacci-Zahl kleiner als Number.MAX_VALUE:");
    console.log(max_value_fibo);
}
fibo();
function fiboBigInt() {
    var fibos = [];
    var max = 600000;
    for(var i=0; i<max; i++) {
        if (i === 0 ) fibos[i] = 0;
        if (i === 1 ) fibos[i] = 1;
        if (i>1){
            fibos[i] = BigInt(fibos[i-2]) + BigInt(fibos[i-1]);
        }
        if (i === max-1) console.log(fibos[i]);
    } 
}
//fiboBigInt();
console.log("BigInt ist scary groß und die berechnung hat zu viel Ressourcen gefressen, deshalb gebe ich auf den maximalen Wert zu finden");

/** Aufgabe 4 */

function topsort() {

    

}