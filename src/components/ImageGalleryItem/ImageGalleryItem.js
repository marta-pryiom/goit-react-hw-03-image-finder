// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ img, onModalClick }) {
  return (
    <>
      <img
        className={s.Item}
        src={img.webformatURL}
        alt={img.tags}
        // data-url={img.largeImageURL}
        onClick={() => onModalClick(img)}
      />
    </>
  );
}
// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
