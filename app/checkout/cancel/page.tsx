import React from 'react';

const CancelPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Order Cancelled</h1>
            <p>Your order has been successfully cancelled.</p>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Return to Home
            </a>
        </div>
    );
};

export default CancelPage;