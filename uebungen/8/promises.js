function getText() {
    let A, B;
    fetch("A.txt").then(response => response.text())
        .then(data => {
            A = data;
        });
    fetch("B.txt").then(response => response.text())
        .then(data => {
            B = data;
        });
    console.log(A);
    console.log(B);
}

getText();