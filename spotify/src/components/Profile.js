import React, { Component } from 'react';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { }
	}
	render() {
		if(this.props.profile.href === undefined){
			return (
				<div>Loading...</div>
			);
		}else {
			return (
				<div>
					<div className="cover">
						<img src={this.props.profile.images[0].url} alt="artist"/>
						<div className="title">{this.props.profile.name}</div>
						<a className="button" href={"https://open.spotify.com/artist/"+this.props.profile.id}>Open</a>
					</div>
				</div>
			);
		}
		
	}
}

export default Profile;