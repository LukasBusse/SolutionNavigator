
//Refresh, falls später mehrere Lifecycles notwendig werden
const refresh = () => {
    /**Übungs-Buttons generieren: */
    getButtons('header', 10);
    getButtons('main', 3);
    
}

/**Übungs-Buttons generieren */
const getButtons = ( htmlclass, amount ) => {
    const navbar = document.querySelector( `${htmlclass} nav ul` );


    // Noch keine Möglichkeit die Anzahl der Übungen zu zählen, daher hardcode-Loop
    for (let i=0; i<amount; i++) {
        const $li = document.createElement('li');
        const $button = document.createElement('button');
        $button.classList='navbar-button';
        htmlclass ==='header' ? $button.innerHTML = `Übung ${i+1}` : $button.innerHTML = `Aufgabe ${i+1}`;
        $li.appendChild($button);
        navbar.appendChild($li);
    }
}

refresh();



