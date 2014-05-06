var count_round = 0, current_round = -1;

function Theme(){
	
	this.name;
	this.questions = new Array();

}

function Round(){

	this.themes = new Array();
	this.points = new Array();

	this.print = function(num){
		document.getElementById("div_round_header").innerHTML = "Раунд " + num;

		var table = document.getElementById("div_round_table");

		for(var i=0; i<this.themes.length; i++){
			table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = this.themes[i].name;
			for(var j=0; j<this.points.length; j++)
				table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j+1].innerHTML = this.points[j];
		}

		//alert(table.getElementsByTagName("tr"));

	}

}

var rounds = new Array();

function start_game(){
	document.getElementById("div_first_step").style.display = "none";

	var str = document.getElementById("text_first_step").value;

	//alert("test1");
	eval(str);
	//alert("test2");
	
	next_round();
}

function next_round(){
	current_round++;
	if(current_round == count_round){
		end_game();
		return ;
	}

	document.getElementById("div_round").style.display = "block";
	rounds[current_round].print(current_round+1);
}
