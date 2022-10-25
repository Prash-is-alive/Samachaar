import React, { Component } from 'react';
export class NewsItem extends Component {
  render() {
    let { title, desc, imgUrl, url } = this.props;
    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <img src={imgUrl?imgUrl:"https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/d/92/d925b273-daf5-5ce0-aadf-ad9d1ebed3c4/63540ab01757f.preview.jpg?crop=1763%2C926%2C0%2C124&resize=1200%2C630&order=crop%2Cresize"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href={url} target="_blank" rel="noreferrer noopener" className="btn btn-primary">Read</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem