function summarizeText() {
	
	var unirest = require('unirest');

	var response = unirest.post("https://cotomax-summarizer-text-v1.p.mashape.com/summarizer")
			.header("X-Mashape-Key", "tYe19sDdFDmshbS4t7MTT2QZsJJMp1bwCrqjsnW2TAuD70gynW")
			.header("Content-Type", "application/json")
			.header("Accept", "application/json")
			.send({"Percent":"30","Language":"en","Text":"The United States Constitution is the supreme law of the United States of America. The Constitution, originally comprising seven articles, delineates the national frame of government. Its first three articles entrench the doctrine of the separation of powers, whereby the federal government is divided into three branches: the legislative, consisting of the bicameral Congress; the executive, consisting of the President; and the judicial, consisting of the Supreme Court and other federal courts. Articles Four, Five and Six entrench concepts of federalism, describing the rights and responsibilities of state governments and of the states in relationship to the federal government. Article Seven establishes the procedure subsequently used by the thirteen States to ratify it."})
			.end(function (result) {
			  	
			});

	var jsonBody = JSON.parse(response.body);
	console.log(jsonBody["Text"]);
}

summarizeText();