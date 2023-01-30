import * as helper from "./helper.js";
import {data} from "./options.js";

const $headerList = document.querySelector(".header .navbar-container ul");
const $leftSidebar = document.querySelector(".main-left-sidebar ul");
const $mainContent = document.querySelector(".main-content .iframe-container");
const $rightSidebar = document.querySelector(".main-right-sidebar");

const genericMain = "An dieser Stelle wird der Main Content erscheinen";
$mainContent.innerHTML = genericMain;
const genericReferences = "An dieser Stelle werden die Referenzen gezeigt";
$rightSidebar.innerHTML = genericReferences;

//Möglicherweise obsolet (Nutzen von Speicherungen der Themen?)
const uebungen = [];

//Refresh, falls später mehrere Lifecycles notwendig werden
async function  refresh() {

    console.log(data);
    //Übungsbuttons der Hauptseite + Event-Listener für Aufruf der Unterbuttons
    try {
        await createHeader(data);
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Were done building the site");
    }
}

/**Header mit Buttons initialisieren */
async function createHeader(json) {
    if(json === null) throw new Error("JSON is null");
    for (let uebung in json) {
        let aufgaben = json[uebung];
        console.log(aufgaben);
        uebungen.push(uebung);
        console.log(uebungen);
        await createHeaderButtons($headerList, uebung, aufgaben);
    }
}

async function createHeaderButtons(domItem, uebung, aufgaben) {
    let $li = document.createElement("li");
    let $button = await helper.createButton(uebung);
    $li.append($button);
    domItem.append($li);
    console.log(uebung);

    //Haupt-Buttons, welche den Content der linken Sidebar verändern
    $button.addEventListener('click', (event) => {
        $leftSidebar.innerHTML = '';
        $mainContent.innerHTML = genericMain;
        $rightSidebar.innerHTML = genericReferences;
        createSidebar(aufgaben); 
    });
}

async function createSidebar(aufgabenJSON) {
    console.log(aufgabenJSON);
    for (const aufgabe in aufgabenJSON) {
        console.log(aufgabe);
        let $li = document.createElement("li");
        let $button = await helper.createButton(aufgabe);
        $li.append($button);
        $leftSidebar.append($li);
        //Sidebar Buttons Event listener, der den Content und Referenzen onclick verändert
        $button.addEventListener('click', (event) => {
            //Clear Main and references
            $mainContent.innerHTML = '';
            $rightSidebar.innerHTML = '';
            //Main-iframe:
            console.log($button.innerHTML);
            console.log(aufgabenJSON[aufgabe].path);
            console.log(aufgabenJSON[aufgabe].title);
            let $iframe = helper.createIFrame(aufgabenJSON[aufgabe].path, aufgabenJSON[aufgabe].title);
            $mainContent.append($iframe);
            //Beschreibungen:
            aufgabenJSON[aufgabe].description.forEach(description => {
                let $description = document.createElement("p");
                $description.innerHTML = description;
                $rightSidebar.append($description);
            });
        });
    }
}

refresh();



