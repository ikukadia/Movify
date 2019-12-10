import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Basic.scss'

export default class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      languages: [],
      genres: [],
      dict: {
        28: "Action",
        12:"Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
      }
    }

    this.handleBasic1 = this.handleBasic1.bind(this)
    this.handleBasic2 = this.handleBasic2.bind(this)
  }

  componentDidMount() {
  }

  handleBasic1(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic1';
    axios.get(url)
      .then(function(response) {
          this.setState({
              languages: response.data,
          });
      }.bind(this),);
  }

  handleBasic2(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic2';
    axios.get(url)
    .then(function(response) {
        this.setState({
            genres: response.data,
        });
    }.bind(this),);
  }

  render() {
    return (
      <div className="Create">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}

        <div className="centerMeBasic">
          <Form onSubmit={this.handleBasic1} method="GET">
            <h2 className="basicQuery">Languages with the most movies nominated for an Oscar for Best Motion Picture</h2>
            <Form.Button className="buttonBasic">Search</Form.Button>
            <ul>
              {this.state.languages.map(language =>
                <li key={language.id}>{language.original_language}</li>
              )}
            </ul>
          </Form>

          {/* <Divider horizontal><Icon inverted circular name="video" /></Divider> */}

          <Form onSubmit={this.handleBasic2} method="GET">
            <h2 className="basicQuery">Genres with the most movies that won an Oscar for Best Motion Picture or Outstanding Picture</h2>
            <Form.Button className="buttonBasic">Search</Form.Button>
            <ul>
              {this.state.genres.map(genre =>
                <li key={genre.id}>{this.state.dict[genre.genre_ids0]}</li>
              )}
            </ul>
          </Form>
        </div>
      </div>
    );
  }
}