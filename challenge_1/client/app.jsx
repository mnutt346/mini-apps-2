import React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import Events from "./components/events.jsx";
import Search from "./components/search.jsx";
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
      Axios.get(
        `http://localhost:3000/events?_page=${currentPage}&_limit=${itemsPerPage}`
      ).then(response => {
        this.setState({
          currentEvents: response.data
        });
      });
    } else {
      Axios.get(
        `http://localhost:3000/events?p=${searchInput}_page=${currentPage}&_limit=${itemsPerPage}`
      ).then(response => {
        this.setState({
          currentEvents: response.data
        });
      });
    }
  }

  handleClick = async e => {
    await this.setState({ currentPage: e.selected + 1 });
    this.getCurrentEventData();
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("SUBMIT");
  };

  render() {
    let { currentEvents } = this.state;
    return (
      <div className="app-container">
        <Search handleSearchInput={this.handleSearchInput} />
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
