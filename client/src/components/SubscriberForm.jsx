import React, { useState } from 'react';

const SubscriberForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setEmail('');
        setError(null);
      } else {
        const error = await response.text();
        setError(`Failed to subscribe: ${error}`);
        console.error('Failed to save subscriber:', error);
      }
    } catch (err) {
      setError(`Failed to subscribe: ${err.message}`);
      console.error('Failed to save subscriber:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
    </form>
  );
};

export default SubscriberForm;
