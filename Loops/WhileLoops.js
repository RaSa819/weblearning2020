var num = -10;
console.log("Print All Numbers Between -10 and 19");
while(num<=19){
	console.log(num);
	num++;
}
console.log("Print Even Numbers Between 10 and 40");
num=10;

while(num<=40){
	if(num%2==0){
		console.log(num);
	}
	num++;
}

console.log("Print Odd Numbers Between 10 and 40");
num=300;

while(num<=333){
	if(num%2!=0){
		console.log(num);
	}
	num++;
}
console.log("Print All Numbers divisible by 5 AND 3 Between 10 and 40");
num=10;

while(num<=50){
	if((num%5==0)&&(num%3==0)){
		console.log(num);
	}
	num++;
}
