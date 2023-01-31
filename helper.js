/**
 * Modul für Helfer-Funktionen
 *  
 */

export function createIFrame(path, title) {
    let $iframe = document.createElement("iframe");
    $iframe.setAttribute("src", path);
    $iframe.setAttribute("title", title);
    $iframe.setAttribute("class", "responsive-iframe");
    return $iframe;
}

export async function createButton(name) {
    let $button = document.createElement("button");
    $button.textContent = name;
    return $button;
}

export function colorButton(prevButton = null, newButton, theme) {
    if (prevButton !== null) {
        prevButton.style.removeProperty("background-color");
        prevButton.style.removeProperty("opacity");
    }
    theme === "light" ? newButton.style.backgroundColor = "#5C3C17" : newButton.style.backgroundColor = "#56445D";
    newButton.style.opacity = 0.9;
}

//Swapped Themes zwischen light und dark mode + löscht individuelle 
export function themeSwap($body, theme, currentActiveButton) {
    currentActiveButton.style.removeProperty("background-color");
    currentActiveButton.style.removeProperty("opacity");
    if (theme === "light") {
        $body.style.setProperty("--base-background-color", "#197278");
        $body.style.setProperty("--base-button-background", "#49DCB1");
        $body.style.setProperty("--button-hover-background", "#56445D");
        $body.style.setProperty("--button-active-background", "#56445D");
        return "dark";
    }
    if (theme === "dark") {
        $body.style.setProperty("--base-background-color", "#E2C391");
        $body.style.setProperty("--base-button-background", "#F6E27F");
        $body.style.setProperty("--button-hover-background", "#5C3C17");
        $body.style.setProperty("--button-active-background", "#5C3C17");
        return "light";
    }

}