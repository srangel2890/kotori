import nodemailer from "nodemailer";
export default class EmailProvider {
  static transporter;
  
  constructor(notification) {
    const { recipient, subject, message } = notification ?? {};
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
  }

  validateParams(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   if (typeof this.recipient !== 'string' || !emailRegex.test(this.recipient.trim())) {
      throw new TypeError('Recipient is missing or is not a valid email.');
    }
    if (typeof this.subject !== 'string' || this.subject.trim() === '' ||
        typeof this.message !== 'string' || this.message.trim() === ''){
      throw new TypeError('Subject and Message are required.');
    }
  }

  static getTransporter() {
    return this.transporter ??= nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
    });
  }
  async send() {
     try {
      this.validateParams()
      const info = await EmailProvider.getTransporter().sendMail({
        from: `"Kotori" <${process.env.EMAIL_USER}>`, // sender address
        to: this.recipient.trim(),
        subject: this.subject,
        text: this.message,
        html: "<b>"+ this.message + "</b>",
      });
    } catch (err) {
       throw new Error(err.message)
    }
    
    return  {
      status: 'success',
      channel: 'email'
    };

  }
}