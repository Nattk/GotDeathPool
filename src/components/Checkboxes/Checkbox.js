import React from 'react';
import Classes from './Checkbox.css';
import Aux from '../../HOC/Auxiliary/Auxiliary';

const checkbox = (props) =>(
    <Aux>
        <div className={Classes.Checkbox}>
        <p>{props.characterName}</p>
            <fieldset>
                <input type="radio" id={props.characterName} name={props.characterName} value="Alive"/> 
                <input type="radio" id={props.characterName} name={props.characterName} value="Dead"/> 
                <input type="radio" id={props.characterName} name={props.characterName} value="Wight"/> 
            </fieldset>
        </div>
    </Aux>
);

export default checkbox;