import React, { Component, lazy } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
const NewsItem = lazy(() => import("./NewsItem"));
export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "pub_12865da25aaca62be7ca1b89f9b017a3d9246",
      articles: [],
      loading: false,
      page: 1,
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
      header: this.capitalizeFirstLetter(this.props.category),
      loading: false,
    });
  }
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
      console.log(parsedData);
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
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

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
              console.log(e.target.value);
              this.searchNews(e.target.value);
            }}
          />
        </div>
        <h2 className="text-center heading m-5">
          <Link to={"/"} className="headerLink">
            SAMACHAAR
          </Link>{" "}
          - {this.state.header}
        </h2>

        {this.state.loading && <Spinner />}
        <div className="container d-flex justify-content-around flex-wrap align-items-center">
          {!this.state.loading &&
            this.state.articles.map((ele) => {
              return (
                <div key={ele.link}>
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
        <div className="d-flex justify-content-between m-4">
          <button
            type="button"
            className="btn btn-primary prevBtn"
            title="Previous"
            disabled={this.state.page <= 1 ? true : false}
            onClick={this.handlePrevClick}
          >
            <i className="bi bi-arrow-left prevArr" />
          </button>
          <button
            type="button"
            className="btn btn-primary nextBtn"
            title="Next"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.state.pageSize)
                ? true
                : false
            }
            onClick={this.handleNextClick}
          >
            <i className="bi bi-arrow-right nextArr" />
          </button>
        </div>
      </>
    );
  }
}
export default News;
