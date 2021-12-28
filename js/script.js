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

let inputAmount;

let gameActive = false;
let clickedIndex;
let choice;

const clickSound = 'audio/click.wav',
    flipSound = 'audio/flip.wav',
    loseSound = 'audio/losing.wav',
    winSound = 'audio/win.wav';

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
    
        console.log($(cardsFront[clickedIndex]).attr("src"));
        console.log(choice, topImgNum, selectedCard, index);
    
        if(choice === 'down'){
            if(selectedCard <= topImgNum){
                setTimeout(choiceIsCorrect, 1500);
            }else{
                makeSound(loseSound);
                setTimeout(restartGame, 1500);
            }
        }
        if(choice === 'up'){
            if(selectedCard >= topImgNum){
                setTimeout(choiceIsCorrect, 1500);
            }else{
                makeSound(loseSound);
                setTimeout(restartGame, 1500);
            }
        }
    }, 100);
}

function choiceIsCorrect () {
    $(cardsBtn[clickedIndex]).css({"width": "100px", "height": "160px","box-shadow": ""});
    betBtn.text('CASHOUT');
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
}

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


betBtn.click(startFunc);
function startFunc(){
    if(!gameActive){
        inputAmount = parseFloat($(".left-box-input input").val());
        console.log(inputAmount);
        getImgData(1);
        topCont.css("top", "40px");
        topImg.css({"width": "100px", "height": "160px"});
        cardList.css({"width": "80px", "height": "120px"});
        makeSound(clickSound);
        setTimeout(() =>{
            topCont.css("position", "static");
            setTimeout(generateCards, 50);
        }, 400);
    }
    if(gameActive){
        makeSound(winSound);
        restartGame();
    }
}
