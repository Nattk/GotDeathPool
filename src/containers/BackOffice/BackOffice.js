import React,{Component} from 'react';
import axios from 'axios';
import Classes from './BackOffice.css';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class BackOffice extends Component {
    state = {
        characters:{},
        index : null,
        status: null,
        isLoaded:false
    }
    
    componentDidMount(){
        const localUserToken = localStorage.getItem('token');
        axios.get('https://gotpool-83470.firebaseio.com/characters.json?auth='+localUserToken).then(char =>{
            this.setState({characters: char.data});    
            this.setState({isLoaded: true});
        }).catch(error=>{   
            console.log('error');
        });
    }

    nameChange = event =>{
        this.setState({index:event.target.value});
        console.log(this.state.index);
    }

    statusChange = event =>{
        this.setState({status:event.target.value}) ;
    }


    submitCharacter = event => {
        event.preventDefault();
        const index = this.state.index ;
        const status = this.state.status;
        const localUserToken =  localStorage.getItem('token');
        console.log(status,index);
        const data = {"status":status};
        axios.patch('https://gotpool-83470.firebaseio.com/characters/'+index+'/.json?auth='+localUserToken, data).then(response =>{
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    }

    render(){
        let backInput = null;
        if(this.state.isLoaded){
            backInput = (
                <form>
                <select defaultValue='default' onChange={(event)=>this.nameChange(event)}>
                    <option value='default'>Choose the character </option>
                    {this.state.characters.map((char,index) => (
                        <option key={char.id} value={index}>{char.name}</option>
                    ))}
                </select>
                <select defaultValue='default' onChange={(event)=>this.statusChange(event)}>
                    <option value='default'>Choose his status </option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Wight">Wight</option>
                </select>
                <Button name="Submit" clicked={event=>this.submitCharacter(event)}/>
            </form>

            );
        }
        else{
            backInput = <Spinner/>
        }
        return(
            <Aux>
                <section className={Classes.BackOffice}>
                    {backInput}
                </section>
            </Aux>
        )
    }
}
export default BackOffice;