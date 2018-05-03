<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
$obj = $_POST;
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$message = $_POST['message'];

$body = '';
if($phone == '' && $message == '') {
$body .= "Name: ".$name."<br/>Email: ".$email."<br/>Address: ".$address;

} elseif($address !='') {
	$body .= "Name: ".$name."<br/>Email: ".$email."<br/>Address: ".$address."<br/>Message: ".$message;
} else {
	$body .= "Name: ".$name."<br/>Phone: ".$phone."<br/>Email: ".$email."<br/>Address: ".$address."<br/>Message: ".$message;
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

$mail->Subject = 'Email from Home Court Advantage site';
$mail->Body    = $body;

if(!$mail->send()) {
echo false;
} else {
    echo true;
}
