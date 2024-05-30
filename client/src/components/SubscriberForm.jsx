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
      const response = await fetch('/api/subscribe', {
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
        const error = await response.json();
        setError(`Failed to subscribe: ${error.message}`);
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
    <form className= 'p-2' onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='p-2 pr-8 rounded-sm' 
      />
      <button className="bg-blue-700 p-2 rounded-sm  text-white text-center hover:opacity-75"type="submit" disabled={loading}>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <div className="error text-red-500">{error}</div>}
      {message && <div className="success text-green-500">{message}</div>}
    </form>
  );
};

export default SubscriberForm;
