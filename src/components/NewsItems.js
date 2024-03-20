import React from "react";

// export class NewsItems extends Component {
  // render() {
    const NewsItems = (props)=>{
    let { title, description, imgUrl, NewsUrl, author, publishedAt, source } =
      /*(this.)*/props;
    return (
      <div className="my-2">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{left:"50%", width:"100%", zIndex:"1"}}>
            {source}
          </span>
          <img
            src={
              !imgUrl
                ? "https://www.livemint.com/lm-img/img/2024/01/19/1600x900/RELIANCE-INDS-FUNDRAISING--0_1689943555978_1705641669001.JPG"
                : imgUrl
            }
            className="card-img-top"
            alt="Img Not Get"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By{!author ? "Unknown" : author} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={NewsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
//}

export default NewsItems;
