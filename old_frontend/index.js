$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/test',
  });


  // some global options for our recorder
  var timeStarted = null,
      timeEnded = null,
      recorder = null,
      recording = null,
      worker = new Worker('./encodingHelpers/wav_worker.js'),
      config = {
        channels: 1,
      };

  // some buttons to help us control flow
  const startRecording = document.getElementById('start');
  const stopRecording = document.getElementById('stop');

  // initiate recording
  startRecording.addEventListener('click', function() {
    navigator.getUserMedia({ audio: true, video: false }, function(stream) {
      recorder = new UserMediaRecorder(stream, worker);
      recording = recorder.startRecording(config);
    }, function(error) {
      console.log('Error!');
      console.log(error);
    });
  });

  // stop recording and handle blob
  stopRecording.addEventListener('click', function() {
    recorder.stopRecording(recording, function(blob) {
      // blob to base64!
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        // on conversion, let's post the encoded blob to slim!

        // wrap with form data
        var ajaxWrapper = new FormData();
        ajaxWrapper.append('audio_blob_encoded', event.target.result);

        // do da ajax
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/api/speechToText',
          data: ajaxWrapper,
          processData: false,
          contentType: false,
        });
      }
    });
  });
});
