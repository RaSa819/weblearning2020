var Movies = [

{
	title: "Silver Linings",
	rating: 4,
	hasWatched: true
},

{
	title: "Extraction",
	rating: 5,
	hasWatched: false
},
{
	title: "The Platform",
	rating: 3,
	hasWatched: false
},


];

Review(Movies);

function Review(moviesArray){
	for(var i = 0 ; i<moviesArray.length ; i++){
		if (moviesArray[i].hasWatched == true){
			console.log("You Have Watched \" " + moviesArray[i].title + " \" - " + moviesArray[i].rating);
		}else{
			console.log("You Have not Seen \" " + moviesArray[i].title + " \" - " + moviesArray[i].rating);
		}
	}
}