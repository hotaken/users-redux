import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import ExpRoutes from './Routes/index';

function App(): JSX.Element {
    return (
        <div className="App">
            <Layout>{ExpRoutes()}</Layout>
        </div>
    );
}

export default App;
