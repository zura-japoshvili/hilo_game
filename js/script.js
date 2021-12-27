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


let gameActive = false;
let choice;


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


function cardClickHandler(clickedIndex){
    getImgData(3);


    $.each(cardsBtn, function(index, value) {
        $(value).css({"transform": "rotateY(180deg)"});
    })
    $(cardsBtn[clickedIndex]).css({"width": "120px", "height": "180px","box-shadow": "0px 0px 41px 3px rgba(39,158,37,0.75)"});

    const topImgNum = parseInt($(topImg).attr("src").split('/').pop());
    const selectedCard = parseInt($(cardsFront[clickedIndex]).attr("src").split('/').pop());

    if(choice === 'down'){
        if(selectedCard <= topImgNum){
            setTimeout(choiceIsCorrect, 1500);
        }else{
            whenLossGame(clickedIndex)
        }
    }
    if(choice === 'up'){
        if(selectedCard >= topImgNum){
            setTimeout(choiceIsCorrect, 1500);
        }else{
            whenLossGame(clickedIndex)
        }
    }

}

function choiceIsCorrect (index) {
    $(cardsBtn[index]).css({"width": "100px", "height": "160px","box-shadow": ""});
    betBtn.text('CASHOUT');
    betBtn.css("background-color", "#1396F2");

    $.each(cardsBtn, function(index, value) {
        $(value).css({"transform": "rotateY(0deg)"});
        $(value).attr('disabled', true);
        $(cardsFront[index]).attr("src", "");
    });

}

function whenLossGame(index){
    $(cardsBtn[index]).css({"width": "100px", "height": "160px","box-shadow": ""});
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
        getImgData(3);
        topCont.css("top", "40px");
        topImg.css({"width": "100px", "height": "160px"});
        cardList.css({"width": "80px", "height": "120px"});
        setTimeout(() =>{
            topCont.css("position", "static");
            setTimeout(generateCards, 50);
        }, 400);
        gameActive = true;  
    }
    
}
