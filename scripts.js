var count_round, current_round = -1;

function start_game(){
	document.getElementById("div_first_step").style.display = "none";

	var str = document.getElementById("text_first_step").value;
	eval(str);
	
	count_round = Rounds;

	next_round();
}

function next_round(){
	current_round++;
	if(current_round == count_round){
		end_game();
		return ;
	}

	document.getElementById("div_round").style.display = "block";
	document.getElementById("div_round_header").innerHTML = "Раунд " + (current_round+1);
}
