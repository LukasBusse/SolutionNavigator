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
    console.log("TopSort:");
    var eingaenge = {}; //Objekt mit Anzahl der Eingaengen der Knoten
    var relations = newRelations;   
    var entry = []; //Elemente mit Eingang = 0;
    var i;
    var ret = [];
    console.log(relations);
    //Erstellung des Eingang-Objektes:
    //1. Zuweisung der linken Element der Relation auf 0 zunächst.
    //2. Zuweisung auf 1 für noch nicht vorhandene Elemente, welche nur rechts standen
    //3. Inkrementierung für jedes Element um 1, welches Rechts steht
    for(i = 0; i < relations.length; i++) {
        eingaenge[relations[i][0]] = 0;
    }
    for(i = 0; i < relations.length; i++) { 
        if(isNaN(eingaenge[relations[i][1]])) {
            eingaenge[relations[i][1]] = 1;
        } else {
            eingaenge[relations[i][1]]++;
        } 
    }
    //Einfügen der Elemente mit Value: 0
    for (const [key, value] of Object.entries(eingaenge)){
        if (value === 0) entry.push(key);
    }
    //Eingangs-Elemente von links nach rechts ab-arbeiten
    //Falls geschobenes Element relation zu anderem hatte: Dekrementiere dieses
    //Falls dieses Element dadurch auf 0 sinkt: Packe Es in die Eingangs-Liste
    while (entry.length !== 0) {
        var element = entry.shift();
        ret.push(element);
        for (i = 0; i < relations.length; i++) {
            if(relations[i][0] === element && eingaenge[relations[i][1]] !== 0) {
                eingaenge[relations[i][1]]--;
                if(eingaenge[relations[i][1]] === 0) entry.push(relations[i][1]);
            }
        }
    }
    return ret;
}
var relationen = [
    ["schlafen","studieren"],
    ["essen","studieren"],
    ["studieren","prüfen"],
    ["spaß-haben","prüfen"],
    ["spaß-haben","studieren"]];

console.log(topsort(relationen));