import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Recommendations.scss'

export default class Recommendations extends Component {
  constructor(props) {
    super(props)
    this.state = {
        recommendations: []
    }
    
    this.handleRec = this.handleRec.bind(this)
  }

  componentDidMount() {
  }

  handleRec(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/rec_get';
    axios.get(url)
      .then(function(response) {
          this.setState({
              recommendations: response.data[2],
          });
      }.bind(this),);
  }

  render() {
    return (
      <div className="Recommendations">
        <div className="centerMeBasic">
          <Form onSubmit={this.handleRec} method="GET">
            <Form.Button className="buttonBasic">Get Recommendations</Form.Button>
            <ul>
              {this.state.recommendations.map(recommendation =>
                <li key={recommendation.id}>
                    {recommendation.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {recommendation.rec}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {recommendation.tier}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </li>
              )}
            </ul>
          </Form>
        </div>
      </div>
    );
  }
}