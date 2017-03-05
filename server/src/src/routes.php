<?php

# ROUTES

# post route to turn request speech into text
$app->post('/api/speechToText', function ($request, $response, $args) use ($speech, $options) {
  // grab data from param
  $audio_blob = $request->getParsedBody()['audio_blob_encoded'];
  $text_results = $speech->recognize($audio_blob, $options);
  print_r($text_results);
  return $response->withHeader('Access-Control-Allow-Origin', '*');
});

$app->get('/test', function ($request, $response, $args) use ($speech, $options) {
  $results = $speech->recognize(fopen('/Users/aniruddhbharadwaj/Documents/Projects/tldl-hacktech2017/example.flac', 'r'));
  print_r('test');
  print_r($results);
});
