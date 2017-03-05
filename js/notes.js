
// Map to convert Languages in dropdown button into ISO 639-1 Code
var map = new Object();
map['English'] = 'en';
map['Spanish'] = 'es';
map['Korean'] = 'ko';

// Function that changes the sidebar selection (UI)
function changeText(clickedElement) {
	var selections = document.getElementsByClassName("selection");

	for (var i = 0; i < selections.length; i++) {
		selections[i].setAttribute("id", "inactive");
	}

	clickedElement.setAttribute("id", "active");
	checkForActiveTab();
}

// Finds active tab and sets its background to crimson color
function checkForActiveTab() {
	var selections = document.getElementsByClassName("selection");

	for (var i = 0; i < selections.length; i++) {
		if (selections[i].getAttribute("id") == "active")
			selections[i].style.backgroundColor = "#BA2A3B";
		else
			selections[i].style.backgroundColor = "#26262B";
	}
}

// Called when summary section is clicked. It updates the text area to the summary.
function summaryClicked() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("summary");
	localStorage.setItem("current", localStorage.getItem("summary"));
}

// Called when the full section is clicked. It updates the text area to the full text.
function fullClicked() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("full");
	localStorage.setItem("current", localStorage.getItem("full"));
}

// Called when the translation section is clicked. It updates the text area to the translation options.
function translateClicked() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "none";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "inline-block";
}

// Called when the user makes a selection from translation dropdown button.
function changeLanguageSelection(selectedElement) {

	var button = document.getElementsByClassName("btn btn-danger dropdown-toggle");
	button[0].innerHTML = selectedElement + ' <span class="caret"></span>';
	button[0].value = selectedElement;

	localStorage.setItem("toLanguage", map[selectedElement]);
	translateText();
}

// Displays the text and hides the translation dropdown button.
function displayText() {
	var notes = document.getElementsByClassName("center-notes");
	notes[0].style.display = "inline-block";

	var translate = document.getElementsByClassName("center-translate");
	translate[0].style.display = "none";
}

// Calls server to receive translated text (Google Cloud Translation API)
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

// Initially populates text area with summary when coming from index.html (called during loading of notes.html)
function populateNotes() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("summary");
}

// Populates the text area with the translated version of summary or full text depending on what the
// previous active section was
function populateTranslatedNotes() {
	document.getElementById("text-area").innerHTML = localStorage.getItem("translation");
	displayText();
}
