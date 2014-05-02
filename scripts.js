var x;

function start_game(){
	document.getElementById("div_first_step").style.display = "none";
	document.getElementById("div_round1").style.display = "block";

	var str = document.getElementById("text_first_step").value;
	eval(str);
	x = _x;
	print();
}

function print(){
	alert(x);
}
