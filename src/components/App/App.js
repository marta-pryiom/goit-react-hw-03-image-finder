import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as basicLightbox from 'basiclightbox';
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
    // modalImageUrl: '',
    // tag: '',
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
    setTimeout(() => {
      this.fetchSearchItem()
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .then(() => this.setState({ loading: false }));
    }, 2000);
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onOpenImageClick = modalImageUrl => {
    // if (e.target.Nodename !== 'IMG') {
    //   return;
    // }
    this.setState({
      modalImageUrl,
    });
    console.log(this.state.modalImageUrl);
    this.toggleModal();
  };

  render() {
    const { modalImageUrl, images, loading, showModal } = this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onModalClick={this.onOpenImageClick} />
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleBtnLoadMoreClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>hello</h1>
            <img
              src={modalImageUrl.largeImageURL}
              alt={modalImageUrl.tag}
              id={modalImageUrl.id}
            />
          </Modal>
        )}
      </Container>
    );
  }
}
