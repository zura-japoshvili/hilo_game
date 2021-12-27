let betBtn = $(".bet-btn");

let bottomCont = $(".bottom-cont"),
    topCont = $(".top-cont"),
    topImg = $(".top-img"),
    cardList = $(".card-lists");

let cardsBtn = $(".cards-btn"),
    cardsFront = $(".cards-front img"),
    cardsBtnImg = $(".cards-btn div img");

let gameActive = false;


function cardClickHandler(clickedIndex){
    getImgData(3);
    $.each(cardsBtn, function(index, value) {
        $(value).css({"transform": "rotateY(180deg)"});
        $(cardsBtnImg[index]).css("filter", "grayscale(0%)");
    })
    $(cardsBtn[clickedIndex]).css({"width": "120px", "height": "180px","box-shadow": "0px 0px 41px 3px rgba(39,158,37,0.75)"});

    const topImgNum = parseInt($(topImg).attr("src").split('/').pop());
    const selectedCard = parseInt($(cardsFront[clickedIndex]).attr("src").split('/').pop());


    if(topImgNum > selectedCard){
        console.log('Win');
    }else{
        console.log("Loss")
    }
}

function generateCards() {
    bottomCont.css("display" ,"flex");
    cardsBtn.each(function (indexInArray, valueOfElement) { 
        $(valueOfElement).click(function () {
            cardClickHandler(indexInArray);
        });
    });
}


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
    }
    
}

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