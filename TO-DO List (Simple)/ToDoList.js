var todos= [];
var input = prompt("Enter an option: ");

while(input != "quit"){

	if(input == "new"){

		addTodo();

	} else if (input == "list"){

	listTodos();

	}else if(input == "delete"){

	deleteTodo();

	}

	input = prompt("Enter an option: ");
}

console.log("You've quit!");






function listTodos(){
			console.log("***********");
		todos.forEach(function(todo , i){
			console.log(i + ": " + todo);
		});
console.log("***********");


}




function addTodo(){

		var newTodo = prompt("Enter new todo");
		todos.push(newTodo);

}

function deleteTodo(){

			var index = prompt("Enter index of todo to delete: ")
		todos.splice(index , 1);
		//splice(start index , how many items you want to delete) used to delete specifit item from the array
}