import React, { Component } from 'react';
import './assets/css/styles.css';
import Profile from './components/Profile';
import TopSongs from './components/TopSongs';
import RelatedArtists from './components/RelatedArtists'

const SpotifyConf = {
    client_id: 'ade3f888e1c54b83baf806328bcb0b46',
    secret_key: '94adeba9d8c54f25a60281bea5b4d550',
    access_token: ''
}

function fetchToken(callback) {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': 'Basic '+new Buffer(SpotifyConf.client_id+":"+SpotifyConf.secret_key).toString('base64'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: "grant_type=client_credentials",
        cache: 'default'
    }).then((response) => response.json()).then((responseJson) => {
        SpotifyConf.access_token = responseJson.access_token;
        callback();
    }).catch((error) => {
        console.error(error);
    });
}

function fetchTopSongs(artistId, callback) {
    fetch('https://api.spotify.com/v1/artists/3tVQdUvClmAT7URs9V3rsp/top-tracks?country=US', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': 'Bearer '+SpotifyConf.access_token, 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then((response) => response.json()).then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.error(error);
    });
}

function fetchProfile(artistId, callback) {
    fetch('https://api.spotify.com/v1/artists/3tVQdUvClmAT7URs9V3rsp/', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': 'Bearer '+SpotifyConf.access_token, 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then((response) => response.json()).then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.error(error);
    });
}

function fetchRelatedArtists(artistId, callback) {
    fetch('https://api.spotify.com/v1/artists/3tVQdUvClmAT7URs9V3rsp/related-artists?limit=10', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': 'Bearer '+SpotifyConf.access_token, 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then((response) => response.json()).then((responseJson) => {
        callback(responseJson);
    }).catch((error) => {
        console.log(error);
    });
}

// function load(on) {

// }

class App extends Component { 
    constructor() {
        super();
        this.state = { profile: {}, relatedArtists: [], topSongs: [], artistId: "3tVQdUvClmAT7URs9V3rsp"  }
    }
    componentDidMount() {
        var self = this;
        fetchToken(function(data){
            fetchRelatedArtists(self.state.artistId, function(r){
                self.setState({relatedArtists: r});
            });
            fetchProfile(self.state.artistId, function(r){
                self.setState({profile: r});
            });
            fetchTopSongs(self.state.artistId, function(r){
                self.setState({topSongs: r});
                console.log(self.state);
            });
        });
    }
    render() {
        return (
            <div className="container">
                <div className="left">
                    <Profile profile={this.state.profile} />
                </div>
                <div className="right">
                    <div className="heading">Top Songs</div>
                    <div className="content"><TopSongs songs={this.state.topSongs} /></div>
                    <div className="heading">Related Artists</div>
                    <div><RelatedArtists list={this.state.relatedArtists} /></div>
                </div>
            </div>      
        );
    }
}

export default App;
