import React, { Component } from 'react';
import UserForm from './UserForm';
import Lobby from './Lobby';

class Main extends Component {
    render() {
        return (
            <div>
                <UserForm/>
                <Lobby/>
            </div>
        );
    }
}

export default Main;