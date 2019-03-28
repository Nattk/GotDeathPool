import React from 'react';
import Aux from '../../../HOC/Auxiliary/Auxiliary';
import Classes from './Button.css';

const button = (props)=>(
    <Aux>
        <button className={Classes.Button} onClick={props.clicked}>{props.name}</button>
    </Aux>
);

export default button;