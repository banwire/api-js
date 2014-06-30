<?php
error_reporting(E_ALL);
$file = file_put_contents('response.txt', json_encode($_POST));
echo json_encode($_POST);