<?php
require __DIR__ . '/../vendor/autoload.php';

session_start();

# Imports the Google Cloud client library
use Google\Cloud\Speech\SpeechClient;

# Your Google Cloud Platform project ID
$projectId = 'tldl-hacktech2017';

# Instantiates a client
$speech = new SpeechClient([
    'projectId' => $projectId
]);

# The audio file's encoding and sample rate
$options = [
    'encoding' => 'FLAC',
    'sampleRate' => 16000,
];

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Register routes
require __DIR__ . '/../src/routes.php';

// Run app
$app->run();
