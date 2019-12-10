import React, { Component } from 'react'
import axios from 'axios'
import { render } from 'react-dom';
import { Dropdown, Form, Divider, Button, Input, Image, Label, Card, Icon } from 'semantic-ui-react'

import styles from './Home.scss'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      id: null,
      poster: null,
      resultsList: [],
      ascending: false,
      currentSort: null,
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.selectOrder = this.selectOrder.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.ratingSort = this.ratingSort.bind(this);
    this.popularitySort = this.popularitySort.bind(this);
    this.voteSort = this.voteSort.bind(this);
    this.pushToDetail = this.pushToDetail.bind(this);
    this.ascendingSort = this.ascendingSort.bind(this);
    this.descendingSort = this.descendingSort.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  // loadGallery() {
  //   var url = "https://aqueous-retreat-92283.herokuapp.com/movies/"
  //   axios.get(url)
  //     .then(function(response) {
  //         this.setState({
  //             resultsList: response.data,
  //         });
  //     }.bind(this),);
  // }

  // componentDidMount() {
  //   this.loadGallery();
  // }

  //MOVIE SEARCH

  handleChange(e) {
    var url = "https://aqueous-retreat-92283.herokuapp.com/movie/" + e.target.value
    axios.get(url)
      .then(function (response) {
        this.setState(function () {
          return {
            resultsList: response.data,
          }
        });
      }.bind(this));
  }

  //FILTERING

  selectOrder(e, data) {
    if (data.value == 'true') {
      this.setState(function () {
        return {
          ascending: true,
        }
      }, () => (this.ascendingSort.call(this)));
    }
    else {
      this.setState(function () {
        return {
          ascending: false,
        }
      }, () => (this.descendingSort.call(this)));
    }
  }

  filterResults(e, data) {
    this.setState(function () {
      return {
        currentSort: data.value,
      }
    }, () => (this.callSort.call(this)));
  }

  callSort() {
    if (this.state.currentSort == 'popularity') {
      this.popularitySort.call(this);
    }
    else if (this.state.currentSort == 'vote_count') {
      this.voteSort.call(this);
    } else if (this.state.currentSort == 'vote_average') {
      this.ratingSort.call(this);
    }
  }

  ratingSort() {
    let releaselist = this.state.resultsList;
    if (this.state.ascending == 'false') {
      releaselist.sort(function (one, two) {
        return one.vote_average - two.vote_average;
      })
    }
    else {
      releaselist.sort(function (one, two) {
        return two.vote_average - one.vote_average;
      })
    }
    this.setState(function () {
      return {
        resultsList: releaselist,
      }
    });
  }

  popularitySort() {
    let popularlist = this.state.resultsList;
    if (this.state.ascending == 'false') {
      popularlist.sort(function (one, two) {
        return one.popularity - two.popularity;
      })
    }
    else {
      popularlist.sort(function (one, two) {
        return two.popularity - one.popularity;
      })
    }
    this.setState(function () {
      return {
        resultsList: popularlist,
      }
    });
  }

  voteSort() {
    let votelist = this.state.resultsList;
    if (this.state.ascending == 'false') {
      votelist.sort(function (one, two) {
        return one.vote_count - two.vote_count;
      })
    }
    else {
      votelist.sort(function (one, two) {
        return two.vote_count - one.vote_count;
      })
    }
    this.setState(function () {
      return {
        resultsList: votelist,
      }
    });
  }

  ascendingSort() {
    let list = this.state.resultsList;
    if (this.state.currentSort == 'popularity') {
      list.sort(function (one, two) {
        return one.popularity - two.popularity;
      })
    }
    else {
      list.sort(function (one, two) {
        return one.vote_count - two.vote_count;
      })
    }
    this.setState(function () {
      return {
        resultsList: list,
      }
    });
  }

  descendingSort() {
    let list = this.state.resultsList;
    if (this.state.currentSort == 'vote_count') {
      list.sort(function (one, two) {
        return two.vote_count - one.vote_count;
      })
    }
    else {
      list.sort(function (one, two) {
        return two.vote_count - one.vote_count;
      })
    }
    this.setState(function () {
      return {
        resultsList: list,
      }
    });
  }

  //GO TO DETAIL VIEW

  pushToDetail(index) {
    this.props.history.push({
      pathname: '/detail',
      id: index,
      movies: this.state.resultsList,
    });
  }

  handleLogin(e) {
    this.setState({ username: e.target.value });
  }

  handleLike(e, data) {
    e.preventDefault();
      var toSend = {
        username: this.state.username,
        title: data.value.title,
        id: data.value.id,
        genre: data.value.genre_ids0
    }
    var url = 'https://aqueous-retreat-92283.herokuapp.com/user_like';
    axios.post(url, toSend)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  handleDislike(e, data) {
    e.preventDefault();
      var toSend = {
        username: this.state.username,
        id: data.value.id,
    }
    var url = 'https://aqueous-retreat-92283.herokuapp.com/user_dislike';
    axios.post(url, toSend)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  render() {
    const { currentSort } = this.state
    const { ascending } = this.state
    const { match, location, history } = this.props
    const options = [
      { key: 'popularity', text: 'popularity', value: 'popularity' },
      { key: 'vote_average', text: 'rating', value: 'vote_average' },
      { key: 'vote_count', text: 'number of votes', value: 'vote_count' },
    ]
    return (
      <div className="Home">
        <div className="searchBar">
          <Form>
            <Form.Field>
              <input type='text' onChange={e => this.handleLogin(e)} placeholder='Username' />
              <input type='text' onChange={e => this.handleChange(e)} placeholder='Movie' />
            </Form.Field>
          </Form>
          <Dropdown placeholder='Filter by' fluid search selection options={options} selection value={currentSort} onChange={this.filterResults.bind(this)} />
          <Button.Group fluid>
            <Button className="mybutton" value="false" onClick={this.selectOrder.bind(this)}>descending</Button>
            <Button className="mybutton" value="true" onClick={this.selectOrder.bind(this)}>ascending</Button>
          </Button.Group>
        </div>
        <Card.Group itemsPerRow={5} className="movies"> {
          this.state.resultsList.map((movie, index) => {
            return (
              <Card className="hoverme" key={index + "item"}>
                <Image className="centerMe" onClick={function () { this.pushToDetail(index) }.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "image"} />
                <Card.Content key={index + "title"}>
                  {movie.title}
                </Card.Content>
                <Card.Content extra key={index + "like"}>
                  <Button className="likebutton" value={movie} onClick={this.handleLike.bind(this)}>
                    <Icon name='thumbs up'/>
                  </Button>
                  <Button className="likebutton" value={movie} onClick={this.handleDislike.bind(this)}>
                    <Icon name='thumbs down'/>
                  </Button>
                </Card.Content>
                <Card.Content extra key={index + "rating"}>
                  Rating: {movie.vote_average}
                </Card.Content>
                <Card.Content extra key={index + "votes"}>
                  Votes: {movie.vote_count}
                </Card.Content>
              </Card>
            )
          })
        }
        </Card.Group>
      </div>
    )
  }
}

render(<Home />, document.getElementById('root'))

export default Home
