window.onload = contentLoaded;

function contentLoaded() {
    let canvas = document.getElementById("canvasForQuotes");
    let context = canvas.getContext("2d");

    context.fillStyle = "red";
    context.fontSize = 100;
    canvas.width = 500;
    canvas.height = 500;

    let requestQuote = new XMLHttpRequest();
    requestQuote.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");
    requestQuote.send();

    requestQuote.onload = requestQuoteLoaded;

    function requestQuoteLoaded() {
        let responseObject = JSON.parse(this.response);
        console.log(responseObject[0].quote);
        context.fillText(responseObject[0].quote, 50, 250);
    }
}