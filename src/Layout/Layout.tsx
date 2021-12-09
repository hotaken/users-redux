import React from 'react';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './Layout.css';

interface IProps {
    children: JSX.Element;
}

const Layout = (props: IProps): JSX.Element => {
    const { children } = props;

    return (
        <div className="layouti">
            <Header />
            <div className="layouti__content-wrapper">
                <main className="layouti__content">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
