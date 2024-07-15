'use client'

import React, { useState, useEffect } from 'react';

const TextChanger = () => {
    const texts = [
        "KAYF: Your Daily Dose of Fun!",
        "Chat with KAYF - Feel the Vibe!",
        "KAYF: Know All Your Friends",
        "Join KAYF and Share the Joy!",
        "KAYF: Connect, Share, Enjoy!",
        "Experience the Buzz with KAYF!",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % texts.length);
        }, 7000);
        return () => clearInterval(intervalId);
    }, [currentIndex, texts]);

    return (
        <div>
            <h2
                key={currentIndex} // Add a unique key that changes when the text changes
                className={`max-w-[300px] rounded text-center text-base font-500 animate`}
            >
                {texts[currentIndex]}
            </h2>
            <style jsx>{`
        .animate {
          animation: slideIn 1s forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default TextChanger;