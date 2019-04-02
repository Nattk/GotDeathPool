import React from 'react';
import { Link } from 'react-router-dom';
import Classes from './Header.css';

const header = () => (
    <header className={Classes.Header}>
        <p>GOT Pool</p>
        <div>
            <Link to="/logout">Logout</Link>
        </div>
    </header>
);


export default header;