import React, { Component, lazy } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const NewsItem = lazy(() => import("./NewsItem"));
export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "pub_17513d12e861cead0c734556d849c7cdf0833",
      articles: [],
      loading: false,
      page: "",
      nextPage: "",
      pageSize: 50,
      header: this.capitalizeFirstLetter(this.props.category),
      country: "in",
    };
    document.title = `${this.state.header} - Samachaar`;
  }

  async updateNews() {
    this.setState({ loading: true });
    const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&category=${this.props.category}&language=hi,en&page=${this.state.page}#`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.results,
      totalResults: parsedData.totalResults,
      nextPage: parsedData.nextPage,
      header: this.capitalizeFirstLetter(this.props.category),
      loading: false,
    });
    let a = document.getElementById("back-to-top").classList;
    window.onscroll = function () {
      a.remove("d-none");
    };
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.nextPage });
    const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&category=${this.props.category}&language=hi,en&page=${this.state.page}#`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.results),
      totalResults: parsedData.totalResults,
      nextPage: parsedData.nextPage,
      header: this.capitalizeFirstLetter(this.props.category),
      loading: false,
    });
  };

  async searchNews(query) {
    if (query === "" || query === " ") {
      query = "";
      this.updateNews();
      return;
    } else {
      this.setState({ loading: true, header: "Keep Typing..." });
      if (query.length < 3) return;
      this.setState({ loading: true, header: query });
      const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&qInTitle=${query}&language=hi,en`;
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        articles: parsedData.results,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      document.title = `${query} - Samachaar`;
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render() {
    return (
      <>
        <div className="container">
          <input
            className="form-control container"
            type="search"
            placeholder="Search Latest News Here..."
            aria-label="Search"
            onChange={(e) => {
              // console.log(e.target.value);
              this.searchNews(e.target.value);
            }}
          />
        </div>
        <h2 className="text-center heading m-5">
          <Link to={"/"} className="headerLink">
            SAMACHAAR
          </Link>
          - {this.state.header}
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container d-flex justify-content-around flex-wrap align-items-center">
            {this.state.articles.map((ele, idx) => {
              return (
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
              );
            })}
          </div>
        </InfiniteScroll>
        <button
          type="button"
          className="btn btn-primary m-2 d-none back-to-top opacity-75"
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
