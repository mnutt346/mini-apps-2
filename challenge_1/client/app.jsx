import React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import Events from "./components/events.jsx";
import Search from "./components/search.jsx";
import Header from "./components/header.jsx";
require("../styles.css");
require("babel-polyfill");

class App extends React.Component {
  state = {
    currentPage: 1,
    itemsPerPage: 10,
    pageCount: 5,
    currentEvents: [],
    searchInput: null
  };

  componentDidMount() {
    this.getPageCount();
    this.getCurrentEventData();
  }

  // Gets the total page count for all items in DB
  getPageCount() {
    let { itemsPerPage } = this.state;
    Axios.get(`http://localhost:3000/events`)
      .then(response => {
        this.setState({
          pageCount: Math.ceil(response.data.length / itemsPerPage)
        });
      })
      .catch(err => console.log("ERROR IN GET /events: ", err));
  }

  getCurrentEventData() {
    let { currentPage, itemsPerPage, searchInput } = this.state;
    if (!searchInput) {
      // Gets next page when no search is executed
      Axios.get(
        `http://localhost:3000/events?_page=${currentPage}&_limit=${itemsPerPage}`
      ).then(response => {
        this.setState({
          currentEvents: response.data
        });
      });
    } else {
      // Gets the next page based on search input
      Axios.get(
        `http://localhost:3000/events?q=${searchInput}&_page=${currentPage}&_limit=${itemsPerPage}`
      ).then(response => {
        this.setState({
          currentEvents: response.data
        });
      });
    }
  }

  // Gets page count for search results
  getSearchPageCount() {
    let { itemsPerPage, searchInput } = this.state;
    Axios.get(`http://localhost:3000/events?q=${searchInput}`).then(
      response => {
        this.setState({
          pageCount: Math.ceil(response.data.length / itemsPerPage)
        });
      }
    );
  }

  handleClick = async e => {
    await this.setState({ currentPage: e.selected + 1 });
    this.getCurrentEventData();
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleSearchClick = async event => {
    event.preventDefault();
    await this.getCurrentEventData();
    this.getSearchPageCount();
  };

  render() {
    let { currentEvents } = this.state;
    return (
      <div className="app-container">
        <Header />
        <div className="search-container">
          <Search
            handleSearchInput={this.handleSearchInput}
            handleSearchClick={this.handleSearchClick}
          />
        </div>
        <div className="events-container">
          <Events currentEvents={currentEvents} />
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          onPageChange={this.handleClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
