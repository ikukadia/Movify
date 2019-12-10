import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Trends.scss'

export default class Trends extends Component {
  constructor(props) {
    super(props)
    this.state = {
        trends: []
    }
    
    this.handleRec = this.handleRec.bind(this)
  }

  componentDidMount() {
  }

  handleRec(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/trend_get';
    axios.get(url)
      .then(function(response) {
          this.setState({
              trends: response.data,
          });
      }.bind(this),);
  }

  render() {
    return (
      <div className="Trends">
        <div className="centerMeBasic">
          <Form onSubmit={this.handleRec} method="GET">
            <Form.Button className="buttonBasic">Get Trends</Form.Button>
            <ul>
              {this.state.trends.map(trend =>
                <li key={trend._id}>
                    {trend._id}: {trend.keywordPair}
                </li>
              )}
            </ul>
          </Form>
        </div>
      </div>
    );
  }
}