const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // 1. Create a temporary testing account (Ethereal)
        // In a real app, you would put your Gmail/SMTP details here!
        let testAccount = await nodemailer.createTestAccount();

        // 2. Create the "Mailman" (Transporter)
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: testAccount.user, 
                pass: testAccount.pass, 
            },
        });

        // 3. Define what the email says
        const mailOptions = {
            from: '"Driving School Admin" <noreply@drivingschool.com>', // Sender
            to: options.email,                                          // Receiver (The Student)
            subject: options.subject,                                   // Subject Line
            text: options.message,                                      // The actual message
        };

        // 4. Send the email!
        const info = await transporter.sendMail(mailOptions);
        
        console.log("✅ Email sent successfully to:", options.email);
        // This generates a special link where you can view the fake email in your browser!
        console.log("🌐 VIEW EMAIL HERE: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendEmail;