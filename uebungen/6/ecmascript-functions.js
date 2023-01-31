const topSortSchritt = (ret, entry, eingaenge, relations) => {
    let element = entry.shift();
    ret.push(element);
    for (i = 0; i < relations.length; i++) {
        if(relations[i][0] === element && eingaenge[relations[i][1]] !== 0) {
            eingaenge[relations[i][1]]--;
            if(eingaenge[relations[i][1]] === 0) entry.push(relations[i][1]);
        }
    }
    return {ret, entry, eingaenge};
}
/** Aufbabe 2 Topologischer Iterator */
class VorrangIterator {
    constructor(relations) {
        this.relations = relations;
        this.entry = [];
        this.eingaenge = new Object;

        //Initialisierung des Eingangs-Objektes + Array für Eingaenge = 0;
        for(let i = 0; i < this.relations.length; i++) {
            this.eingaenge[relations[i][0]] = 0;
        }
        for(let i = 0; i < this.relations.length; i++) { 
            if(isNaN(this.eingaenge[relations[i][1]])) {
                this.eingaenge[relations[i][1]] = 1;
            } else {
                this.eingaenge[relations[i][1]]++;
            } 
        }
        //Einfügen der Elemente mit Eingang = 0
        for (const [key, value] of Object.entries(this.eingaenge)){
            if (value === 0) this.entry.push(key);
        }
    }
    [Symbol.iterator]() {
        let ret = [];
        let entry = this.entry;
        let eingaenge = this.eingaenge;
        const relations = this.relations;
        let schritt;
        let check = false; //Check ob letztes Element bereits bearbeitet Da Iterator einmal über Länge iterieren muss
        return {
            next() {
                schritt = topSortSchritt(ret, entry, eingaenge, relations);
                ret = schritt.ret;
                entry = schritt.entry;
                eingaenge = schritt.eingaenge;
                if(entry.length === 0) {
                    if (check) {
                        return {done: true, value: ret[ret.length-1] }
                    } else {
                        check = true;
                        return { done: false, value: ret[ret.length-1] }
                    }
                } else {
                    return { done: false, value: ret[ret.length-1] }
                }
            }
        }
    }
}

const studentenLeben = new VorrangIterator( [
    [ "schlafen", "studieren" ],
    [ "essen", "studieren" ],
    [ "studieren", "prüfen" ]
    ] )

for ( const next of studentenLeben ) {
    console.log( next );
}

/** Aufgabe 3 Topologischer Generator*/

const fibonacci = {
    [Symbol.iterator]: function*() {
      let pre = 0, cur = 1;
      for (;;) {
        const temp = pre;
        pre = cur;
        cur += temp;
        yield cur;
      }
    }
  }
  
  for (const n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
      break;
    console.log(n);
  }

class VorrangGenerator {
    constructor(relations) {
        this.relations = relations;
        this.entry = [];
        this.eingaenge = new Object;

        //Initialisierung des Eingangs-Objektes + Array für Eingaenge = 0;
        for(let i = 0; i < this.relations.length; i++) {
            this.eingaenge[relations[i][0]] = 0;
        }
        for(let i = 0; i < this.relations.length; i++) { 
            if(isNaN(this.eingaenge[relations[i][1]])) {
                this.eingaenge[relations[i][1]] = 1;
            } else {
                this.eingaenge[relations[i][1]]++;
            } 
        }
        for (const [key, value] of Object.entries(this.eingaenge)){
            if (value === 0) this.entry.push(key);
        }
    }
    * [Symbol.iterator]() {
    let ret = [];
    let entries = this.entry;
    console.log(entries);
    let eingaenge = this.eingaenge;
    const relations = this.relations;
    let schritt;
    let count = 0;
    for (;;) {
        if(entries.length === 0) break;
        schritt = topSortSchritt(ret, entries, eingaenge, relations);
        ret = schritt.ret;
        entries = schritt.entry;
        eingaenge = schritt.eingaenge;
        yield ret[ret.length-1];
    }
  }
}

const studentenLebenG = new VorrangGenerator( [
    [ "schlafen", "studieren" ],
    [ "essen", "studieren" ],
    [ "studieren", "prüfen" ]
    ] )

for ( const next of studentenLebenG ) {
    console.log( next );
}

//export {VorrangIterator as Iterator, VorrangGenerator as Generator};