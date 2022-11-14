import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, author, date, source } = this.props;
    let defaultImageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLJtzRMF7XO63yNWlVSEW25GdwgKVCbdL3w&usqp=CAU';

    return (
      <div>
        <div className="card">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-dark"
            style={{ zIndex: "1", left: "90%" }}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={!imageUrl?defaultImageUrl:imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "unknown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>

            <a href={this.props.url} target="_blank" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
