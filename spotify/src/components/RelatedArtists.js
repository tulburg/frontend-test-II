import React, { Component } from 'react';


class RelativeArtists extends Component {

	constructor(props) {
		super(props);
		this.state = { }
	}
	render() {
		if(this.props.list.artists !== undefined){
			const artists = this.props.list.artists.map((artist) =>
				<li key={artist.id}>
					{artist.name}
				</li>
			);
			return (
				<ul>{artists}</ul>
			);
		}else {
			return (
				<div>Loading...</div>
			);
		}
	}
}

export default RelativeArtists;