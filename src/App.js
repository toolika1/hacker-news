import {
  BookOutlined,
  DislikeOutlined,
  LikeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";
import { random } from "lodash";
import moment from "moment";
import queryString from "query-string";
import randomColor from "randomcolor";
import React from "react";
import Masonry from "react-masonry-css";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./App.css";

import { getNews, selectNews } from "./modules/actions";
import NewsItem from "./NewsItem";

class App extends React.Component {
  state = {
    q: "*",
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    this.setState({ q: queryParams.q || "*" });
    this.props.getNews(queryParams.q || "*");

    this.props.selectNews(queryParams.key || "0");
  }

  render() {
    // console.log("this.props", this.props);

    const selectedNews = this.props.news[this.props.selectedNewsId];
    // console.log("selectedNews", selectedNews);

    return (
      <div>
        {selectedNews ? (
          <div className="layout news-details vertical">
            <div className="main-title">{selectedNews.title}</div>
            <div className="ant-list-item-meta-description description">
              {selectedNews.description.replace(/read more\.\.\.$/i, "...")}
            </div>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: randomColor({
                        seed: selectedNews.author,
                      }),
                    }}
                  >
                    {selectedNews.author.charAt(0).toUpperCase()}
                  </Avatar>
                }
                description={`${moment(
                  selectedNews.publishedAt
                ).fromNow()} · ${random(1, 10)} min read`}
                title={selectedNews.author}
              />

              <Space>
                <BookOutlined />
                <MoreOutlined />
              </Space>
            </List.Item>
            <img alt={selectedNews.title} src={selectedNews.urlToImage} />
            <div className="content">{selectedNews.content}</div>
            <div className="ant-list-item-meta-description actions">
              <Space>
                <Button shape="circle" icon={<LikeOutlined />} />
                <div>{random(1000)}</div>

                <Button shape="circle" icon={<DislikeOutlined />} />
                <div>{random(10)}</div>
              </Space>
            </div>
            <div className="news-related">
              <Masonry
                breakpointCols={{ 480: 1, default: 2 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid-column"
              >
                {this.props.news.map((newsItem, key) =>
                  `${key}` === this.props.selectedNewsId ? (
                    ""
                  ) : (
                    <NewsItem
                      data={{ ...newsItem, key: key % 20, q: this.state.q }}
                      key={key}
                    />
                  )
                )}
              </Masonry>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    news: state.news,
    selectedNewsId: state.selectedNewsId,
  };
};

export default connect(mapStateToProps, (dispatch) => ({
  ...bindActionCreators({ getNews, selectNews }, dispatch),
  dispatch,
}))(App);
