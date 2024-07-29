import React, { Component, lazy } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

const NewsItem = lazy(() => import("./NewsItem"));

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: process.env.REACT_APP_API_KEY,
      articles: [],
      loading: false,
      nextPage: "",
      pageSize: 50,
      header: this.capitalizeFirstLetter(this.props.category),
      country: "in",
      newsLimitExceeded: false,
    };
    this.debouncedSearchNews = debounce(this.searchNews, 500);
  }

  async updateNews() {
    this.setState({ loading: true });

    const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&category=${this.props.category}&language=hi,en`;
    // console.log("The current url is: ", url);

    try {
      let response = await fetch(url);
      if (response.status === 429) {
        this.handleNewsLimitExceeded();
        return;
      }
      let parsedData = await response.json();
      // console.log(
      //   "this is the newly parsed data from newsdataio: ",
      //   parsedData
      // );
      this.setState({
        articles: parsedData.results || [], // Ensure articles is always an array
        totalResults: parsedData.totalResults || 0,
        nextPage: parsedData.nextPage,
        header: this.capitalizeFirstLetter(this.props.category),
        loading: false,
      });
    } catch (error) {}
  }

  handleNewsLimitExceeded() {
    console.log("API LIMIT EXCEEDED, Try Again after 15 minutes!");
    this.setState({
      newsLimitExceeded: true,
      articles: [], // Ensure articles is always an array
      totalResults: 0,
      nextPage: 0,
      header: this.capitalizeFirstLetter(this.props.category),
      loading: false,
    });
  }

  async searchNews(query) {
    if (query.trim() === "") {
      query = "";
      this.updateNews();
      return;
    } else {
      this.setState({ loading: true, header: query });
      if (query.length < 3) return;

      const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&qInTitle=${query}&language=hi,en`;
      try {
        let response = await fetch(url);
        if (response.status === 429) {
          this.handleNewsLimitExceeded();
          return;
        }
        let parsedData = await response.json();
        this.setState({
          articles: parsedData.results || [], // Ensure articles is always an array
          totalResults: parsedData.totalResults || 0,
          loading: false,
        });
        document.title = `${query} - Samachaar`;
      } catch (error) {}
    }
  }

  fetchMoreData = async () => {
    // console.log("fetching more data...");
    const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&category=${this.props.category}&language=hi,en&page=${this.state.nextPage}`;
    // console.log("more data is fetchd from:", url);
    try {
      let data = await fetch(url);
      if (data.status !== 200) {
        this.handleNewsLimitExceeded();
        return;
      }
      let parsedData = await data.json();
      // console.log("this is more fetched data: ", parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.results),
        totalResults: parsedData.totalResults,
        nextPage: parsedData.nextPage,
        header: this.capitalizeFirstLetter(this.props.category),
        loading: false,
      });
    } catch (error) {
      // console.error("Error fetching more data:", error);
    }
  };

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    // console.log("Prev props: ", prevProps);
    // console.log("this.props: ", this.props);
    if (prevProps.category !== this.props.category) {
      this.updateNews();
    }
  }

  capitalizeFirstLetter = (string) => {
    if (string?.length > 0) return string.toUpperCase();
  };

  handleSearch = (event) => {
    this.debouncedSearchNews(event.target.value);
  };
  render() {
    document.title = `${this.state.header} - Samachaar`;
    return (
      <>
        <div className="container">
          <input
            className="form-control container"
            type="search"
            placeholder="Search Latest News Here..."
            aria-label="Search"
            onChange={this.handleSearch} // Use the debounced function
          />
        </div>
        <h2 className="text-center heading m-5">
          <Link to={"/"} className="headerLink">
            SAMACHAAR - {this.state.header}
          </Link>
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container d-flex justify-content-around flex-wrap align-items-center">
            {!this.state.newsLimitExceeded &&
              this.state.articles.map((ele, idx) => (
                <div key={idx}>
                  <NewsItem
                    imgUrl={ele.image_url}
                    title={ele.title}
                    desc={ele.description}
                    url={ele.link}
                    author={ele.creator}
                    publishedAt={ele.pubDate}
                    name={this.capitalizeFirstLetter(ele.source_id)}
                    keywords={ele.keywords}
                  />
                </div>
              ))}
            {this.state.newsLimitExceeded && (
              <>
                News Limit Exceeded, Try Again after 15 Minutes! <Spinner />
              </>
            )}
          </div>
        </InfiniteScroll>
        <button
          type="button"
          className="btn btn-primary m-2 back-to-top opacity-75"
          id="back-to-top"
          onClick={() => {
            document.body.scrollIntoView();
          }}
        >
          <i className="bi bi-arrow-up-circle-fill" />
        </button>
      </>
    );
  }
}

export default News;
