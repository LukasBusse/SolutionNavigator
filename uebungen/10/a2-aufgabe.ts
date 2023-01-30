const add = (x: any ,y: any): number => <number>x+<number>y;
const equals = (x: number ,y: number): boolean => x===y;

console.log( add(1,2) );
console.log( add(true, true ) );
console.log( add(true, false ) );
let x:number = 1;
let y:number = 1;
console.log( add(equals(x,y), equals(y,x)) );