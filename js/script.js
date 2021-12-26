let betBtn = $(".bet-btn");

let bottomCont = $(".bottom-cont"),
    topCont = $(".top-cont"),
    topImg = $(".top-img"),
    cardList = $(".card-lists");

let cardsBtn,
    cardsFront = $(".cards-front img");

let gameActive = false;


function cardClickHandler(clickedIndex){
    getImgData(3);
    $(cardsBtn[clickedIndex]).css("transform", "rotateY(180deg)");
}

function generateCards() {
    bottomCont.css("display" ,"flex");
    cardsBtn = $(".cards-btn");
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
            console.log(num);
            if(num === 1){
                const rand = Math.floor(Math.random() * maxImgs);
                topImg.attr("src", data.imgs[rand]);
            }else{
                console.log(true)
                for(let i = 0; i < num;i++){
                    const rand = Math.floor(Math.random() * maxImgs);
                    $(cardsFront[i]).attr("src", data.imgs[rand]);
                }
            }
        }
    );
}
$( window ).on('load', getImgData(1));