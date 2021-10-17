import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.ModalBackdrop} onClick={this.handleBackdrop}>
        <div className={s.ModalContent}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
