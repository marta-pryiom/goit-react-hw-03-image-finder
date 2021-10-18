import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { getImages } from '../../Service';
import Container from '../Container';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    searchItem: '',
    largeImage: {},
    page: 1,
    loading: false,
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchItem !== prevState.searchItem) {
      this.setState({ loading: true });
      this.fetchSearchItem()
        .catch(err => console.log(err))
        .finally(() => this.setState({ loading: false }));
    }
  }
  fetchSearchItem() {
    const { searchItem, page } = this.state;
    return getImages(searchItem, page).then(images => {
      this.setState(prev => ({
        images: [...prev.images, ...images],
        page: prev.page + 1,
      }));
    });
  }
  handleFormSubmit = searchItem => {
    this.setState({
      page: 1,
      searchItem,
      images: [],
    });
  };
  handleBtnLoadMoreClick = () => {
    this.setState({ loading: true });

    this.fetchSearchItem()
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ loading: false }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onOpenImageClick = largeImage => {
    this.setState({
      loading: true,
      largeImage,
    });
    console.log(this.state.largeImage);
    this.toggleModal();
    this.setState({ loading: false });
  };

  render() {
    const { searchItem, largeImage, images, loading, showModal } = this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length !== 0 ? (
          <ImageGallery images={images} onModalClick={this.onOpenImageClick} />
        ) : (
          searchItem !== '' && <h1>Nothing was found</h1>
        )}
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleBtnLoadMoreClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {loading && <Loader />}
            <img
              src={largeImage.largeImageURL}
              alt={largeImage.tags}
              onClose={this.toggleModal}
            />
          </Modal>
        )}
      </Container>
    );
  }
}
