import React,{Component} from 'react';
import axios from 'axios';
import Classes from './BackOffice.css';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionsCreators from '../../store/actions/index';

class BackOffice extends Component {
        state = {
            index:null,
            status:null,
            disabled:false,
        }
    
    componentDidMount(){
        this.props.onLoadCharacters(this.props.token);
    }

    nameChange = event =>{
        this.setState({index:event.target.value},()=>{
            this.disabledButton();
        });
    }

    statusChange = event =>{
        this.setState({status:event.target.value}, ()=>{
            this.disabledButton();
        });
    }
    
    disabledButton = () =>{
        if(this.state.index !== null && this.state.index !=='default' && this.state.status !== null && this.state.status !== 'default'){
            this.setState({disabled: true})
        }       
    }

    submitCharacter = event => {
         event.preventDefault();
        this.props.onChangeStatus(this.state.index,this.state.status,this.props.token);
    }

    render(){
        let backInput = null;
        if(!this.props.isLoaded){
            backInput = (
                <form>
                <select defaultValue='default' onChange={(event)=>this.nameChange(event)}>
                    <option value='default'>Choose the character </option>
                    {this.props.characters.map((char,index) => (
                        <option key={char.id} value={index}>{char.name}</option>
                    ))}
                </select>
                <select defaultValue='default' onChange={(event)=>this.statusChange(event)}>
                    <option value='default'>Choose his status </option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Wight">Wight</option>
                </select>
                <Button name="Submit" disabled={this.state.disabled}  clicked={event=>this.submitCharacter(event)}/>
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

const mapStateToProps = state =>{
    return{
        characters: state.back.characters,
        isLoaded: state.back.loading,
        token: state.auth.token
    }
}

const mapDispacthToProps = dispatch =>{
    return {
        onLoadCharacters : (token) => dispatch(actionsCreators.getBackCharacters(token)),
        onChangeStatus : (index,status,token) => dispatch(actionsCreators.patchCharacterStatus(index,status,token)) 
    }
}
export default withRouter(connect(mapStateToProps, mapDispacthToProps)(BackOffice));