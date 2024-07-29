import React, { Component } from "react";
import placeholderImg from "../placeholderimg.png";
export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      defaultImageUrl: placeholderImg, // Default image URL
    };
  }

  async fetchImage(query) {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=1`;

    try {
      let response = await fetch(url, {
        headers: {
          Authorization: process.env.REACT_APP_PEXEL_API_KEY,
        },
      });
      // console.log(response)
      if (response.status !== 200) {
        this.setState({ imageUrl: this.state.defaultImageUrl });
        return;
      }

      let data = await response.json();

      if (data.photos.length > 0) {
        this.setState({ imageUrl: data.photos[0].src.medium });
      } else {
        this.setState({ imageUrl: this.state.defaultImageUrl });
      }
    } catch (error) {
      console.error("Error fetching image from Pexels:", error);
      this.setState({ imageUrl: this.state.defaultImageUrl });
    }
  }

  componentDidMount() {
    const { keywords, title } = this.props;
    const query = keywords ? keywords.join(",") : title;
    this.fetchImage(query);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.keywords !== this.props.keywords ||
      prevProps.title !== this.props.title
    ) {
      const { keywords, title } = this.props;
      const query = keywords ? keywords.join(",") : title;
      this.fetchImage(query);
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
