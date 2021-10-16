import s from './Button.module.css';
export default function Button({ onClick }) {
  return (
    <button className={s.Btn} onClick={onClick} type="button">
      Load more
    </button>
  );
}
