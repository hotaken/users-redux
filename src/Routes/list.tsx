import React from 'react';
import { IRouterObject } from '.';
import ListPage from '../components/UsersList/ListPage';
// import HomePage from '../components/HomePage/HomePage';

const index: IRouterObject = {
    name: 'home/index',
    path: '/',
    RenderFn: (): JSX.Element => {
        // return <HomePage />;
        return <ListPage />;
    },
};
export default [index];
