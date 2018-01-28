//Check of a specific todo
$("ul").on("click","li",function(){
	$(this).toggleClass('completed');
})

$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(1000, function(){
		$(this).remove();
	});
	event.stopPropagation();
})


$("#todo").keypress(function(event) {
	if(event.which === 13)
	{
		//pressed enter
		var todoText = $(this).val();
		$(this).val("");
		//create new li and add to the list
		$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + todoText + "</li>")
	}
	event.stopPropagation();
});

$(".fa-plus").click(function(){
	$("#todo").slideToggle();
});