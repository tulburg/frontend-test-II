import React, { Component } from 'react';

class TopSongs extends Component {
	constructor(props) {
		super(props);
		this.state = { }
	}
	render() {
		if(this.props.songs.tracks !== undefined) {
			const tracks = this.props.songs.tracks.map((song) =>
			    <li key={song.name}>
			    	{song.name}<span>{Math.round((song.duration_ms/(1000* 60))%60)+":"+Math.round((song.duration_ms / 1000) % 60)}</span>
			    </li>
			);
			return (
				<ul>{tracks}</ul>
			);
		}else {
			return (
				<div>Loading...</div>
			);
		}
		
	}
}

export default TopSongs;