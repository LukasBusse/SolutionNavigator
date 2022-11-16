
//Refresh, falls später mehrere Lifecycles notwendig werden
const refresh = () => {
    /**Übungs-Buttons generieren: */
    getUebungenButtons();
}

/**Übungs-Buttons generieren */
const getUebungenButtons = () => {
    const navbar = document.querySelector( "header nav ul" );
    // Noch keine Möglichkeit die Anzahl der Übungen zu zählen, daher hardcore-Loop
    for (let i=0; i<10; i++) {
        const $li = document.createElement('li');
        $li.innerHTML = `<button class='navbar-button'>Übung ${i+1}</button>`
        navbar.appendChild($li);
    }
}

refresh();



