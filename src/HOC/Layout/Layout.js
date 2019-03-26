import React,{Component} from 'react';
import Classes from './Layout.css'

class Layout extends Component {
    render(){
        return(
            <div className={Classes.Layout}>
                {this.props.children} 
            </div>
        );
    }
}

export default Layout;