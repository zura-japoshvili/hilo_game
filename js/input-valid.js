let amountInput = $(".left-box-input input"),
    minesInput = $(".def-num");

let amountMinus = $(".minus-icon"),
    amountPlus = $(".plus-icon");

let defaultAmount = $(".def-num");

amountMinus.click(function () { 
    if(parseFloat(amountInput.val()) > 0.1){
        amountInput.val((parseFloat(amountInput.val()) - 0.1).toFixed(1));
    }
});
amountPlus.click(function () {
    if(parseFloat(amountInput.val()) < 100){
            amountInput.val((parseFloat(amountInput.val()) + 0.1).toFixed(1));
    }
})

amountInput.keyup(function () {
    if(parseFloat(amountInput.val()) < 0.1){
        amountInput.val(0.1);
    }
    if(parseFloat(amountInput.val()) > 100){
        amountInput.val(100);
    }
});

defaultAmount.each(function (indexInArray, valueOfElement) {
    let clickNum = valueOfElement; 
    $(clickNum).click(function () {
        amountInput.val(parseInt($(clickNum).attr('num')));
    });
});
