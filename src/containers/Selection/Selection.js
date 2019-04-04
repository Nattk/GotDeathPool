import React, {Component} from 'react';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Classes from './Selection.css';
import Checkbox from '../../components/Checkboxes/Checkbox';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import Button from '../../components/UI/Button/Button';


class Selection extends Component {
    state = {
        characters:null,
        isLoaded: false
    }

    componentWillMount(){
        const localUser = localStorage.getItem('userId');
        const localUserToken = localStorage.getItem('token');
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        console.log(localUserToken);
        axios.get('https://gotpool-83470.firebaseio.com/users/'+localUser+'.json?auth='+localUserToken,{cancelToken: source.token})
        .then((choice)=>{
        if(choice.data){
            source.cancel('Redirection.');
            this.props.history.push('/choices');
        }
        else{
            return axios.get('https://gotpool-83470.firebaseio.com/characters.json?auth='+localUserToken)
        }
        })
        .then(char => {
            this.setState({characters : char.data, isLoaded: true});
        })
        .catch(error=>{
            if(axios.isCancel(error)){
                console.log(error);
            }
            else{
                console.log(error.message);
            }
        })
    }

    checkboxesHandler = (event,index) => {
        let chars = this.state.characters;
        chars[index].status = event.target.value;
        this.setState({characters: chars});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const localUserToken = localStorage.getItem('token');
        const userChoices = this.state.characters;
        const userId = localStorage.getItem('userId');
        const payload = {choices:userChoices,choice:true};
        axios.patch('https://gotpool-83470.firebaseio.com/users/'+userId+'.json?auth='+localUserToken, payload).then( response =>{
            this.props.push.history('/choices');
        }).catch(error=>{
            alert(error.message);  
        })

    }

    render(){
        let selection = null;
        if(this.state.isLoaded && localStorage.getItem('token')){
            selection = (
               <Aux> 
                    {this.state.characters.map((char,index) =>(
                        <Checkbox key={char.id} characterName={char.name} changed={(event)=>this.checkboxesHandler(event,index)}/>
                    ))}
                    <Button name="Submit" btnType="Success" disabled={true} clicked={(event)=>this.submitHandler(event)}/>
                </Aux>
            );
                 
        }
        else{
           selection = <Spinner/>
        }

        return(
            <Aux>
                <section className={Classes.Selection}>
                    <h1>Select the destiny of the characters</h1>
                    <div className={Classes.Titles}>
                        <div>                        
                            <p>Characters</p>
                        </div>
                        <div>
                            <p>Alive</p>
                            <p>Dead</p>
                            <p>Become a wight</p>
                        </div>
                    </div>
                    {selection}
                </section>
            </Aux>
        )
    }
}

export default Selection;