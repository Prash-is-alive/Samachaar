import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import sampleOutput from '../SampleOutput.json'
export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'pub_127072b8b3713a193d43d0edbde7a07f7937e',
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
        const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&category=${this.props.category}&language=hi,en&page=${this.state.page}#`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.results, totalResults: parsedData.totalResults, header: this.capitalizeFirstLetter(this.props.category), loading: false })
        if (parsedData.status !== "success")
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
            const url = `https://newsdata.io/api/1/news?apikey=${this.state.apiKey}&qInTitle=${query}&language=hi,en`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({ articles: parsedData.results, totalResults: parsedData.totalResults, loading: false })
            if (parsedData.status !== "success")
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
                <div className=' d-flex justify-content-between m-4'>
                    <button type="button" className="btn btn-primary" title='Previous' disabled={this.state.page <= 1 ? true : false} onClick={this.handlePrevClick}>&larr;</button>
                    <button type="button" className="btn btn-primary" title='Next' disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) ? true : false} onClick={this.handleNextClick}>&rarr;</button>
                </div>
                {this.state.loading && <Spinner />}
                <div className='container d-flex justify-content-around flex-wrap align-items-center'>
                    {!this.state.loading && this.state.articles.map((ele) => {
                        return <div key={ele.url}>
                            <NewsItem imgUrl={ele.image_url} title={ele.title} desc={ele.description} url={ele.link} author={ele.creator} publishedAt={ele.pubDate} name={ele.source_id} />
                        </div>
                    })}
                </div>

            </>
        )
    }
}
export default News;