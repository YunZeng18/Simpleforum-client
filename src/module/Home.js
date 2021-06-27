import Axios from 'axios';
import React, { Component } from 'react';

export default class Home extends Component {
    state = {
        canadaNews: null
    }
    componentDidMount() {
        Axios.get('http://newsapi.org/v2/top-headlines?country=ca&apiKey=af3f764a44e94703bb8db3793b3b7caa')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <main className="home">
                <h1>Welcome to Not My Final Forum</h1>

                <p>Bookmark things using your browser to come back later.</p>


            </main>
        );
    }
}


