import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="header__inner">
                <button className="header__link" onClick={() => navigate('/')}>
                    List
                </button>
                <button className="header__link" onClick={() => navigate('/auth')}>
                    Auth
                </button>
            </div>
        </div>
    );
};

export default Header;
