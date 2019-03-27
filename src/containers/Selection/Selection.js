import React, {Component} from 'react';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Classes from './Selection.css';
import Checkbox from '../../components/Checkboxes/Checkbox';


class Selection extends Component {
    state = {
        characters:[{name:'Jon Snow'},{name:'Daenerys'},{name:'Tyrion'}]
    }
    render(){
        return(
            <Aux>
                <section className={Classes.Selection}>
                    <h1>GOT</h1>
                    <div className={Classes.Titles}>
                        <p>Characters</p>
                        <p>Alive</p>
                        <p>Dead</p>
                        <p>Become a wight</p>
                    </div>
                    {this.state.characters.map( char =>(
                        <Checkbox characterName={char.name}/>
                    ))}
                </section>
            </Aux>
        )
    }
}

export default Selection;