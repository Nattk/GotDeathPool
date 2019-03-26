import React, {Component} from "react";
import Classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Checkbox from '../../components/Checkboxes/Checkbox';

class Auth extends Component {
    state = {

    }

    render(){
        return(
            <Aux>

                <section className={Classes.Auth}>
                    <h1>GOT Pool</h1>
                    <p>Sign in</p>
                    <form method='POST' action=""> 
                        <fieldset>
                            <label for="email">Email</label>
                            <input type='email' name='email'/>
                        </fieldset>
                        <fieldset>
                            <label for="password">Password</label>
                            <input type='password' name='password'/>
                        </fieldset>
                        <Button name="Submit" type="submit"/>
                    </form>
                </section>
                <Checkbox characterName="Jon Snow"/>
            </Aux>
                             
        );
    }

}

export default Auth;