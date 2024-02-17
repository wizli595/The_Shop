import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSendConatctMutation } from '../features/slices/conatctApiSlice';
import { useTranslation } from 'react-i18next';

const ContactUsScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [sendContact, { isLoading }] = useSendConatctMutation();

    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await sendContact(formData).unwrap();
            toast.success(res.message);
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (err) {
            toast.error('Error submitting contact form:', err.message);
        }
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>{t('Your Name')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t("Enter your name")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>{t('Your Email')}</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={t("Enter your email")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="message" className="mb-3">
                    <Form.Label>{t('Your Message')}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder={t("Enter your message")}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {t('Submit')}
                </Button>
            </Form>
        </div>
    );
};

export default ContactUsScreen;
