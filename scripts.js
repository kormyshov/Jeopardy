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

		var tr = document.getElementById("div_round_team");
		for(var i=0; i<teams.length; i++)
			teams[i].print(tr.getElementsByTagName("div")[i]);

	}

}

function Team(){

	this.name;
	this.points;

	this.print = function(e){
		e.getElementsByTagName("span")[0].innerHTML = this.name;
		e.getElementsByTagName("span")[1].innerHTML = this.points;
	}
}

var count_round = 0, current_round = -1;
var rounds = new Array();
var teams = new Array();

function start_game(){
	document.getElementById("div_first_step").style.display = "none";
	document.getElementById("div_round").style.display = "block";

	var str = document.getElementById("text_first_step").value;

	//alert("test1");
	eval(str);
	//alert("test2");
	
	var s = "";
	s += "<div id='div_round_team'>";
	for(var i=0; i<teams.length; i++)
		s += "<div class='team'><span class='name'></span><br><span class='points'></span></div>";
	
	s += "</div>";
	document.getElementById("div_round_div_team").innerHTML = s;

	next_round();
}

function next_round(){
	current_round++;
	if(current_round == count_round){
		end_game();
		return ;
	}

	rounds[current_round].print(current_round+1);
}
