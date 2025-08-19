// File: /api/contact.js

// This is a Vercel serverless function (API Route).
// It will handle the form submission from your React app.

// You will need to install a library to handle multipart form data.
// For example, you can use 'formidable'.
// To install: npm install formidable

import formidable from 'formidable';

// We need to disable Vercel's body parsing so we can use formidable.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const form = new formidable.IncomingForm();
        
        // Use formidable to parse the form data.
        const [fields, files] = await form.parse(req);

        // Access the form fields and files
        const name = fields.name?.[0];
        const email = fields.email?.[0];
        const message = fields.message?.[0];
        const file = files.file?.[0];

        // Here, you would add the logic to process the form data.
        // For example, you could send an email using a service like Nodemailer,
        // or save the data to a database.
        
        // Example: Logging the data to the console
        console.log('Form Submission Received:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        console.log('File:', file ? file.originalFilename : 'No file uploaded');

        // You must add your own email sending logic here.
        // For example:
        // import nodemailer from 'nodemailer';
        // const transporter = nodemailer.createTransport({...});
        // await transporter.sendMail({...});

        // Respond to the client to indicate success.
        res.status(200).json({ message: 'Form submission received successfully.' });

    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
