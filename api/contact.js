import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;
  
  const params = {
    Destination: {
      ToAddresses: ["mikiengida52@gmail.com"] // Replace with your actual email
    },
    Message: {
      Body: {
        Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` }
      },
      Subject: { Data: "New Contact Form Submission" }
    },
    Source: "mikiengida52@gmail.com" // Replace with your verified SES email
  };
  
  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}

