import React,{Component} from 'react';
import axios from 'axios';
import Classes from './SignIn.css';
import Aux from '../../../../HOC/Auxiliary/Auxiliary';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

const API_KEY = "AIzaSyCpnZs1i9Onn7oAqnigHkQCF6cvcU_QtBE";

class SignIn extends Component {
    state = {
        email:null,
        password:null,
        connected: false,
        signUp: false,
    }

    signHandler = () => {
        this.setState(prevState => {
            return {signUp : !prevState.signUp }
        })
    }

    emailHandler = (event) =>{
        this.setState({email : event.target.value});
    }
    passwordHandler = (event) =>{
        this.setState({password : event.target.value});
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
            this.props.history.push("/selection");

        }).catch(error=>{
            alert(error.message);
        });
    }

    render(){
        return(
            <Aux>
                <p>{this.state.signUp? "Sign Up":"Sign In"}</p>
                <form>
                    <Input changed={(event)=>this.emailHandler(event)} type="email" placeholder="Email"/>
                    <Input changed={(event)=>this.passwordHandler(event)} type="password" placeholder="Password"/>
                    <Button name="Submit" clicked={(event)=>this.sendHandler(event)}/>
                </form>
                {this.state.signUp ? <p>Already signed up ? <Button clicked={this.signHandler} name="Sign In"/></p> : <p>Already signed in ? sign up <Button clicked={this.signHandler} name="Sign up"/> </p>}
            </Aux>
        );
    }
}

export default SignIn;