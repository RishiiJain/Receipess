<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Email parameters
    $to = "b211202@skit.ac.in"; // Replace with the email address of the owner
    $subject = "New Contact Form Submission";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" . // Use the submitted email here
               "X-Mailer: PHP/" . phpversion();
    
    // Email body
    $body = "You have received a new message from $name ($email).\n\n";
    $body .= "Message:\n$message\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
