import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusModal from '../components/StatusModal';
import { supabase } from '../utils/supabase';
import '../styles/registration.css';

const INITIAL = { full_name: '', college: '', unit_number: '', email: '', phone: '' };

export default function RegistrationPage() {
  const [form, setForm]       = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [modal, setModal]     = useState(null); // null | { success, title, message }
  const navigate              = useNavigate();

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('punarva').insert([form]);
      if (error) throw error;
      setModal({
        success: true,
        title:   'Registration Successful!',
        message: 'Thank you for registering for PUNARVA 2K26 NSS State Camp. We look forward to seeing you at EMEA College, Kondotty!',
      });
      setForm(INITIAL);
    } catch (err) {
      setModal({
        success: false,
        title:   'Registration Failed',
        message: err.message || 'An error occurred during registration. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grain" />
      <Header />

      <main className="registration-main" id="top">
        {/* ===== HERO ===== */}
        <section className="registration-hero">
          <div className="section-head">
            <p className="eyebrow eyebrow-dark">State Level Camp</p>
            <h2>Punarva 2K26 Registration</h2>
            <p className="section-sub">NSS State Camp at EMEA College, Kondotty · 24–26 July 2026</p>
          </div>
        </section>

        {/* ===== FORM ===== */}
        <section className="registration-form-section">
          <div className="registration-container">
            <div className="registration-box torn-top">
              <div className="registration-badge" aria-hidden="true">
                <img src="/logo.png" alt="PUNARVA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <form id="registrationForm" onSubmit={handleSubmit}>
                {[
                  { id: 'full_name',    label: 'Full Name',      type: 'text',  placeholder: 'Enter your full name' },
                  { id: 'college',      label: 'College',        type: 'text',  placeholder: 'Enter your college name' },
                  { id: 'unit_number',  label: 'Unit Number',    type: 'text',  placeholder: 'Enter your unit number' },
                  { id: 'email',        label: 'Email Address',  type: 'email', placeholder: 'Enter your email address' },
                  { id: 'phone',        label: 'Phone Number',   type: 'tel',   placeholder: 'Enter 10-digit phone number', pattern: '[0-9]{10}' },
                ].map(f => (
                  <div className="input-group" key={f.id}>
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      pattern={f.pattern}
                      value={form[f.id]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Registering…' : 'Register Now'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {modal && (
        <StatusModal
          isSuccess={modal.success}
          title={modal.title}
          message={modal.message}
          onClose={() => setModal(null)}
          onBack={() => navigate('/')}
        />
      )}
    </>
  );
}
