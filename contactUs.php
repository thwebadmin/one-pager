<?php

session_start(); 

if ($_POST["vercode"] == $_SESSION["vercode"])  { 
     // add form data processing code here 
     //collect post veriables first
	$name = $_POST["personName"];
	$company = $_POST["companyName"];
	$fromEmail = $_POST["personEmail"];
	$phone = $_POST["personPhone"];
	$message = $_POST["personMessage"];
	$subjectAdmin = "New query submitted at website by - $name";
	$headers = 'From: Thinking Hut<no-reply@thinkinghut.com>' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$email = "thinkinghut@thinkinghut.com";
//	$email = "priyanka.varude@thinkinghut.com";
	$messageBodyAdmin = '<html><body>';
	$messageBodyAdmin .= "<div><span>Dear Thinking Hut,</span><br><span>$name has sent you a message via Thinking Hut Website. Please find the details below:</span><br><span></span><br><span></span><br><span>Name: &nbsp; &nbsp; $name</span><br><span>Email: &nbsp; &nbsp; <a href='mailto:$fromEmail' target='_blank'>$fromEmail</a></span><br><span>Phone: &nbsp; &nbsp; $phone</span><br><span>Company: &nbsp; &nbsp; $company</span><br><span>Message: &nbsp; &nbsp;</span><br><span></span><br><span>$message</span><br><span></span><br><span>Regards,</span><br><span>Thinking Hut Website</span></div>";
	$messageBodyAdmin .= '</html></body>';

	$status = mail($email, $subjectAdmin, $messageBodyAdmin, $headers);
	$subjectUser = "Thanks for contacting Thinking Hut";
	$messageBodyUser = '<html><body>';
	$messageBodyUser .= "<div>Dear $name,<br>
	<br>
	Thank you for contacting us. We have received the following details from you:<br>
	<br>
	Name: $name<br>
	Email: <a href='mailto:$fromEmail' target='_blank'>$fromEmail</a><br>
	Phone: $phone<br>
	Company: <br>
	You have sent us the following message:<br>
	<br>
	This is test mail message..<br>
	<br>
	We shall get in touch with you soon.<br>
	<br>
	Regards,<br>
	Team Thinking Hut<br><hr>
	This is an auto-generated email from www.thinkinghut.com as part of your request. Please 'Do Not Reply' to this email. Request you to use Web Interface to respond or email us your query at thinkinghut@thinkinghut.com</div>";
	$messageBodyAdmin .= '</html></body>';
	$headers = 'From: Thinking Hut<no-reply@thinkinghut.com>' . "\r\n" .
	            'X-Mailer: PHP/' . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";  
//$fromEmail = "saiprasad@yopmail.com";	
$statusUser = mail($fromEmail,$subjectUser, $messageBodyUser,$headers);	
	//send mail with all the parameters.	
	if($status)
	{
		echo "Mail Sent Successfully";
		die;
	}
	else
	{
		echo "Mail Sending Error";
		die;
	}
} else { 
	echo  'Captcha Verification Failed'; 
	die;
}


?>
