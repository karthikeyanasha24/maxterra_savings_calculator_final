const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  console.log('--- Invoking send-report-email function ---');

  try {
    const data = JSON.parse(event.body);
    console.log('Received data:', JSON.stringify(data, null, 2));

    const csv_content = ["\"Field\",\"Value\""].concat(Object.entries(data).map(([key, value]) => `"${key}","${String(value).replace(/"/g, '""')}"`)).join('\n');
    console.log('Generated CSV content.');

    const SMTP_HOST = process.env.SMTP_HOST || "smtp-relay.brevo.com";
    const SMTP_PORT = process.env.SMTP_PORT || 587;
    const SMTP_USER = process.env.SMTP_USER || "8f544b001@smtp-brevo.com";
    const SMTP_PASS = process.env.SMTP_PASS;

    const sender_email = process.env.SENDER_EMAIL || "ashakarthikeyan24@gmail.com";
    const receiver_email = process.env.RECEIVER_EMAIL || "ashakarthikeyan24@gmail.com";

    console.log('Creating nodemailer transporter...');
    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false, 
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
    console.log('Transporter created.');

    const body = `
Dear recipient,

Attached is the CSV file containing all project details:
- What you're replacing: ${data["What are you looking to replace?"]}
- Project size: ${data["Project Size (sq ft)"]} sq ft
- Total savings: $${data["Total Project Savings ($)"]}

Best regards,
MAXTERRA Calculator
`;

    console.log('Sending email...');
    let info = await transporter.sendMail({
        from: `"MAXTERRA Calculator" <${sender_email}>`,
        to: receiver_email,
        subject: "MAXTERRA Project Data - CSV Export",
        text: body,
        attachments: [
            {
                filename: 'maxtterra_project_data.csv',
                content: csv_content,
                contentType: 'text/csv',
            },
        ],
    });

    console.log('Email sent successfully! Message ID:', info.messageId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };

  } catch (error) {
    console.error('--- FUNCTION ERROR in send-report-email ---');
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
