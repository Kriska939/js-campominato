/* CONSEGNA:

Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe.
I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi)
Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100.
L'utente non può inserire 2 volte lo stesso numero
Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe, guadagna un punto e poi gli chiediamo un altro numero.
Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina.
Quando la partita termina, comunichiamo all'utente il suo punteggio.

-------------------------------------------------------

BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 => tra 1 e 80
con difficoltà 2 => tra 1 e 50


-------------------------------------------------------
*/


// BLOCCO 1 - Preparazione pre-gioco:

// 1. Creare array per le bombe
// 2. Creare array per ricordare i nomi scelti dall'utente
// 3. Creare var del punteggio
// 4. Creare funzione per generare nr random FINCHE' non arrivo a 16 numeri DIVERSI tra loro. Push di ogni numero in array bombe (punto 1)

// BLOCCO 2 - Gioco 

// 1. Chiedo un numero all'utente (prompt)
// 2. Controllo se il numero è presente in array bombe
// SE è presente -> GAME OVER
// SE non è presente -> controllo se è stato già scelto
// SE è stato già scelto -> richiedo il numero (prompt)
// SE è nuovo -> punteggio +1 e push in array nomi scelti dall'utente

// ripeti BLOCCO 2 per 100-16 volte max SE non ho game over.

// BLOCCO 2.5 - GAME OVER/WIN 

// imposto alert contenente: game over e punteggio
// imposto alert contenente win e punteggio


// ------------------ BLOCCO 1 ------------------

//Creazione vari array + variabili per salvare dati

const bombs = [];
const userNumbers = [];
let points = 0;
var attempts = 3;
var max = 100;

// var di stampa: 

var displayChosenNumbers = document.getElementById("chosenNumbers");
var displayPoints = document.getElementById("points");
var displayGameEnding = document.getElementById("winOrLose");


// BONUS: SCELTA DEL LIVELLO: 

// continua a chiedermi prompt FINCHE' utente mi dà stringa vuota, stringa diversa da "0", "1", "2"
do {
    var level = prompt("Scegli il livello di difficoltà", 1);
}
while ((level.trim() === "" || level < 0 || level > 2 || level.length !== 1));

// cambio di difficoltà. Opzione "0" rappresentata dal default:

switch (level) {
    case "1":
        max = 80;
        break;
    case "2":
        max = 50;
        break;
    default:
        max = 100;
        break;

}

// funzione per generare nr random FINCHE' non arrivo a 16 numeri DIVERSI tra loro. Push di ogni numero in array bombe (punto 1)

// genero numeri tramite funzione:

function generateNumbers(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}

// utilizzo while per ripetere la funzione FINCHE' l'array non contiene 16 numeri DIVERSI: 

// lunghezza array <16 perché parto a contare da zero:

while (bombs.length < 16) {

    var singleBomb = generateNumbers(1, max);

    if (!bombs.includes(singleBomb)) {

        bombs.push(singleBomb);
    }
}

// check bombs generator:
console.log(bombs);

//--------------------BLOCCO 2---------------------------

var isGameOver = false;

do {

    // chiedi numero all'utente finché non da una risposta accettabile (cioè un numero tra 1 e massimo consentito)
    do {
        var userChoice = parseInt((prompt("Scegli un numero da 1 a " + max)));
    }
    while ((isNaN(userChoice) || !userChoice || userChoice.length > 0 || userChoice < 1 || userChoice > max));

    // se il numero NON è incluso in quelli già usati: 
    if (!userNumbers.includes(userChoice)) {
        points += 1;
        userNumbers.push(userChoice);
    }

    // se è presente in bombe, game over diventa vero (variabile di appoggio)
    if (bombs.includes(userChoice)) {
        isGameOver = true;
    }
}

// fa tutto quello sopra finché game over è falso (quindi il giocatore può ancora giocare e non abbiamo raggiunto il numero di tentativi massimi)
while ((!isGameOver && userNumbers.length < attempts));


// se gameOver = vero, l'utente viene avvisato:
if (isGameOver) {
    alert("GAME OVER.");
    displayGameEnding.innerText = "GAME OVER :(";

    // se gameOver è falso e il ciclo while è finito, significa che tutti i numeri sono stati indovinati, quindi vittoria:

} else {
    alert("CONGRATS! YOU HAVE WON!");
    displayGameEnding.innerText = "CONGRATS! YOU HAVE WON!";
}

// check:
console.log(points);
console.log(userNumbers);

// STAMPA delle scelte dell'utente + punti ottenuti:

displayChosenNumbers.innerText = "I numeri che hai scelto sono stati: " + userNumbers;
displayPoints.innerText = "Hai totalizzato: " + points + " punti."
