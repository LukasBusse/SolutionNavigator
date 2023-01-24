async function getData() {
    let data;
    try {
        data = await (await fetch("data.json")).json();
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Were done fetching data.json");
    }
    console.log(data);

    //Möglich alles in einen try-catch zu packen, aber erschwert error handling

    try {
        await buildSite(data);
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Were done building the site");
    }
}

async function buildSite(inputJson) {
    if(inputJson === null) throw new Error("Json is null");
    for (let keyCategory in inputJson) {
        let value = inputJson[keyCategory];
        console.log(value);
        topics.push(keyCategory);
        console.log(topics);
        await createHeaderButtons($headerList, keyCategory, value);
    }
}

async function createHeaderButtons(domItem, innerHTMLData, value) {
    let $li = document.createElement("li");
    let $button = document.createElement("button");
    $button.innerHTML = innerHTMLData;
    $li.append($button);
    domItem.append($li);
    console.log(innerHTMLData);

    //Haupt-Buttons, welche den Content der linken Sidebar verändern
    $button.addEventListener('click', (event) => {
        $leftSidebar.innerHTML = '';
        $mainContent.innerHTML = genericMain;
        $rightSidebar.innerHTML = genericReferences;
        createSidebarButtons(value); 
    });
}

async function createSidebarButtons(value) {
    for (let keyCategory in value) {
        let $liSidebar = document.createElement("li");
        let $buttonSidebar = document.createElement("button");
        $buttonSidebar.innerHTML = keyCategory;
        $liSidebar.append($buttonSidebar);
        $leftSidebar.append($liSidebar);
        console.log(value);
        //Sidebar Buttons, die den Content und Referenzen onclick veerändern
        $buttonSidebar.addEventListener('click', (event) => {
            $mainContent.innerHTML = '';
            $rightSidebar.innerHTML = '';
            //Main Content:
            console.log($buttonSidebar.innerHTML);
            let $content = document.createElement("p");
            $content.innerHTML = value[$buttonSidebar.innerHTML].content;
            $mainContent.append($content);
            //Referenzen:
            value[$buttonSidebar.innerHTML].references.forEach(element => {
                let $nreferences = document.createElement("a");
                $nreferences.setAttribute("href", element);
                $nreferences.innerHTML = element;
                $rightSidebar.append($nreferences);
            });
        });
    }
}

function insertMainContent() {}

//DOM basics
const $headerList = document.querySelector(".header .navbar-container ul");
const $leftSidebar = document.querySelector(".main-left-sidebar ul");
const $mainContent = document.querySelector(".main-content");
const $rightSidebar = document.querySelector(".main-right-sidebar");

const genericMain = "An dieser Stelle wird der Main Content erscheinen";
$mainContent.innerHTML = genericMain;
const genericReferences = "An dieser Stelle werden die Referenzen gezeigt";
$rightSidebar.innerHTML = genericReferences;

let topics = [];
let subtopic = [];
let content = "";
let references = "";
getData();