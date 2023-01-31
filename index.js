import * as helper from "./helper.js";
import {data} from "./options.js";

const $headerList = document.querySelector(".header .navbar-container ul");
const $leftSidebar = document.querySelector(".main-left-sidebar ul");
const $mainContent = document.querySelector(".main-content .iframe-container");
const $rightSidebar = document.querySelector(".main-right-sidebar div");

const genericMain = "An dieser Stelle wird der Main Content erscheinen";
$mainContent.innerHTML = genericMain;
const genericDescription = "An dieser Stelle wird die Beschreibung stehen gezeigt";
$rightSidebar.innerHTML = genericDescription;

//Variable des aktiven Buttons des Headers
let $activeButton; 

//Refresh, falls später mehrere Lifecycles notwendig werden
async function  refresh() {

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
        await createHeaderButtons($headerList, uebung, aufgaben);
    }
}

async function createHeaderButtons(domItem, uebung, aufgaben) {
    let $li = document.createElement("li");
    let $button = await helper.createButton(uebung);
    $li.append($button);
    domItem.append($li);

    //Haupt-Buttons, welche den Content der linken Sidebar verändern
    $button.addEventListener('click', (event) => {
        $leftSidebar.innerHTML = '';
        $mainContent.innerHTML = genericMain;
        $rightSidebar.innerHTML = genericDescription;
        helper.colorButton($activeButton, $button);
        $activeButton = $button;
        createSidebar(aufgaben); 
    });
}

async function createSidebar(aufgabenJSON) {
    for (const aufgabe in aufgabenJSON) {
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



