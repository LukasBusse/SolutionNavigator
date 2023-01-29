const url: string = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronafälle_in_den_Bundesländern/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
const res: any = await (await fetch(url)).json();
const fallzahlen: number[] = [];
res.features.forEach((element: any) => {
    fallzahlen.push(element.properties.Fallzahl);
});
const summe: number = fallzahlen.reduce((a: number, b: number): number => a+b, 0);
const durchschnitt: number = summe / fallzahlen.length;
const minimum: number = fallzahlen.reduce((a: number, b:number): number => a < b ? a : b);
const maximum: number = fallzahlen.reduce((a: number, b:number): number => a > b ? a : b);

//Erstellung der Webseite inklusive Ergebnisse & Aufgabe auf der Konsole für Deno
const webseite: string = `
    <!DOCTYPE html>
    <body>
    <span>Maximum:</span>
    <span>${maximum}</span>
    <br>
    <span>Minimum:</span>
    <span>${minimum}</span>
    <br>
    <span>Durchschnitt:</span>
    <span>${durchschnitt}</span>
    <br>
    <span>Summe:</span>
    <span>${summe}</span>
    <br>
    </body>
    </html>
`
const enc: TextEncoder = new TextEncoder();
const body = new Uint8Array(enc.encode(webseite));
await Deno.stdout.write(body);