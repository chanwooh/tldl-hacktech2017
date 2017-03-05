
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

function translateClicked() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "none";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "inline-block";
}

function changeLanguageSelection(selectedElement, dropdownButton) {
	if (dropdownButton) {
		var button = document.getElementsByClassName("btn btn-danger dropdown-toggle true");
		button[0].innerHTML = selectedElement + ' <span class="caret"></span>';
	} else {
		var button = document.getElementsByClassName("btn btn-danger dropdown-toggle false");
		button[0].innerHTML = selectedElement + ' <span class="caret"></span>';
	}
}

function displayText() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "inline-block";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "none";
}

function translateText(text, target) {
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
