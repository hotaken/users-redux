import React from 'react';
import { IRouterObject } from '.';
import AuthPage from '../components/AuthPage/AuthPage';

const index: IRouterObject = {
    name: 'auth/index',
    path: '/auth',
    RenderFn: (): JSX.Element => {
        // return <HomePage />;
        return <AuthPage />;
    },
};

export default [index];
