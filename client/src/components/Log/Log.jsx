import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Log.scss'

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
        logs: []
    }
    
    this.handleLog = this.handleLog.bind(this)
  }

  componentDidMount() {
  }

  handleLog(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/log_get';
    axios.get(url)
      .then(function(response) {
          this.setState({
              logs: response.data,
          });
      }.bind(this),);
  }

  render() {
    return (
      <div className="Log">
        <div className="centerMeBasic">
          <Form onSubmit={this.handleLog} method="GET">
            <Form.Button className="buttonBasic">Get Log</Form.Button>
            <ul>
              {this.state.logs.map(log =>
                <li key={log.id}>
                    {log.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={"https://www.themoviedb.org/movie/" + log.id} target="_blank">{log.title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {log.updateTime}
                </li>
              )}
            </ul>
          </Form>
        </div>
      </div>
    );
  }
}