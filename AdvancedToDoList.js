$("ul").on("click","li",function(){

	$(this).toggleClass("completed");

});


//to delete a TO-DO
$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();



});

$("input[type='text']").keypress(function(event){

	if(event.which === 13){

		//grapping new todo text from input
		var ToDoText = $(this).val();
		$("ul").append("<li><span><i class='fas fa-dumpster'></i></span> "+ ToDoText +"</li>");
	}

});


$(".fa-plus").click(function(){

	$("input[type='text']").fadeToggle();
});