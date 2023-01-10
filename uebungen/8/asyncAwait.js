/**Fetch Text A und B, Split bei \n|\r und entferne extra leerzeichen gleichzeitig */
//Die Ergebnisse werden synchron konkateniert und auf der Konsole ausgegeben
//Lösung mit Async/Await:

async function getText() {
    let responseA = await (await fetch("A.txt")).text();
    let responseB = await (await fetch("B.txt")).text();

    let sentencesA = await splitAndMap(responseA);
    let sentencesB = await splitAndMap(responseB);

    //Synchrone bearbeitung der Konkatenation
    let final = [sentencesA, sentencesB].reduce((a,b) => a.map((v,i) => v  + b[i]));
    final = final.join("");
    console.log(final);
    return final;
}

//Zusätzliche Funktion zum asynchronen splitting und mapping des response-strings
async function splitAndMap(response) {
    return await response.split(/\n|\r/).map(string => string.replace("  ", ""));
}

getText();