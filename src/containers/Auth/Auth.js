import React, {Component} from "react";
import Button from "../../components/UI/Button/Button";

class Auth extends Component {
    state = {

    }
    
    render(){
        return(
            <section>
                <h1>GOT Pool</h1>
                <form action='POST'> 
                    <label name="email">Email</label>
                    <input type='email' name='email'/>
                    <label name="password">Password</label>
                    <input type='password' name='password'/>
                    <Button name="Submit" type="submit"/>
                </form>
            </section>                 
        );
    }

}

export default Auth;