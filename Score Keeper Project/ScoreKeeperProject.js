var P1Button = document.querySelector("#P1");
var P2Button = document.querySelector("#P2");
var P1Display = document.querySelector("#P1D");
var P2Display = document.querySelector("#P2D");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");
var limit = document.querySelector("#limit");


var P1Score = 0 ;
var P2Score = 0 ;

var GameOver = false;
var winningScore = 5;


P1Button.addEventListener("click" , function(){
	if (!GameOver){
P1Score++;
if(P1Score === winningScore){
		P1Display.classList.add("winner");
		GameOver = true;
}	
	P1Display.textContent = P1Score;
}

	





});


P2Button.addEventListener("click" , function(){
if (!GameOver){
	P2Score++;
	if (P2Score === winningScore){
		P2Display.classList.add("winner");
GameOver = true;
}
	P2Display.textContent = P2Score;

}

});

reset.addEventListener("click" , function(){
resetGame();


});

function resetGame(){

	P1Score = 0;
	P2Score = 0;
	P1Display.textContent = 0;
	P2Display.textContent = 0;
	P2Display.classList.remove("winner");
	P1Display.classList.remove("winner");
	numInput.value 
	GameOver = false;


}


numInput.addEventListener("change" , function(){

limit.textContent = numInput.value;
winningScore = Number(numInput.value);
resetGame();



});
