let za = $(".cards-btn");
za.click(function () { 
    console.log(za[0]);
    $(za[0]).css("transform", "rotateY(180deg)");
});