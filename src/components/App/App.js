import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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
    query: '',
    modalImageUrl: '',
    tag: '',
    page: 1,
    loading: false,
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchItem !== prevState.searchItem) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.fetchSearchItem()
          .catch(err => console.log(err))
          .finally(() => this.setState({ loading: false }));
      }, 2000);
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
  toggleModal = modalImageUrl => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImageUrl,
    }));
  };
  // onOpenImageClick = e => {
  //   if (e.target.Nodename !== 'IMG') {
  //     return;
  //   }
  //   this.toggleModal();
  // };

  render() {
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          images={this.state.images}
          onModalClick={this.toggleModal}
        />
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && (
          <Button onClick={this.handleBtnLoadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            modalImageUrl={this.state.modalImageUrl}
          ></Modal>
        )}
      </Container>
    );
  }
}
