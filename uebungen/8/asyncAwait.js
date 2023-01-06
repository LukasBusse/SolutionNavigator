async function getText() {
    let A = await (await fetch("A.txt")).text();
    let B = await (await fetch("B.txt")).text();
    console.log(A);
    console.log(B);
    return [A,B];
}

getText();