import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import sampleOutput from '../SampleOutput.json'
export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: '2b02afb772cd48fd9b145bacda77a5da',
            articles: [],
            loading: false,
            page: 1,
            pageSize: 25,
            header: this.capitalizeFirstLetter(this.props.category),
            country: 'in',
        }
        document.title = `${this.state.header} - Samachaar`
    }

    async updateNews() {
        this.setState({ loading: true })
        const url = `https://newsapi.org/v2/top-headlines?apiKey=${this.state.apiKey}&country=${this.state.country}&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, header: this.capitalizeFirstLetter(this.props.category), loading: false })
        if (parsedData.status !== "ok")
            this.setState({ articles: sampleOutput.articles })
    }
    async searchNews(query) {
        this.setState({ loading: true, header: query, })
        if (query === '' || query === ' ') {
            query = '';
            this.updateNews();
            return;
        }
        else {
            const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${this.state.apiKey}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
            if (parsedData.status !== "ok")
                this.setState({ articles: sampleOutput.articles })
            if (this.state.totalResults === 0) {
                return <>
                    NO RESULTS FOUND
                </>
            }
        }
    }

    async componentDidMount() {
        this.updateNews()
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <>
                <h1 className='text-center heading my-5' >SAMACHAAR - {this.state.header}</h1>
                <form className="d-flex container" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { console.log(e.target.value); this.searchNews(e.target.value) }} />
                </form>
                {this.state.loading && <Spinner />}
                <div className='container d-flex justify-content-around flex-wrap align-items-center'>
                    {!this.state.loading && this.state.articles.map((ele) => {
                        return <div key={ele.url}>
                            <NewsItem imgUrl={ele.urlToImage} title={ele.title} desc={ele.description} url={ele.url} author={ele.author} publishedAt={ele.publishedAt} name={ele.source.name} />
                        </div>
                    })}
                </div>
                <div className=' d-flex justify-content-between m-4'>
                    <button type="button" className="btn btn-primary" title='Previous' disabled={this.state.page <= 1 ? true : false} onClick={this.handlePrevClick}>&larr;</button>
                    <button type="button" className="btn btn-primary" title='Next' disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) ? true : false} onClick={this.handleNextClick}>&rarr;</button>
                </div>

            </>
        )
    }
}
export default News;