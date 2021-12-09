import React from 'react';
import { Routes, Route } from 'react-router-dom';

import listRouter from './list';
import authRouter from './auth';

export interface IRouterObject {
    name: string;
    path: string;
    RenderFn: () => JSX.Element;
}

export const allRoutes = [...listRouter, ...authRouter];

const ExpRoutes = (): JSX.Element => {
    return (
        <Routes>
            {/* ALL ROUTES */}
            {allRoutes.map(({ name, path, RenderFn }) => (
                <Route path={path} key={name} element={<RenderFn />} />
            ))}

            {/* NOT FOUND */}
            <Route element={<h1>Not Found</h1>} />
        </Routes>
    );
};

export default ExpRoutes;
