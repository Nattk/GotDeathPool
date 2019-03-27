import React,{Component} from 'react';
import Classes from './Choices.css';
import Aux from '../../HOC/Auxiliary/Auxiliary';

class Choices extends Component{
    state={

    }
    
    render(){
        return(
            <Aux>
                <p className={Classes.Choices}>Choices</p>
            </Aux>
        );
    }
}

export default Choices;