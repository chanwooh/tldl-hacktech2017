
var map = new Object();
map['English'] = 'en';
map['Spanish'] = 'es';
map['Korean'] = 'ko';

function changeText(clickedElement) {
	var selections = document.getElementsByClassName("selection");

	for (var i = 0; i < selections.length; i++) {
		selections[i].setAttribute("id", "inactive");
	}

	clickedElement.setAttribute("id", "active");
	checkForActiveTab();
}

function checkForActiveTab() {
	var selections = document.getElementsByClassName("selection");

	for (var i = 0; i < selections.length; i++) {
		if (selections[i].getAttribute("id") == "active")
			selections[i].style.backgroundColor = "#BA2A3B";
		else
			selections[i].style.backgroundColor = "#26262B";
	}
}

function summaryClicked() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("summary");
	localStorage.setItem("current", localStorage.getItem("summary"));
}

function fullClicked() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("full");
	localStorage.setItem("current", localStorage.getItem("full"));
}

function translateClicked() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "none";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "inline-block";
}

function changeLanguageSelection(selectedElement) {

	var button = document.getElementsByClassName("btn btn-danger dropdown-toggle");
	button[0].innerHTML = selectedElement + ' <span class="caret"></span>';
	button[0].value = selectedElement;

	localStorage.setItem("toLanguage", map[selectedElement]);
	translateText();
}

function displayText() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "inline-block";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "none";
}

function translateText() {

	var text = localStorage.getItem("current");
	var target = localStorage.getItem("toLanguage");

	$.ajax({
	    type : 'POST',
	    url: 'http://localhost:8080/translate',
	    data: { 
	    	raw_text: text,
	    	language: target
	    },
	    dataType: 'jsonp',
	    success: function(data) {
	      	localStorage.setItem("translation", data);
	      	populateTranslatedNotes();
	    },
	    error: function(err) {
	      	console.log("Error");
	    }
  	});
}

function populateNotes() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("summary");
}

function populateTranslatedNotes() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("translation");
	displayText();
}
