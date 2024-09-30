import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

function TokenCounter() {
    const { user } = useUser();
    const [tokens, setTokens] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialBalance = async () => {
            if (user) {
                const response = await fetch(`/api/users/${user.id}`);
                const data = await response.json();
                if (response.ok) {
                    setTokens(data.tokenBalance);
                } else {
                    setError(data.error);
                }
            }
        };
        fetchInitialBalance();
    }, [user]);

    // Function to increment tokens
    const incrementTokens = async (amount) => {
        if (user) {
            try {
                const response = await fetch(`/api/users/${user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount }),
                });
                const data = await response.json();
                if (response.ok) {
                    setTokens((prevTokens) => prevTokens + amount); // Update local token count
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className='flex border-counter'>
            <div className='bg-gray-800 text-white h-[40px] flex items-center w-[150px] px-2 rounded'>
                <p>{tokens}</p>
            </div>

            <button
                onClick={() => incrementTokens(1)} // Add one token
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
            >
                Додати
            </button>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default TokenCounter;
