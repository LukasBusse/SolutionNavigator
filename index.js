import * as helper from "./helper.js";
import {data} from "./options.js";

const $headerList = document.querySelector(".header .navbar-container ul");
const $themeButton = document.getElementById("theme-button");
const $leftSidebar = document.querySelector(".main-left-sidebar ul");
const $mainContent = document.querySelector(".main-content .iframe-container");
const $rightSidebar = document.querySelector(".main-right-sidebar div");

const genericMain = "An dieser Stelle wird der Main Content erscheinen.";
$mainContent.innerHTML = genericMain;
const genericDescription = "An dieser Stelle wird die Beschreibung erscheinen.";
$rightSidebar.innerHTML = genericDescription;

//Variable des aktiven Buttons des Headers
let $activeButton;

//Current Theme & Theme-Objekt: 
let currentTheme = "light";

let themes = {
    "dark": {
        "--base-background-color": "#197278",
        "--base-button-background": "#49DCB1",
        "--button-hover-background": "#56445D",
        "--button-active-background": "#56445D"
    },
    "light": {
        "--base-background-color": "#E2C391",
        "--base-button-background": "#F6E27F",
        "--button-hover-background": "#5C3C17",
        "--button-active-background": "#5C3C17"
    }
}

//Refresh, falls später mehrere Lifecycles notwendig werden
async function  refresh() {

    //Übungsbuttons der Hauptseite + Event-Listener für Aufruf der Unterbuttons
    try {
        await createHeader(data);
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Were done building the Header");
    }
}

/**Header mit Buttons initialisieren */
async function createHeader(json) {
    if(json === null) throw new Error("JSON is null");
    for (let uebung in json) {
        let aufgaben = json[uebung];
        await createHeaderButtons($headerList, uebung, aufgaben);
    }
    $themeButton.addEventListener('click', event => {
        currentTheme = helper.themeSwap(document.querySelector("body").style, currentTheme, themes, $activeButton);
    });
}

async function createHeaderButtons(domItem, uebung, aufgaben) {
    let $li = document.createElement("li");
    let $button = await helper.createButton(uebung);
    $li.append($button);
    domItem.append($li);

    //Haupt-Buttons, welche den Content der linken Sidebar verändern
    $button.addEventListener('click', (event) => {
        $leftSidebar.innerHTML = '';
        $mainContent.textContent = genericMain;
        $rightSidebar.textContent = genericDescription;
        helper.colorButton($activeButton, $button, currentTheme);
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



