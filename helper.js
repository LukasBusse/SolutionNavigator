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
    $button.innerHTML = name;
    return $button;
}
