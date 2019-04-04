import React,{Component} from 'react';
import Classes from './Choices.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import Aux from '../../HOC/Auxiliary/Auxiliary';

class Choices extends Component {
    state = {
        characters:{},
        choices:{},
        isLoaded : false
    }
    componentWillMount(){
        const id = localStorage.getItem('userId');
        const localUserToken =  localStorage.getItem('token');
        axios.get('https://gotpool-83470.firebaseio.com/users/'+id+'/choices.json?auth='+localUserToken)
        .then(choices =>{
            this.setState({choices : choices.data});
            return axios.get('https://gotpool-83470.firebaseio.com/characters.json?auth='+localUserToken)
        })
        .then((characters)=>{
            this.setState({characters : characters.data, isLoaded: true});
    
        }).catch(error=>{
            alert(error.message);
        })
    }

    updatePoints = () =>{
        let result = 0;
        this.state.characters.forEach((char, index) => {
            if(char.status === this.state.choices[index].status){
                result = result+3;
            }
        });
        return result;
    }

    render(){
        let choices = null;
        let points = null;
        if(this.state.isLoaded){
            choices = (
                <div >
                    {this.state.choices.map((choices,index) =>(
                        <div className={Classes.Characters} key={choices.id}>
                            <p>{choices.name}</p>
                            <p>{choices.status}</p>
                            <p>{this.state.characters[index].status}</p>
                        </div>
                    ))}
                </div>
            )
           points = this.updatePoints();
        }
        else{
            choices = (<Spinner/>)
        }
        return(
            <Aux>
                <section className={Classes.Choices}>
                    <h1>GOT your predictions</h1>
                    <p>For each good answer you get 3 points</p>
                    <div className={Classes.Titles}>
                        <p>Characters</p>
                        <p>Predictions</p>
                        <p>Status</p>
                    </div>
                    {choices}
                    <div className={Classes.Titles}>
                       <p>Points</p>
                       <p>{points}</p>
                    </div>
                </section>
            </Aux>
        );
    }
}

export default Choices;