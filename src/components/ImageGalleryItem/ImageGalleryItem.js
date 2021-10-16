import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <>
      <img
        className={s.Item}
        src={webformatURL}
        alt={tags}
        data-url={largeImageURL}
        onClick={onOpenModal}
      />
    </>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
