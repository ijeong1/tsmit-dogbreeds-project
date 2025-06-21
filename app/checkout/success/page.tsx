'use client';

import React from 'react';

const SuccessPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Purchase Successful!</h1>
            <p>Thank you for your purchase. Your order has been successfully processed.</p>
            <button
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => window.location.href = '/my-page'}
            >
                Return to MyPage
            </button>
        </div>
    );
};

export default SuccessPage;