var arr1 = prompt("Enter array of numbers please: ");

//call PrintReverse function
//PrintReverse(arr1);


//call isUniform function
///console.log(isUniform(arr1));

//call sumArray function
//console.log(sumArray([1,2,3]));

//call max function
//console.log(max(arr1));



//function to print the reverse of an array
function PrintReverse(arr){

	for(var i = arr.length - 1 ; i>=0 ; i--){

		console.log(arr[i]+" ");

}

	}


//function Checks weather all elemnts of the array are the same or not.
	function isUniform(arr){
		var firstElement = arr[0];
		var trueOrFalse;

		for(var i = 0 ; i<arr.length ; i++){

			if(firstElement === arr[i+1]){
				trueOrFalse = true;
				firstElement=arr[i];

			}else{
				trueOrFalse =false;
			}
			return trueOrFalse;

}


}
//function to sum all elements of the array
function sumArray(arr){
	var sum = 0;

	arr.forEach(function(element){
		sum+=element;

	});
	return sum;





}


//function to return max number of the array
	function max(arr){
		var maxElement = arr[0];
		

		for(var i = 0 ; i<arr.length-1 ; i++){

			if(maxElement < arr[i+1]){
				maxElement = arr[i+1];

			}
			
			

}

return maxElement;
}









	


