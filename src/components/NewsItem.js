import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      defaultImageUrl: `https://via.placeholder.com/286x160?text=No+Preview+Available`, // Default image URL
    };
  }

  async componentDidMount() {
    const { keywords, title } = this.props;
    const query = keywords ? keywords.join(",") : title;
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}&query=${encodeURIComponent(
      query
    )}&w=286&h=160`;

    try {
      let response = await fetch(url);

      if (response.status === 403) {
        this.setState({ imageUrl: this.state.defaultImageUrl });
        return;
      }

      let data = await response.json();

      if (data.results.length > 0) {
        this.setState({ imageUrl: data.results[0].urls.regular });
      } else {
        this.setState({ imageUrl: this.state.defaultImageUrl });
      }
    } catch (error) {
      // console.error("Error fetching image from Unsplash:", error);
      this.setState({ imageUrl: this.state.defaultImageUrl });
    }
  }

  render() {
    let { title, desc, url, author, publishedAt, name } = this.props;
    publishedAt = new Date(publishedAt).toLocaleString();

    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
            {name}
          </span>
          <img
            src={this.state.imageUrl}
            className="card-img-top"
            alt="News"
            style={{ width: "286px", height: "160px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <figcaption className="card-text blockquote-footer">
              <cite>
                {author ? `By ${author}\n` : ""}
                {publishedAt ? ` On ${publishedAt}` : ""}
              </cite>
            </figcaption>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary center readBtn"
            >
              Read <i className="bi bi-arrow-right-circle" />
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
