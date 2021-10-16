// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ img, onOpenModal }) {
  return (
    <>
      <img
        className={s.Item}
        src={img.webformatURL}
        alt={img.tag}
        // data-url={img.largeImageURL}
        onClick={() => onOpenModal(img)}
      />
    </>
  );
}
// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
