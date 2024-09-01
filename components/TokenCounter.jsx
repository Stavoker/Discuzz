import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

function TokenCounter() {
    const { user } = useUser();
    const [tokens, setTokens] = useState(0);

    const incrementTokens = async () => {
        const newTokenCount = tokens + 1;
        setTokens(newTokenCount);

        // Оновлення токенів у базі даних
        await fetch(`/api/users/${user.emailAddress}/tokens`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokens: newTokenCount })
        });
    };

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
