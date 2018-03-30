import React, { Component } from 'react';

function imgOpt(img){var p = img.parentNode;console.log(img);var iH = img.offsetHeight, iW=img.offsetWidth, pH = p.offsetHeight, pW=p.offsetWidth, mH, mW; if(iW>=iH){if((iW/iH)>(pW/pH)){mH = pH;mW = (mH/iH) * iW;}else{mW = pW;mH = (mW/iW) * iH;}}else{if((iH/iW)>(pH/pW)){mW = pW;mH = (mW/iW) * iH;}else{mH = pH;mW = (mH/iH) * iW;}};img.style.height = mH+'px';img.style.width = mW+'px';img.style.marginTop = ((pH-mH)/2!==0) ? (pH-mH)/2+'px' : 0+'px';img.style.marginLeft = ((pW-mW)/2!==0) ? (pW-mW)/2+'px' : 0+'px';}

class RelativeArtists extends Component {

	constructor(props) {
		super(props);
		this.state = { }
	}

	render() {
		if(this.props.list.artists !== undefined){
			const artists = this.props.list.artists.map((artist) =>
				<li key={artist.id}>
					<div className="photo"><img src={artist.images[1].url} alt="artists" /></div>
					<div className="name">{artist.name}</div>
				</li>
			);
			return (
				<ul className="artists">{artists}</ul>
			);
		}else {
			return (
				<div>Loading...</div>
			);
		}
	}
}

export default RelativeArtists;