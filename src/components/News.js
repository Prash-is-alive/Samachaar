import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 20,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=343dd794e3664220a50a41979efd060e&pageSize=${this.state.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  handleNextClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=343dd794e3664220a50a41979efd060e&pageSize=${this.state.pageSize}&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    })
  }
  handlePrevClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=343dd794e3664220a50a41979efd060e&pageSize=${this.state.pageSize}&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    })
  }

  render() {
    return (
      <>
        <h1 className='text-center my-5' >SAMACHAAR</h1>
        <div className='container d-flex justify-content-between my-1'>
          <button type="button" className="btn btn-primary" disabled={this.state.page <= 1 ? true : false} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-primary" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) ? true : false} onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        {this.state.loading && <Spinner />}
        <div className='container d-flex justify-content-around flex-wrap align-items-end'>
          {!this.state.loading && this.state.articles.map((ele) => {
            return <div key={ele.url}>
              <NewsItem imgUrl={ele.urlToImage} title={ele.title} desc={ele.description} url={ele.url} />
            </div>
          })}
        </div>

      </>
    )
  }
}

export default News