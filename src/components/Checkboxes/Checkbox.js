import React from 'react';
import Classes from './Checkbox.css';
import Aux from '../../HOC/Auxiliary/Auxiliary';

const checkbox = (props) =>(
    <Aux>
        <div className={Classes.Checkbox}>
            <p>{props.characterName}</p>
            <input type="radio" id={props.characterName} name={props.characterName} onChange={props.changed} value="Alive"/> 
            <input type="radio" id={props.characterName} name={props.characterName} onChange={props.changed} value="Dead"/> 
            <input type="radio" id={props.characterName} name={props.characterName} onChange={props.changed} value="Wight"/> 
        </div>
    </Aux>
);

export default checkbox;