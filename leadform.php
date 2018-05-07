<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
$obj = $_POST;
$name = $_POST['name'];
$formsubject = $_POST['formsubject'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$message = $_POST['message'];
$client = $_POST['client'];
$court = $_POST['court-type'];
$body = '';
if ($phone == '' && $message == '' && $name == '' && $address == '' && $client == '' && $court == ''){
	$body .= "Email: ".$email;
}elseif($phone == '' && $message == '' && $client == '' && $court == '') {
	$body .= "Name: ".$name."<br/>Email: ".$email."<br/>Address: ".$address;
}elseif($phone == '' && $client == '' && $court == '') {
	$body .= "Name: ".$name."<br/>Email: ".$email."<br/>Address: ".$address."<br/>Message: ".$message;
}elseif($phone == '') {
	$body .= "Name: ".$name."<br/>Email: ".$email."<br/>Address: ".$address."<br/>Message: ".$message."<br/>Client Type: ".$client."<br/>Court Type: ".$court;
} else {
	$body .= "Name: ".$name."<br/>Phone: ".$phone."<br/>Address: ".$address."<br/>Email: ".$email."<br/>Message: ".$message."<br/>Client Type: ".$client."<br/>Court Type: ".$court;
}

require "lib/mail/PHPMailerAutoload.php";
$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sergey@elevatecg.com';                 // SMTP username
$mail->Password = 'imdeveloper1';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom('from@example.com', 'Home Court Advantage web site');
$mail->addAddress('tuneyourhead@gmail.com');   // Add a recipient             // Name is optional
$mail->addReplyTo('sergey@elevatecg.com', 'Information');

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Court Advantage site | '.$formsubject;
$mail->Body    = $body;

if(!$mail->send()) {
echo false;
} else {
    echo true;
}
