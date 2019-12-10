import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Create.scss'

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      orig_title: '',
      new_title: '',
      original_language: '',
      overview: '',
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
  }

  handleCreate(e) {
    e.preventDefault();
    var data = {
      title: this.state.title,
      original_language: this.state.original_language,
      overview: this.state.overview
    }
    var url = 'https://aqueous-retreat-92283.herokuapp.com/movie_create';
    axios.post(url, data)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  handleUpdate(e) {
    e.preventDefault();
    var data = {
      orig_title: this.state.orig_title,
      new_title: this.state.new_title,
      original_language: this.state.original_language,
      overview: this.state.overview
    }
    var url = 'https://aqueous-retreat-92283.herokuapp.com/movie_update';
    axios.post(url, data)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  handleDelete(e) {
    e.preventDefault();
    var data = {
      title: this.state.title,
    }
    var url = 'https://aqueous-retreat-92283.herokuapp.com/movie_delete';
    axios.post(url, data)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="Create">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}

        <div className="centerMe">
          <Form onSubmit={this.handleCreate} method="POST">
            <Form.Input placeholder='Title' name="title" onChange={this.handleChange}></Form.Input>
            <Form.Input placeholder='Language' name="original_language" onChange={this.handleChange}></Form.Input>
            <Form.Input placeholder='Overview' name="overview" onChange={this.handleChange}></Form.Input>
            <Form.Button>Create</Form.Button>
          </Form>

          <Divider horizontal><Icon inverted circular name="video" /></Divider>

          <Form onSubmit={this.handleUpdate} method="POST">
            <Form.Input placeholder='Original title' name="orig_title" onChange={this.handleChange}></Form.Input>
            <Form.Input placeholder='New title' name="new_title" onChange={this.handleChange}></Form.Input>
            <Form.Input placeholder='New language' name="original_language" onChange={this.handleChange}></Form.Input>
            <Form.Input placeholder='New overview' name="overview" onChange={this.handleChange}></Form.Input>
            <Form.Button>Update</Form.Button>
          </Form>

          <Divider horizontal><Icon inverted circular name="video" /></Divider>

          <Form onSubmit={this.handleDelete} method="POST">
            <Form.Input placeholder='Title' name="title" onChange={this.handleChange}></Form.Input>
            <Form.Button>Delete</Form.Button>
          </Form>
        </div>
      </div>
    );
  }
}