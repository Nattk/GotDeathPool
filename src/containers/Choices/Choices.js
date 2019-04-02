import React,{Component} from 'react';
import Classes from './Choices.css';
import axios from 'axios';
import Aux from '../../HOC/Auxiliary/Auxiliary';

class Choices extends Component {
    state = {
        choices:{},
        isLoaded : false
    }
    componentWillMount(){
        const id = localStorage.getItem('userId');
        axios.get('https://gotpool-83470.firebaseio.com/users/'+id+'/choices.json').then(choices =>{
            this.setState({choices : choices.data, isLoaded:true});
        }).catch(error=>{
            alert(error.message);
        })
    }

    render(){
        let choices = null;
        if(this.state.isLoaded){
            choices = (
                <div>
                    {this.state.choices.map(choices =>(
                        <p key={choices.id}>{choices.name} : {choices.status}</p>
                    ))}
                </div>
            )
        }
        else{
            choices = (<p>Loading...</p>)
        }
        return(
            <Aux>
                <section className={Classes.Choices}>
                    <h1>GOT your predictions</h1>
                    <div className={Classes.Titles}>
                        <p>Characters</p>
                        <p>Predictions</p>
                    </div>
                    {choices}
                </section>
            </Aux>
        );
    }
}

export default Choices;