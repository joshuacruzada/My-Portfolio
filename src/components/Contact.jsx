import React, { useState } from 'react';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconPaperclip, IconSend, IconPhone } from '@tabler/icons-react';
import emailjs from '@emailjs/browser'; 


export default function App() {
  return (

    <div className="font-sans antialiased min-h-screen">
      <Contact />
    </div>
  );
}

// Contact form component
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        file: null,
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');
    const [copyError, setCopyError] = useState(''); // State to handle on-screen copy errors

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleCopy = (text, type) => {
        setCopyError(''); // Clear any previous error message
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = text;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        try {
            document.execCommand('copy');
            setCopyStatus(type);
            // Hide the 'Copied!' message after a delay
            setTimeout(() => setCopyStatus(''), 2000); 
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Display an on-screen error message instead of an alert
            setCopyError('Could not copy text. Please select and copy manually.');
            setTimeout(() => setCopyError(''), 3000);
        } finally {
            document.body.removeChild(tempTextarea);
        }
    };

    /**
     * Handles the form submission by sending data to EmailJS.
     * Your `setTimeout` has been replaced with the actual EmailJS send function.
     * @param {Event} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('');
        
        // **IMPORTANT:** These IDs are your specific values.
        const serviceId = 'service_4fwazn9'; 
        const templateId = 'template_j8o8y92'; 
        const publicKey = 'Eaa7gEQkmCzf4Prdz'; 

        // EmailJS requires a reference to the form element itself
        const form = e.target;

        try {
            // Send the form data using the emailjs.sendForm method
            const result = await emailjs.sendForm(serviceId, templateId, form, publicKey);
            console.log('SUCCESS!', result.status, result.text);
            setStatus('success');
            // Reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                message: '',
                file: null,
            });
        } catch (error) {
            console.error('FAILED...', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="min-h-screen py-24 px-4 flex items-center justify-center font-inter">
            <style>
                {`
                @keyframes glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px #fff);
                    }
                    50% {
                        filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #fff);
                    }
                }
                .glow-effect {
                    animation: glow 1.5s ease-in-out infinite alternate;
                }
                `}
            </style>
            <div className="container mx-auto max-w-5xl p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                    {/* Left Side: Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-5xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-gray-400 max-w-lg mb-8 mx-auto md:mx-0">
                            I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to send me a message!
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                            {/* Email */}
                            <div
                                className="flex items-center space-x-1 p-2 rounded-full transition-transform duration-300 hover:scale-110 text-amber-500 hover:text-white cursor-pointer"
                                onClick={() => handleCopy('joshua.cruzada.work@gmail.com', 'email')}
                                aria-label="Copy Email"
                            >
                                <IconMail size={24} />
                                <span className="text-sm">joshua.cruzada.work@gmail.com</span>
                                {copyStatus === 'email' && (
                                    <span className="ml-2 text-xs text-white animate-pulse">Copied!</span>
                                )}
                            </div>
                            {/* Phone */}
                            <div
                                className="flex items-center space-x-1 p-2 rounded-full transition-transform duration-300 hover:scale-110 text-amber-500 hover:text-white cursor-pointer"
                                onClick={() => handleCopy('09267794924', 'phone')}
                                aria-label="Copy Phone Number"
                            >
                                <IconPhone size={24} />
                                <span className="text-sm">09267794924</span>
                                {copyStatus === 'phone' && (
                                    <span className="ml-2 text-xs text-white animate-pulse">Copied!</span>
                                )}
                            </div>
                            {/* GitHub */}
                            <a 
                                href="https://github.com/joshuacruzada" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 p-2 rounded-full transition-transform duration-300 hover:scale-110 text-amber-500 hover:text-white"
                                aria-label="GitHub"
                            >
                                <IconBrandGithub size={24} />
                                <span className="text-sm">GitHub</span>
                            </a>
                            {/* LinkedIn */}
                            <a 
                                href="https://www.linkedin.com/in/joshua-cruzada-529539340" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 p-2 rounded-full transition-transform duration-300 hover:scale-110 text-amber-500 hover:text-white"
                                aria-label="LinkedIn"
                            >
                                <IconBrandLinkedin size={24} />
                                <span className="text-sm">LinkedIn</span>
                            </a>
                        </div>
                        {copyError && (
                            <p className="mt-4 text-center text-red-400">{copyError}</p>
                        )}
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="flex-1 w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className="w-full p-3 rounded-lg bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    className="w-full p-3 rounded-lg bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Message"
                                    className="w-full p-3 rounded-lg bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                ></textarea>
                            </div>
                            <div className="pt-4 flex justify-between items-center space-x-4">
                                <label 
                                    htmlFor="file-upload" 
                                    className="relative px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-semibold shadow-md transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-amber-500/50 flex justify-center items-center cursor-pointer"
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        name="file"
                                        onChange={handleChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <IconPaperclip size={20} />
                                </label>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 rounded-full bg-gray-500 text-white font-semibold shadow-md transition-all duration-300 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed glow-effect flex justify-center items-center"
                                >
                                    <IconSend size={20} className="mr-2" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                            {status === 'success' && (
                                <p className="mt-4 text-center text-green-400">
                                    Thank you! Your message has been sent.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="mt-4 text-center text-red-400">
                                    Oops! Something went wrong. Please try again later.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
