import React from 'react';

const Header = () => {
    return (
        <header className="header w-screen flex justify-between items-center p-4 bg-blue-500 text-white">
            <h1>DataStorm Product</h1>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;