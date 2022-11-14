import React, { Component } from "react";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)}-Taza_Khabar`;
  }

  capitalize = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
  };

  static defaultProps = {
    newspages: 6,
    catagoy: "general",
    country: "in",
  };

  static propTypes = {
    country: PropTypes.string,
    newspages: PropTypes.number,
    country: PropTypes.string,
  };

  updateNews = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c12308928f542c4a7ee84c4d61367c6&page=${this.state.page}&pageSize=${this.props.newspages}`;
    this.props.setProgress(30);

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  handlenextPage = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handleprevPage = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c12308928f542c4a7ee84c4d61367c6&page=${this.state.page}&pageSize=${this.props.newspages}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px" }}>
          Taza_Khabar Top Headlines
        </h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}>
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((article) => {
                  return (
                    <div className="col-md-4 my-3" key={article.url}>
                      <NewsItems
                        title={article.title}
                        description={article.description}
                        imageUrl={article.urlToImage}
                        url={article.url}
                        author={article.author}
                        date={article.publishedAt}
                        source={article.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
