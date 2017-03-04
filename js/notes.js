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
			selections[i].style.backgroundColor = "#CC081F";
		else
			selections[i].style.backgroundColor = "#26262B";
	}
}
