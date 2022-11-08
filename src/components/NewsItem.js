import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, desc, url, author, publishedAt, name, keywords } = this.props;
    publishedAt = new Date(publishedAt).toLocaleString();
    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
            {name}
          </span>
          <img
            src={`https://source.unsplash.com/286x160/?${
              keywords ? keywords : title
            }`}
            className="card-img-top"
            alt="..."
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
