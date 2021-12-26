let betBtn = $(".bet-btn");

let bottomCont = $(".bottom-cont"),
    topCont = $(".top-cont"),
    topImg = $(".top-img"),
    cardList = $(".card-lists");

let cardsBtn,
    cardsFront;

let gameActive = false;




function cardClickHandler(clickedIndex){
    $(cardsBtn[clickedIndex]).css("transform", "rotateY(180deg)");
}

function generateCards() {
    bottomCont.html(`<div class="cards">
        <button class="cards-btn">
            <div class="cards-front">
                <img>
            </div>
            <div class="cards-back">
                <img src="images/card-back.png" alt="">
            </div>
        </button>
        <button class="cards-btn">
            <div class="cards-front">
                <img>
            </div>
            <div class="cards-back">
                <img src="images/card-back.png" alt="">
            </div>
        </button>
        <button class="cards-btn">
            <div class="cards-front">
                <img>
            </div>
            <div class="cards-back">
                <img src="images/card-back.png" alt="">
            </div>
        </button>
    </div>
    <div class="checker-cont">
        <div class="up-cont">
            <button>LOW OR SAME</button>
            <p>Win. <span>1.12$</span>$</p>
        </div>
        <div class="down-cont">
            <button>HIGH OR SAME</button>
            <p>Win. <span>1.12$</span>$</p>
        </div>
    </div`);
    
    cardsFront = $(".cards-front img");
    console.log(cardsFront);
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
                    console.log(i);
                    const rand = Math.floor(Math.random() * maxImgs);
                    console.log(cardsFront)
                    // $(cardsFront[i]).attr("src", );
                }
            }
        }
    );
}
$( window ).on('load', getImgData(1));