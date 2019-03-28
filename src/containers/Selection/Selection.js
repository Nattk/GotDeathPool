import React, {Component} from 'react';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Classes from './Selection.css';
import Checkbox from '../../components/Checkboxes/Checkbox';
import axios from 'axios';


class Selection extends Component {
    state = {
        characters:{},
        isLoaded: false
    }


    componentWillMount(){
        axios.get('https://gotpool-83470.firebaseio.com/characters.json').then(char =>{
            this.setState({characters : char.data, isLoaded: true});
        }).catch(error=>{

        })
    }

    render(){
        let selection = null;

        if(this.state.isLoaded){
            selection = (
               <Aux> 
                    {this.state.characters.map( char =>(
                        <Checkbox characterName={char.name}/>
                    ))}
                </Aux>
            );
                 
        }
        else{
           selection = <p>Loading...</p>;
        }

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
                    {selection}
                </section>
            </Aux>
        )
    }
}

export default Selection;