function startListening() {

	// Fade out home
	var home = document.getElementsByClassName('home');
	home[0].setAttribute('class', 'home animated fadeOut');
	home[1].setAttribute('class', 'home animated fadeOut');
	home[2].setAttribute('class', 'home buttons animated fadeOut');

	// Fade in listening
	var bars = document.getElementById("listening");
	bars.setAttribute('class', 'animated fadeIn');
	bars.style.display = "block";

}

function stopListening(callbackFunction, wav_text) {

	// Fade out listening
	var listen = document.getElementById("listening");
	listen.setAttribute('class', 'animated fadeOut');

	// Fade in loading
	var loading = document.getElementById("loading");
	loading.setAttribute('class', 'animated fadeIn');
	loading.style.display = "block";

	callbackFunction();

	$.ajax({
	    type : 'POST',
	    url: 'http://localhost:8080/summary',
	    data: { raw_text: wav_text },
	    dataType: 'jsonp',
	    success: function(data) {
	    	localStorage.setItem("summary", data);
	    	localStorage.setItem("full", wav_text);
	      	endAnimation();
	    },
	    error: function(err) {
	      	console.log("Error");
	    }
  	});
}


