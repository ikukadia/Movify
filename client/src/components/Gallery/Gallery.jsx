import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Button, Image, Card } from 'semantic-ui-react'

import styles from './Gallery.scss'

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      name: null,
      resultsList: [],
      id: null,
      page: '1',
      genre: '',
    }
    this.loadGallery = this.loadGallery.bind(this);
    this.pushToDetail = this.pushToDetail.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
  }

  loadGallery() {
    var url = "https://aqueous-retreat-92283.herokuapp.com/movies/"
    axios.get(url)
      .then(function(response) {
          this.setState({
              resultsList: response.data,
          });
      }.bind(this),);
  }

  filterGenre(e) {
    console.log(e.target.id)
    var url = 'https://aqueous-retreat-92283.herokuapp.com/gallery/' + e.target.id
    axios.get(url)
      .then(function(response) {
          this.setState({
              resultsList: response.data,
          });
      }.bind(this),);
  }

  pushToDetail(index) {
    this.props.history.push ({
      pathname: '/detail',
      id: index,
      movies: this.state.resultsList
    });
  }

  componentDidMount() {
    this.loadGallery();
  }

  render() {
    return(
      <div className="Gallery">
        <Divider hidden/><Divider hidden/>
        <Button className="mybutton" id={this.props.genre} onClick={this.loadGallery}>All</Button>
        <Button id="28" className="mybutton" onClick={this.filterGenre}>Action</Button>
        <Button id="12" className="mybutton" onClick={this.filterGenre}>Adventure</Button>
        <Button id="16" className="mybutton" onClick={this.filterGenre}>Animation</Button>
        <Button id="35" className="mybutton" onClick={this.filterGenre}>Comedy</Button>
        <Button id="80" className="mybutton" onClick={this.filterGenre}>Crime</Button>
        <Button id="99" className="mybutton" onClick={this.filterGenre}>Documentary</Button>
        <Button id="18" className="mybutton" onClick={this.filterGenre}>Drama</Button>
        <Button id="14" className="mybutton" onClick={this.filterGenre}>Fantasy</Button>
        <Button id="36" className="mybutton" onClick={this.filterGenre}>History</Button>
        <Button id="27" className="mybutton" onClick={this.filterGenre}>Horror</Button>
        <Button id="10402" className="mybutton" onClick={this.filterGenre}>Music</Button>
        <Button id="9648" className="mybutton" onClick={this.filterGenre}>Mystery</Button>
        <Button id="10749" className="mybutton" onClick={this.filterGenre}>Romance</Button>
        <Button id="878" className="mybutton" onClick={this.filterGenre}>Sci-Fi</Button>
        <Button id="53" className="mybutton" onClick={this.filterGenre}>Thriller</Button>
        <Button id="10752" className="mybutton" onClick={this.filterGenre}>War</Button>
        <Button id="37" className="mybutton" onClick={this.filterGenre}>Western</Button>
        <Divider hidden/>
        <Card.Group className="moviesgallery" itemsPerRow={5}> {
          this.state.resultsList.map((movie, index) => {
            return (
              <Card className="hover" key={index+"card"}>
              <Image onClick={function(){this.pushToDetail(index)}.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "poster"} />
              </Card>
            )
          })
        }
        </Card.Group>
        <Divider hidden/>
        </div>
    )
  }
}

export default Gallery
