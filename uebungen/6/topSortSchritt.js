import {VorrangIterator, VorrangGenerator} from "./ecmascript-functions.js"

const items= [];
    let count = 0;
    const testItems = 
        [["schlafen","studieren"],
        ["essen","studieren"],
        ["studieren","prüfen"],
        ["spaß-haben","prüfen"],
        ["spaß-haben","studieren"]];

    const liste = document.getElementById("relations-liste");
    const inputButton = document.getElementById("input-button");
    inputButton.addEventListener('click', event => {
        //erstelle neues Relations-Item
        const neueRelation = [];
        neueRelation[0] = document.getElementById("links").value;
        neueRelation[1] = document.getElementById("rechts").value;
        items[count] = neueRelation;
        count++;

        //erstelle neues ListItem + Inhalt: Relation
        const listItem = document.createElement("li");
        listItem.innerHTML = `${neueRelation[0]} - ${neueRelation[1]}`;
        liste.appendChild(listItem);

    });

    const sortButton = document.getElementById("sort-button");
    const ergebnisListeIterator = document.getElementById("ergebnis-liste-iterator");
    const ergebnisListeGenerator = document.getElementById("ergebnis-liste-generator");

    sortButton.addEventListener('click', event => {

        const topIterator = new VorrangIterator(items);
        for (let item of topIterator) {
            let $p = document.createElement("li");
            $p.innerHTML = item;
            ergebnisListeIterator.appendChild($p);
        }
        const topGenerator = new VorrangGenerator(items);
        for (let item of topGenerator) {
            let $p = document.createElement("li");
            $p.innerHTML = item;
            ergebnisListeGenerator.appendChild($p);
        }
        let sortierung;
        sortierung = (items);
        ergebnisFeld.innerHTML = sortierung;
        console.log(sortierung);
    });