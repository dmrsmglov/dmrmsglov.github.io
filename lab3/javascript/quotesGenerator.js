window.onload = windowPrepared;

function windowPrepared() {
    let canvas = document.createElement('canvas');
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    let context = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    let counter = 0;

    let quote = "";
    let backgroundImage1 = new Image();

    backgroundImage1.crossOrigin = 'anonymous';
    backgroundImage1.src = "https://source.unsplash.com/collection/1127163/300x500";
    backgroundImage1.onload = function () {
        counter++;
        drawContent();
    };

    let backgroundImage2 = new Image();
    backgroundImage2.crossOrigin = 'anonymous';
    backgroundImage2.src = "https://source.unsplash.com/collection/1127163/200x260";
    backgroundImage2.onload = function () {
        counter++;
        drawContent();
    };

    let backgroundImage3 = new Image();
    backgroundImage3.crossOrigin = 'anonymous';
    backgroundImage3.src = "https://source.unsplash.com/collection/1127163/200x240";
    backgroundImage3.onload = function () {
        counter++;
        drawContent();
    };

    let requestQuote = new XMLHttpRequest();
    requestQuote.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");
    requestQuote.send();

    requestQuote.onload = requestQuoteLoaded;

    function requestQuoteLoaded() {
        let responseObject = JSON.parse(requestQuote.response);
        quote = responseObject[0].quote;
        counter++;
        drawContent();
    }

    function drawBlackout() {
        context.fillStyle = "rgba(0, 0, 0, 0.4)";
        context.fillRect(0, 0, 500, 500);
    }


    function drawContent() {
        if (counter === 4) {
            context.drawImage(backgroundImage1, 0, 0);
            context.drawImage(backgroundImage2, 300, 0);
            context.drawImage(backgroundImage3, 300, 260);
            context.font = "30px Comic Sans MS";
            context.strokeStyle = "#ffffff";
            drawBlackout();
            fitQuoteIntoCanvas();
            canvas.onclick = download;
        }
    }

    function download() {
        const fakeLink = document.createElement('a');
        fakeLink.download = 'canvas.png';
        fakeLink.href = canvas.toDataURL();
        fakeLink.click();
    }

    function fitQuoteIntoCanvas() {
        let words = quote.split(' ');
        let it = 0;
        let current = "";
        let offset = 0;
        while (it < words.length) {
            if ((current.length + words[it].length) * 15 > 450) {
                context.strokeText(current, 50, 200 + offset);
                offset += 30;
                current = words[it] + " ";
            } else {
                current += words[it] + " ";
            }
            it++;
        }
        context.strokeText(current, 50, 200 + offset);
    }
}
