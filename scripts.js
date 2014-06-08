function Cat(){

	this.theme;
	this.question1;
	this.question2;

	this.print = function(){

		var div = document.getElementById("div_round_div_question");
		var str = "";
		str += "<div class='div_cat' onclick='rounds["+current_round+"].themes["+Status[0]+"].questions["+Status[1]+"].value.printQ(1)'>"+rounds[current_round].points[0]+"</div>";
		str += "<div class='div_cat' onclick='rounds["+current_round+"].themes["+Status[0]+"].questions["+Status[1]+"].value.printQ(2)'>"+rounds[current_round].points[rounds[current_round].points.length-1]+"</div>";
		div.innerHTML = str;
		div.style.display = "block";
	}

	this.printQ = function(num){
		var div = document.getElementById("div_round_div_question");
		div.style.display = "block";
		Status[4] = 0;
		if(num == 1) div.innerHTML = this.question1;
		else{
			div.innerHTML = this.question2;
			Status[4] = rounds[current_round].points.length-1;
		}
		Status[1] += 10;

		Status[3] = setInterval("printTimer();", 1000);
	}
}

function Question(){

	this.value;

	this.print = function(){
		document.getElementById("div_round_div_table").style.display = "none";

		var tr = document.getElementById("div_round_team");
		for(var i=0; i<teams.length; i++){
			tr.getElementsByTagName("div")[i*3+1].style.display = "inline-block";
			tr.getElementsByTagName("div")[i*3+2].style.display = "inline-block";
		}

		document.getElementById("div_question_timer").style.display = "block";
		document.getElementById("div_question_timer").innerHTML = ""+maxTime;

		document.getElementById("div_question_back").style.display = "inline-block";

		if(typeof(this.value) == "string"){
			var div = document.getElementById("div_round_div_question");
			div.style.display = "block";
			div.innerHTML = this.value;

			Status[3] = setInterval("printTimer();", 1000);
		}else{
			this.value.print();
		}
	}
}

function Theme(){
	
	this.name;
	this.questions = new Array();

}

function Round(){

	this.themes = new Array();
	this.points = new Array();

	this.print = function(){
		document.getElementById("div_round_header").innerHTML = "Раунд " + (current_round+1);
		document.getElementById("div_round_div_question").style.display = "none";
		document.getElementById("div_question_timer").style.display = "none";
		document.getElementById("div_question_back").style.display = "none";
		document.getElementById("div_round_div_table").style.display = "block";

		var table = document.getElementById("div_round_table");

		if(Status[0] < 0)
		for(var i=0; i<this.themes.length; i++){
			table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = this.themes[i].name;
			for(var j=0; j<this.points.length; j++)
				table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j+1].innerHTML = this.points[j];
		}

		var tr = document.getElementById("div_round_team");
		for(var i=0; i<teams.length; i++){
			teams[i].print(tr.getElementsByTagName("div")[i*3]);
			tr.getElementsByTagName("div")[i*3+1].style.display = "none";
			tr.getElementsByTagName("div")[i*3+2].style.display = "none";
		}

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

function print_question(i, j){
	Status[0] = i;
	Status[1] = j;
	Status[2] = maxTime;
	rounds[current_round].themes[i].questions[j].print();
}

function printTimer(){
	Status[2]--;
	if(Status[2] <= 0) clearInterval(Status[3]);
	var s = "";
	if(Status[2] < 10) s += "0";
	document.getElementById("div_question_timer").innerHTML = s+Status[2];
}

function ans_yes(num){
	if(Status[1]<10)
		teams[num].points += rounds[current_round].points[Status[1]];
	else
		teams[num].points += rounds[current_round].points[Status[4]];
	Status[1] %= 10;

	rounds[current_round].print();
	document.getElementById("div_round_table").getElementsByTagName("tr")[Status[0]].getElementsByTagName("td")[Status[1]+1].innerHTML = "";
	clearInterval(Status[3]);
	Status[1] = -1;
}

function ans_no(num){
	if(Status[1]<10)
		teams[num].points -= rounds[current_round].points[Status[1]];
	else
		teams[num].points -= rounds[current_round].points[Status[4]];

	teams[num].print(document.getElementById("div_round_team").getElementsByTagName("div")[num*3]);
	document.getElementById("div_round_team").getElementsByTagName("div")[num*3+1].style.display = "none";
	document.getElementById("div_round_team").getElementsByTagName("div")[num*3+2].style.display = "none";
}

function click_back(){
	rounds[current_round].print();
	clearInterval(Status[3]);
	Status[1] = -1;
}

function click_forw(){
	if(Status[1] < 0){
		next_round();
		return ;
	}
	rounds[current_round].print();
	document.getElementById("div_round_table").getElementsByTagName("tr")[Status[0]].getElementsByTagName("td")[Status[1]%10+1].innerHTML = "";
	clearInterval(Status[3]);
	Status[1] = -1;
}

var count_round = 0, current_round = -1;
var maxTime = 30;
var rounds = new Array();
var teams = new Array();
var Status = new Array();

function start_game(){
	document.getElementById("div_first_step").style.display = "none";
	document.getElementById("div_round").style.display = "block";

	var str = document.getElementById("text_first_step").value;

	//alert("test1");
	eval(str);
	//alert("test2");
	
	var s = "";
	s += "<table id='div_round_table' class='div_round_div_table'>";
	for(var i=0; i<6; i++){
		s += "<tr><td class='theme'></td>";
		for(var j=0; j<5; j++)
			s += "<td class='point' onclick='print_question("+i+","+j+");'></td>";
		s += "</tr>";
	}
	s += "</table>";
	document.getElementById("div_round_div_table").innerHTML = s;

	s = "";
	s += "<div id='div_round_team'>";
	for(var i=0; i<teams.length; i++)
		s += "<div class='team'><div class='yes' onclick='ans_yes("+i+");'>V</div><div class='no' onclick='ans_no("+i+");'>X</div><span class='name'></span><span class='points'></span></div>";
	
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

	Status[0] = -1;
	Status[1] = -1;
	rounds[current_round].print();
}

function end_game(){
	document.getElementById("div_round").style.display = "none";
	document.getElementById("div_end_game").style.display = "block";
	document.getElementById("div_end_div_team").innerHTML = document.getElementById("div_round_div_team").innerHTML;
}
