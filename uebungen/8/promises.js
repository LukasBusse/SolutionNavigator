/**Fetch Text A und B, Split bei \n|\r und entferne extra leerzeichen gleichzeitig */
//Die Ergebnisse werden synchron konkateniert und auf der Konsole ausgegeben
//Lösung mit Promise.all:
Promise.all([
    fetch('A.txt').then(x => x.text()).then(a => a.split(/\n|\r/)).then(a => a.map(string => string.replace("  ", ""))),
    fetch('B.txt').then(x => x.text()).then(b => b.split(/\n|\r/)).then(a => a.map(string => string.replace("  ", "")))
  ]).then(([sentencesA, sentencesB]) => {
    let final =  [sentencesA, sentencesB].reduce((a,b) => a.map((v,i) => v  + b[i]));
    final = final.join("");
    console.log(final);
  });

