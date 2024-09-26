import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

function TokenCounter() {
    const { user } = useUser();
    const [tokens, setTokens] = useState(0); // Start with 0 tokens

    const getBalance = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/users/${user.id}/tokens-balance`, {
                method: 'GET',
            });

            const data = await response.json();
            return parseInt(data.balance, 10);

        } catch (error) {
            console.error('Error fetching balance:', error);
            return 0;
        }
    };

    const addTokens = async (amount) => {
        try {
            await fetch(`http://localhost:5002/api/users/${user.id}/add-tokens?amount=${amount}`, {
                method: 'PUT',
            });
        } catch (error) {
            console.error('Error updating tokens:', error);
        }
    };

    const incrementTokens = async () => {
        try {
            await addTokens(1);
            const newBalance = await getBalance();
            setTokens(newBalance);
        } catch (error) {
            console.error('Error updating tokens:', error);
        }
    };

    useEffect(() => {
        const fetchInitialBalance = async () => {
            const initialBalance = await getBalance();
            setTokens(initialBalance);
        };
        fetchInitialBalance().then();
    });

    return (
        <div className='flex border-counter'>
            <div className='bg-gray-800 text-white h-[40px] flex items-center w-[150px] px-2 rounded'>
                <p>{tokens}</p>
            </div>

            <button
                onClick={incrementTokens}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
            >
                Додати
            </button>
        </div>
    );
}

export default TokenCounter;
