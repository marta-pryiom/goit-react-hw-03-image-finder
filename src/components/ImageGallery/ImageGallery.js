import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
export default function ImageGallery({ images, onModalClick }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={s.ImageGalleryItem} key={id}>
          <ImageGalleryItem
            onOpenModal={onModalClick}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        </li>
      ))}
    </ul>
  );
}
