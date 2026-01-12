require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

const verifyEmail = async () => {
    console.log("--- Starting Email Verification ---");
    console.log(`Host: ${process.env.EMAIL_HOST}`);
    console.log(`Port: ${process.env.EMAIL_PORT}`);
    console.log(`User: ${process.env.EMAIL_USER}`);

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
        console.error("ERROR: Missing environment variables. Please check .env");
        return;
    }

    try {
        await sendEmail({
            email: 'test_recipient@example.com', // In Mailtrap, this will just land in the inbox regardless of address
            subject: 'Verification Test Email',
            message: '<h1>Success!</h1><p>Your SMTP configuration is working correctly.</p>'
        });
        console.log("✅ SUCCESS: Test email sent without error.");
    } catch (error) {
        console.error("❌ FAILURE: Could not send email.");
        console.error("Error Details:", error.message);
        if (error.code === 'EAUTH') console.error("Hint: Check your username and password.");
        if (error.code === 'ESOCKET') console.error("Hint: Check your Host and Port.");
    }
};

verifyEmail();
