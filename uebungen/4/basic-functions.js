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
    return function(x) {
        return function(y) {
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

var Person = {
    name: this.name,
    toString: function() {
        return this.this.name;
    }
}
var Oli = {
    __proto__: Person,
    name: "Oli",
    auto: grünesAuto
}
var Peter = {
    __proto__: Person,
    name: "Peter",
    auto: grünesAuto
}

function conflict(auto) {
    var ret = false;
    if (!(Peter.auto === Oli.auto)) ret = true;
    return ret;
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
//**Nach ADGT: */

function topsort(newRelations) {
    var relations = newRelations;
    var entryElements = []  //Elemente mit Eingang = 0 - Q
    
    //Create entryElements:
    var arrLeft = []        //Parent-Elements
    var arrRight = []       //Child Elements
    var i, k;
    var ret = [];
    for(i = 0; i < relations.length; i++) {
        arrLeft.push(relations[i][0]);
        arrRight.push(relations[i][1]);
    }
    for(i = 0; i < arrLeft.length; i++) {
        var check = true;
        for(var p = 0; p < arrRight.length; p++) {
            if(arrLeft[i] === arrRight[p]) check = false;
        }
        if(check) entryElements.push(relations[i][0]);
    }
    //Einfügen der Elemente in Return und hilfs-array Right benutzen um Ordnung anzupassen
    while(entryElements.length !== 0) {
        ret.push(entryElements.shift());    //wähle aus Q, k+1, entferne v aus Q
        var element = entryElements[0];
        for (var i = 0; i < arrLeft.length; i++) {  //Funktioniert nur bei einem Indeg(w) = 1
            if(element === arrLeft[i]) entryElements.push(arrRight[i]);
        }
    }
    ret = [...new Set(ret)]; //Spread Operator + Set um unique Items zu erhalten, reihenfolge dank Algorithmus korrekt, aber geht von uniques aus
    return ret;
}
var relationen = [
    ["schlafen","studieren"],
    ["essen","studieren"],
    ["studieren","prüfen"],
    ["spaß-haben","prüfen"],
    ["spaß-haben","studieren"]];

console.log(topsort(relationen));