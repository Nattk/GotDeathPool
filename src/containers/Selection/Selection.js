import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Classes from './Selection.css';
import Checkbox from '../../components/Checkboxes/Checkbox';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';


class Selection extends Component {

    componentDidMount(){
        this.props.onLoadCharacter(this.props.userId, this.props.token);
        console.log(this.props.characters);

        // const localUser = localStorage.getItem('userId');
        // const localUserToken = localStorage.getItem('token');
        // const CancelToken = axios.CancelToken;
        // const source = CancelToken.source();
        // console.log(localUserToken);
        // axios.get('https://gotpool-83470.firebaseio.com/users/'+localUser+'.json?auth='+localUserToken,{cancelToken: source.token})
        // .then((choice)=>{
        // if(choice.data){
        //     source.cancel('Redirection.');
        //     this.props.history.push('/choices');
        // }
        // else{
        //     return axios.get('https://gotpool-83470.firebaseio.com/characters.json?auth='+localUserToken)
        // }
        // })
        // .then(char => {
        //     this.setState({characters : char.data, isLoaded: true});
        // })
        // .catch(error=>{
        //     if(axios.isCancel(error)){
        //         console.log(error);
        //     }
        //     else{
        //         console.log(error.message);
        //     }
        // })

    }

    checkboxesHandler = (event,index) => {
     this.props.onChangeCharacterStatus(index, event.target.value);
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onPatchUserChoices(this.props.characters, this.props.userId, this.props.token);

        // const localUserToken = localStorage.getItem('token');
        // const userChoices = this.state.characters;
        // const userId = localStorage.getItem('userId');
        // const payload = {choices:userChoices,choice:true};
        // axios.patch('https://gotpool-83470.firebaseio.com/users/'+userId+'.json?auth='+localUserToken, payload).then( response =>{
        //     this.props.push.history('/choices');
        // }).catch(error=>{
        //     alert(error.message);  
        // })

    }

    render(){
        let selection = null;

        if(!this.props.isLoaded){
            console.log('la', this.props.isLoaded);
            selection = (
               <Aux> 
                    {this.props.characters.map((char,index) =>(
                        <Checkbox key={char.id} characterName={char.name} changed={(event)=>this.checkboxesHandler(event,index)}/>
                    ))}
                    <Button name="Submit" btnType="Success" disabled={true} clicked={(event)=>this.submitHandler(event)}/>
                </Aux>
            );
                 
        }
        else{
           selection = <Spinner/>
        }

        if(this.props.postSuccess){
            selection = <Redirect to="/choices"/>
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

const mapStateToProps = state => {
    return{
        characters: state.selection.characters,
        isLoaded: state.selection.loading,
        error: state.selection.error,
        token: state.auth.token,
        userId: state.auth.userId,
        postSuccess: state.selection.postSuccess
    }
}

const mapDispacthToProps = dispatch => {
    return{
        onLoadCharacter : (userId, token) => dispatch(actionCreators.getCharacters(userId, token)),
        onChangeCharacterStatus : (index, status) => dispatch(actionCreators.updateCharacterStatus(index, status)),
        onPatchUserChoices : (userChoices, userId, token) => dispatch(actionCreators.postUserChoice(userChoices, userId, token))
    }

}

export default withRouter(connect(mapStateToProps, mapDispacthToProps)(Selection));