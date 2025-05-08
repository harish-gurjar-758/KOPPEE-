export const sendEmail = async (to, subject, text) => {
    // Integrate nodemailer, SendGrid, or similar
    console.log(`Email to ${to}: ${subject} - ${text}`);
};

export const sendSMS = async (to, text) => {
    // Integrate with Twilio or other SMS API
    console.log(`SMS to ${to}: ${text}`);
};