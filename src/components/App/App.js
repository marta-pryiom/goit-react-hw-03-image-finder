import { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { getImages } from '../../Service';
import Container from '../Container';

export default class App extends Component {
  state = {
    images: [],
    searchItem: '',
    query: '',
    page: 1,
  };
  componentDidUpdate(prevState) {
    if (this.state.searchItem !== prevState.searchItem) {
      this.fetchSearchItem().catch(err => console.log(err));
      // .finally();
    }
  }
  fetchSearchItem() {
    const { query, page } = this.state;
    return getImages(query, page).then(images => {
      this.setState(prev => ({
        images: [...prev.images, ...images],
        page: prev.page + 1,
      }));
    });
  }
  handleFormSubmit = query => {
    this.setState({
      page: 1,
      searchItem: query,
      images: [],
    });
  };
  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
      </Container>
    );
  }
}
