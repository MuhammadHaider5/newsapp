import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: '6',
//         category: 'general',
//       }
//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//       }
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor(props) {
  //   super(props);
  // console.log("This is constructor");
  // this.state = {
  //   articles: [],
  //   loading: true,
  //   page: 1,
  //   totalResults: 0,
  // };
  // document.title = `News App - ${capitalizeFirstLetter(props.category)}`

  const updatedNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsData = await data.json();
    props.setProgress(70);
    console.log(parsData);
    setArticles(parsData.articles);
    setTotalResults(parsData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: parsData.articles,
    //   totalResults: parsData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `News App - ${capitalizeFirstLetter(props.category)}`
    updatedNews();
  }, []);

  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsData = await data.json();
  //   // console.log(parsData);
  //   // this.setState({
  //   //   articles: parsData.articles,
  //   //   totalResults: parsData.totalResults,
  //   //   loading: false,
  //   // });

  //   this.updatedNews();
  // }
  // handleNextPages = async () => {
  //   // console.log("Next");
  //   // if (
  //   //   this.state.page + 1 >
  //   //   Math.ceil(!(this.state.totalResults / props.pageSize))
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=752194605b6a4157943028b9f302e7a0&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parsData = await data.json();
  //   //   console.log(parsData);
  //   //   this.setState({
  //   //     articles: parsData.articles,
  //   //     page: this.state.page + 1,
  //   //     loading: false,
  //   //   });
  //   // }

  //   this.setState({page: this.state.page+1})
  //   this.updatedNews();
  // };
  // handlePrevPages = async () => {
  //   // console.log("Prev");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=752194605b6a4157943028b9f302e7a0&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsData = await data.json();
  //   // console.log(parsData);
  //   // this.setState({
  //   //     articles: parsData.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false,
  //   // });

  //   this.setState({page: this.state.page-1})
  //   this.updatedNews();
  // };
  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsData = await data.json();
    console.log(parsData);
    setArticles(articles.concat(parsData.articles))
    setTotalResults(parsData.totalResults)
    // this.setState({
    //   articles: this.state.articles.concat(parsData.articles),
    //   totalResults: parsData.totalResults,
    //   loading: false,
    // });
  };
  //   fetch(url).then((res) => res.json())
  //                 .then((json) => {
  //                     this.setState({
  //                         articles: json.articles,
  //                         loading: false
  //                     });
  //                 })
  // render() {
  return (
    <>
      <h1 className="text-center" style={{marginTop:'90px', marginBottom: '35px'}}>News App - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {"articles" &&
              articles.map((element, index) => {
                return (
                  <div
                    className="col-md-4 mt-2 d-flex justify-content-around"
                    key={index}
                  >
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      NewsUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn mb-5 btn-outline-primary"
            onClick={this.handlePrevPages}
          >
            &#129120;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn mb-5 btn-outline-primary"
            onClick={this.handleNextPages}
          >
            Next &#129122;
          </button>
        </div> */}
    </>
  );
  // }
};
News.defaultProps = {
  country: "in",
  pageSize: "6",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
