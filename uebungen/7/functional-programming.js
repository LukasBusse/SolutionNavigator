/**Identity Function */
const identity_function = (identity) => {return identity}
console.assert("x" === identity_function("x"));
console.log("Identiy-function: ");
console.log("identity_function('x') = " + identity_function("x"));

/**3f: */ 
const addf = (x) => {return (y) => {return x+y}}
console.assert(3 === addf(1)(2));
console.assert(2 === addf(1)(1));
console.assert(0 === addf(0)(0));
console.log("Addf:");
console.log("addf(1)(2) = " + addf(1)(2));

//**applyf: */
const applyf = (f) => {
    return (x) => {
        return (y) => {
            return f(x,y);
        }
    }
}
const add = (x,y) => {return x + y}
const addf2 = applyf(add);
console.assert(3 === addf2(1)(2));
console.log("applyf:");
console.log("applyf(add) = " + applyf(add));
console.log("addf(1)(1) = " + addf2(1)(1));

//**curry-function: */
const curry = (f,x) => {
    return (y) => {
        return f(x,y);
    }
}
const add3 = curry(add,3);
console.assert(7 === add3(4));
console.log("curry:");
console.log("curry(add,3) = " + curry(add,3));
console.log("add3(5) = " + add3(5));

//**inc-function: */
const inc1 = (x) => {
    return addf(x)(1);
}
const inc2 = (x) => {
    return applyf((a,b) => {return a+b})(x)(1);
}
const inc3 = (x) => {
    return curry(add,1)(x);
}
console.assert(1 === inc1(0));
console.assert(1 === inc2(0));
console.assert(1 === inc3(0));
console.log("inc:");
console.log("inc1(1) = " + inc1(1));
console.log("inc2(2) = " + inc2(2));
console.log("inc3(3) = " + inc3(3));
//**methodize: */
const methodize = (f) => {
    return function(y) {
        return f(this,y);
    };
} // Arrow Notation Funktioniert nicht??? But why
Number.prototype.add = methodize(add);
console.log((3).add(4));

//**demethodize: */
const demethodize = (f) => {
    return (x,y) => {
        return x;
    };
}
console.log(demethodize(Number.prototype.add)(5,6));
console.assert(11 === demethodize(Number.prototype.add)(5,6));

//**twice:  */
const twice = (f) => {
    return function (x) {
        return f(x,x);
    };
}

//**composeu: */
const composeu = (f1, f2) => {
    return (x) => {
        return f2(f2(x));
    }
}

//**composeb: */
const composeb = (f1, f2) => {
    return (x,y,z) => {
        return f2(f1(x,y),z);
    }
}

//**once */
const once = (f) => {
    let count = 0;
    return (x,y) => {
        if(count === 0) {
            ++count;
            return f(x,y);
        } else {
            return console.error("Funktion bereits einmal ausgeführt!");
        }
    }
}
const mul = (x,y) => {return x*y;};
let add_once = once(add);
console.assert(7 === add_once(3,4));
let mul_once = once(mul);
console.assert(1 === mul_once(1,1));

//**Counterf:  */
const counterf = (x) => {
    let count = x;
    return {
        inc: function() {
        return ++count;
        },
        dec: function() {
        return --count;
        }
    }
} 
let count10 = counterf(10);
console.assert(11 === count10.inc());
console.assert(10 === count10.dec());

//**revocable: */
const revocable = (f) => {
    let stop = 0;
    return {
        invoke: function(x) {
            return stop === 0 ? f(x) : console.error("Funktion zurückgenommen");
        },
        revoke: function() {
            stop = 1;
        }
    }
}
temp = revocable(alert);
temp.invoke(7);
temp.revoke();
temp.invoke(7);

//**Array-Wrapper: */
const vector = () => {
   var innerVector = (function () {
    let vector = [];
    return {
        append: function(x) {
            vector.push(x);
        },
        store: function(x,y) {
            vector[x] = y;
        },
        get: function(x) {
            return vector[x];
        }
    }
   }());
   return {
    append: function(x) {
        innerVector.append(x);   
    },
    store: function(x,y) {
        innerVector.store(x,y);
    },
    get: function(x) {
        return innerVector.get(x);
    }
   } 
}
const my_vector = vector();
my_vector.append(7);
my_vector.store(1,8);
console.assert(7 === my_vector.get(0), my_vector.get(0));
console.assert(8 === my_vector.get(1), my_vector.get(1));
