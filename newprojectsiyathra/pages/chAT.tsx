import { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Form() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        if (newWindow) {
            newWindow.document.body.innerHTML = `
        <h1>Form Data:</h1>
        <p>Name: <span id="name"></span></p>
        <p>Email: <span id="email"></span></p>
        <p>Message: <span id="message"></span></p>
      `;
            newWindow.onbeforeunload = () => {
                setFormSubmitted(false);
            };
            const nameElement = newWindow.document.getElementById('name');
            const emailElement = newWindow.document.getElementById('email');
            const messageElement = newWindow.document.getElementById('message');
            if (nameElement && emailElement && messageElement) {
                nameElement.textContent = formData.name;
                emailElement.textContent = formData.email;
                messageElement.textContent = formData.message;
            }
        }
    };

    const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(event);
        const nameElement = window.opener?.document.getElementById('name');
        const emailElement = window.opener?.document.getElementById('email');
        const messageElement = window.opener?.document.getElementById('message');
        if (nameElement && emailElement && messageElement) {
            nameElement.textContent = formData.name;
            emailElement.textContent = formData.email;
            messageElement.textContent = formData.message;
        }
    };

    return (
        <div>
            {formSubmitted ? (
                <div>
                    <p>Name: <span id="name">{formData.name}</span></p>
                    <p>Email: <span id="email">{formData.email}</span></p>
                    <p>Message: <span id="message">{formData.message}</span></p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleFormUpdate} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleFormUpdate} />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleFormUpdate}></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}
