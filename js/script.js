let betBtn = $(".bet-btn");

let bottomCont = $(".bottom-cont"),
    topCont = $(".top-cont"),
    topImg = $(".top-img"),
    cardList = $(".card-lists");

let cardsBtn = $(".cards-btn"),
    cardsFront = $(".cards-front img"),
    topImgIcon = $(".top-img-icon");

let downBtn = $(".down-cont button"),
    upBtn = $(".up-cont button");

let downWinAmount = $(".down-cont p span"),
    upWinAmount = $(".up-cont p span");

let inputAmount,
    currentAmount;

let downPercent,
    upPercent;

let gameActive = false;
let clickedIndex;
let choice;

const clickSound = 'audio/click.wav',
    flipSound = 'audio/flip.wav',
    loseSound = 'audio/losing.wav',
    winSound = 'audio/win.wav';

// With this function we bring the image addresses from the JSON file
// Which images we add depends on the argument being passed (the value of the argument can be 1 or 3);
function getImgData (num) {
    $.getJSON("./js/img-data.json",
        function (data, textStatus, jqXHR) {
            const maxImgs = data.imgs.length;
            if(num === 1){
                const rand = Math.floor(Math.random() * maxImgs);
                topImg.attr("src", data.imgs[rand]);
            }else{
                for(let i = 0; i < num;i++){
                    const rand = Math.floor(Math.random() * maxImgs);
                    $(cardsFront[i]).attr("src", data.imgs[rand]);
                }
            }
        }
    );
}
$( window ).on('load', getImgData(1));

function makeSound (value) {
    let audio = new Audio(value);
    audio.currentTime = 0;
    audio.play();
}
// This function calculates the estimated profit ratio.
function winPercentFunc(){
    let upCounter = 100;
    let downCounter = 100;
    const topImgNum = parseInt($(topImg).attr("src").split('/').pop());
    for(let i = topImgNum; i > 4; i--){
        downCounter -= 10;
    }
    for(let i = topImgNum; i<13; i++){
        upCounter -= 10;
    }
    downWinAmount.text((currentAmount + ((currentAmount * downCounter) / 100)).toFixed(2));
    upWinAmount.text((currentAmount + ((currentAmount * upCounter) / 100)).toFixed(2));
}

// The purpose of this function is to turn over the clicked card and determine if the player has won.
function cardClickHandler(index){
    getImgData(3);  
    clickedIndex = index;

    makeSound(flipSound);
    setTimeout(() => {
        $.each(cardsBtn, function(index, value) {
            $(value).css({"transform": "rotateY(180deg)"});
        })
        $(cardsBtn[clickedIndex]).css({"width": "120px", "height": "180px","box-shadow": "0px 0px 41px 3px rgba(39,158,37,0.75)"});
    
        const topImgNum = parseInt($(topImg).attr("src").split('/').pop());
        const selectedCard = parseInt($(cardsFront[clickedIndex]).attr("src").split('/').pop());
        
        // If the player's guess is correct, the amount of current money on the "Cashout" button is added
        // Otherwise the game will restart automatically
        if(choice === 'down'){
            if(selectedCard <= topImgNum){
                currentAmount = parseFloat(downWinAmount.text());
                setTimeout(choiceIsCorrect, 1500);
            }else{
                makeSound(loseSound);
                setTimeout(restartGame, 1500);
            }
        }
        if(choice === 'up'){
            if(selectedCard >= topImgNum){
                currentAmount = parseFloat(upWinAmount.text());
                setTimeout(choiceIsCorrect, 1500);
            }else{
                makeSound(loseSound);
                setTimeout(restartGame, 1500);
            }
        }
    }, 100);
}
// If the player's assumption is justified the function "cardClickHandler" calls this function
// This function will roll back all the cards as well as add a new card and summon a function 
// that calculates the estimated payout ratio.
function choiceIsCorrect () {
    $(cardsBtn[clickedIndex]).css({"width": "100px", "height": "160px","box-shadow": ""});
    betBtn.text('CASHOUT' + " " + currentAmount);
    betBtn.css("background-color", "#1396F2");

    $.each(cardsBtn, function(index, value) {
        $(value).css({"transform": "rotateY(0deg)"});
        $(value).attr('disabled', true);
    });
    $(topImgIcon).css("display", "none");
    choice = '';
    getImgData(1);
    gameActive = true;
    clickedIndex = '';
    winPercentFunc()
}
// When you call this function the game is restarted and everything returns to its original value
function restartGame(){
    betBtn.text('BET');
    betBtn.css("background-color", "#7CC90D");

    $(cardsBtn[clickedIndex]).css({"width": "100px", "height": "160px","box-shadow": ""});
    $.each(cardsBtn, function(index, value) {
        $(value).css({"transform": "rotateY(0deg)"});
        $(value).attr('disabled', true);
        $(cardsFront[index]).attr("src", "");
    });

    $(topImgIcon).css("display", "none");

    topImg.css({"width": "100px", "height": "160px"});
    cardList.css({"width": "80px", "height": "120px"});
    topCont.css({"position": "absolute", "top": "40%"});
    bottomCont.css("display" ,"none");

    gameActive = false;
    clickedIndex = '';
    choice = ''
    getImgData(1);
}



function generateCards() {
    bottomCont.css("display" ,"flex");
    cardsBtn.each(function (indexInArray, valueOfElement) { 
        $(valueOfElement).click(function () {
            cardClickHandler(indexInArray);
        });
    });
}

function choiceFunc (value){
    $(topImgIcon).css("display", "block");

    $.each(cardsBtn, function(index) {
        $(cardsBtn[index]).css("filter", "none");
        $(cardsBtn[index]).removeAttr('disabled');
    })
    if(value === "down"){
        $(topImgIcon).attr("src", "images/down.svg");
        choice = "down";
    }
    if(value === "up"){
        $(topImgIcon).attr("src", "images/up.svg");
        choice = "up";
    }
}
downBtn.click(() =>{ choiceFunc('down') });
upBtn.click(() => { choiceFunc('up') });

// This function is triggered when we click on the "BET" or "Cashout" button, 
// if we click on the "BET" we make a bet and start the game, 
// or if we click on the "cashout" the game is restarted.
betBtn.click(startFunc);
function startFunc(){
    if(!gameActive){
        inputAmount = parseFloat($(".left-box-input input").val());
        currentAmount = inputAmount;
        topCont.css("top", "40px");
        topImg.css({"width": "100px", "height": "160px"});
        cardList.css({"width": "80px", "height": "120px"});
        makeSound(clickSound);
        setTimeout(() =>{
            topCont.css("position", "static");
            winPercentFunc()
            setTimeout(generateCards, 50);
        }, 400);
    }
    if(gameActive){
        makeSound(winSound);
        restartGame();
    }
}
