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

//Färbt aktiven Button nach Styling und löscht styling des vorherigen Buttons
export function colorButton(prevButton = null, newButton, theme) {
    if (prevButton !== null) {
        prevButton.style.removeProperty("background-color");
        prevButton.style.removeProperty("opacity");
    }
    theme === "light" ? newButton.style.backgroundColor = "#5C3C17" : newButton.style.backgroundColor = "#56445D";
    newButton.style.opacity = 0.9;
}

//Swapped Themes zwischen light und dark mode + löscht activen Button styling
export function themeSwap($bodyStyle, currentTheme, themes,currentActiveButtonStyle) {
    if (currentActiveButtonStyle !== undefined) {
        currentActiveButtonStyle.removeProperty("background-color");
        currentActiveButtonStyle.removeProperty("opacity");
    } 

    let newTheme, ret;

    if(currentTheme ==="light") {
        newTheme = themes["dark"];
        ret = "dark";
    }
    if(currentTheme ==="dark") {
        newTheme = themes["light"];
        ret = "light";
    }
    for (const [key, value] of Object.entries(newTheme)) {
        $bodyStyle.setProperty(key, value);
    }

    return ret;
}