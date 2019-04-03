import React,{Component} from 'react';
import axios from 'axios';
import Classes from './SignIn.css';
import { Redirect } from 'react-router-dom';
import Aux from '../../../../HOC/Auxiliary/Auxiliary';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

const API_KEY = "AIzaSyCpnZs1i9Onn7oAqnigHkQCF6cvcU_QtBE";

class SignIn extends Component {
    state = {
        email:null,
        password:null,
        connected: false,
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
        let postAdress =  null;
        const payload = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true        
        }
        if(this.state.signUp){
            postAdress = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+API_KEY;
        }
        else{
            postAdress = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+API_KEY;
        }
        axios.post(postAdress,payload).then(response =>{
            const expirationDate = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
                );
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);
            this.setState({connected: true});
        }).catch(error=>{
            console.log(error.code);
            console.log(this.state);
        });
    }

    render(){
        let signIn = null;
        let valid = null;
        if(this.state.emailValid && this.state.passwordValid){
            valid = true;
        }

        if(!this.state.connected && !localStorage.getItem('token')){
            signIn = (
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
        else {
            signIn = (<Redirect to="/selection"/>);
        }
        return(signIn);
    }
}

export default SignIn;