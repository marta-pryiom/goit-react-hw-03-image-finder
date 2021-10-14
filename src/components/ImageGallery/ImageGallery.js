import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
export default function ImageGallery({ images }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={s.ImageGalleryItem} key={id}>
          <ImageGalleryItem
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        </li>
      ))}
    </ul>
  );
}
