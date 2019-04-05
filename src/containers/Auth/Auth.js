import React,{Component} from 'react';
import Classes from './Auth.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {
    state = {
        email:null,
        password:null,
        emailValid: false,
        passwordValid: false,
        signUp: false
    }

    signHandler = () => {
        this.setState(prevState => {
            return {signUp : !prevState.signUp }
        })
    }

    checkValidity = (value, type) => {
        if(value.trim() !== "" && type === 'email' && new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)){
            return true;
        }
        else if(value.trim() !== "" && type === "password" && value.length >= 6){
            return true;
        }
        return false
    };

    emailHandler = (event) =>{
        if(event.target.type === 'email'){
            this.setState({email : event.target.value});            
        }
        if(this.checkValidity(event.target.value,event.target.type)){
            this.setState({emailValid: true});
        }
        else{
            this.setState({emailValid: false});
        }
    }

    passwordHandler = (event) =>{
        if(event.target.type === 'password') {
            this.setState({password : event.target.value});
        } 
        if(this.checkValidity(event.target.value,event.target.type)){
            this.setState({passwordValid: true});
        }
        else{
            this.setState({passwordValid: false});
        }   
    }
    
    sendHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(
            this.state.email,
            this.state.password,
            this.state.signUp
          );
    }

    render(){
        let valid = null;
        if(this.state.emailValid && this.state.passwordValid){
            valid = true;
        }
        return (
            <Aux>
                <section className={Classes.SignIn}>
                    <p>{this.state.signUp? "Sign Up":"Sign In"}</p>
                    <form className={Classes.Form}>
                        <Input changed={(event)=>this.emailHandler(event)} type="email" placeholder="Email"/>
                        <Input changed={(event)=>this.passwordHandler(event)} type="password" placeholder="Password"/>
                        <Button name="Submit" btnType="Success" disabled={valid} clicked={(event)=>this.sendHandler(event)}/>
                    </form>
                    {this.state.signUp ? <p>Already signed up ? Sign in <Button clicked={this.signHandler} disabled={true} name="Sign In"/></p> : <p>Already signed in ? sign up <Button clicked={this.signHandler} disabled={true} name="Sign up"/> </p>}
                </section>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null    
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);