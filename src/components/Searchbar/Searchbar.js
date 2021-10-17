import { Component } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    searchItem: '',
  };
  //   static PropTypes = { onSubmit: propTypes.func.isRequired };
  handleInputSearch = e => {
    this.setState({
      searchItem: e.target.value,
    });
  };
  hendleSubmit = e => {
    e.preventDefault();
    if (this.state.searchItem.trim() === '') {
      toast.error('Enter a word to search for!');
      return;
    }
    this.props.onSubmit(this.state.searchItem);
    this.reset();
  };
  reset = () => {
    this.setState({
      searchItem: '',
    });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            onChange={this.handleInputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
