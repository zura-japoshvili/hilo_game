let betBtn = $(".bet-btn");

let bottomCont = $(".bottom-cont"),
    topCont = $(".top-cont"),
    topImg = $(".top-img"),
    cardList = $(".card-lists");

let gameActive = false;

let cardsBtn;


// za.click(function () { 
//     console.log(za[0]);
//     $(za[0]).css("transform", "rotateY(180deg)");
// });


function cardClickHandler(clickedIndex){
    console.log(clickedIndex);
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
        topCont.css("top", "40px");
        topImg.css({"width": "100px", "height": "160px"});
        cardList.css({"width": "80px", "height": "120px"});
        setTimeout(() =>{
            topCont.css("position", "static");
            setTimeout(generateCards, 50);
        }, 400);  
    }
    
}

