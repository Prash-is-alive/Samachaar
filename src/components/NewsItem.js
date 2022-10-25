import React, { Component } from 'react';
export class NewsItem extends Component {
  render() {
    let { title, desc, imgUrl, url, author, publishedAt, name } = this.props;
    publishedAt = new Date(publishedAt).toLocaleString();
    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
            {name}
          </span>
          <img src={imgUrl ? imgUrl : "https://fujifilm-x.com/wp-content/uploads/2019/08/xc16-50mmf35-56-ois-2_sample-images03.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className='card-text'>
              <figcaption class="blockquote-footer">
                <cite>{author ? `By ${author}\n` : ''}{publishedAt ? ` On ${publishedAt}` : ''}</cite>
              </figcaption>
            </p>
            <a href={url} target="_blank" rel="noreferrer noopener" className="btn btn-primary center">Read</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem