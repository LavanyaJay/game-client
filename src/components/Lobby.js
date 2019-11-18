import React, { Component } from 'react';
import { connect } from 'react-redux';
import {url} from '../constants'
import superagent from 'superagent'
import { Link } from 'react-router-dom'

class Lobby extends Component {
    state = {
		rooms: [],
		value: ''
    };
    
    componentDidMount() {
        // Check stream of rooms
    }

    onChange = event => {
		const { value } = event.target;
		this.setState({ value });
	};

	onSubmit = event => {
		//stops the form from reloading the page
		event.preventDefault();
		const { value } = this.state;
		superagent
			.post(`${url}/room`)
			.set('Authorization', `Bearer ${this.props.user.jwt}`)
			.send({ name: value })
			.then(response => console.log(response));
		this.setState({ value: '' });
    };
    
    render() {
        const list = this.state.rooms.map((name, index) => (
			<p key={index}>
				<Link to={`/room/${name}`}>{name}</Link>
			</p>
		));
        return (
            <div>
                This is the lobby. There will be rooms here.
            </div>
        );
    }
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps)(Lobby);
