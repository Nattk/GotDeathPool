import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Classes from './Header.css';

const header = (props) => {
    if(props.location.pathname === ("/")){
        return(
        <header className={Classes.Header}>
            <div>GOT Pool</div>
        </header>
        );

    }
    else{
        return(
            <header className={Classes.Header}>
                <div>GOT Pool</div>
                <div>
                    <Link to="/logout">Logout</Link>
                </div>
            </header>
            );
    }
}


export default withRouter(header);