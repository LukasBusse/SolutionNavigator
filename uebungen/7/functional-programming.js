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
    }
} // Arrow Notation Funktioniert nicht??? But why
Number.prototype.add = methodize(add);
console.log((3).add(4));
//**demethodize: */
const demethodize = (f) => {
    return (x,y) => {
        return x
    }
}
console.log(demethodize(Number.prototype.add)(5,6));
console.assert(11 === demethodize(Number.prototype.add)(5,6));
//**twice:  */
const twice = (f) => {
    return function (x) {
        return f(x,x);
    }
}

