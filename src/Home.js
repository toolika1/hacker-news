import {
  BulbOutlined,
  CoffeeOutlined,
  FireOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NumberOutlined,
  SearchOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Layout, List, Menu, Tooltip } from "antd";
import { find } from "lodash";
import Masonry from "react-masonry-css";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./Home.css";

import { getNews } from "./modules/actions";
import NewsItem from "./NewsItem";

const { Content, Header, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: true,
    menuCategories: [
      {
        icon: React.createElement(FireOutlined),
        key: "*",
        title: "Trending Now",
      },
      {
        icon: React.createElement(TrophyOutlined),
        key: "sports",
        title: "Sports",
      },
      {
        icon: React.createElement(BulbOutlined),
        key: "technology",
        title: "Technology",
      },
      {
        icon: React.createElement(CoffeeOutlined),
        key: "politics",
        title: "Politics",
      },
    ],
    q: "*",
    windowInnerHeight: window.innerHeight || 512,
    windowInnerWidth: window.innerWidth || 1024,
  };

  resizeWindow = () => {
    this.setState({
      collapsed: true,
      windowInnerHeight: window.innerHeight || 512,
      windowInnerWidth: window.innerWidth || 1024,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);

    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams.q === undefined) {
      this.props.history.push({
        search: `?${queryString.stringify({ ...queryParams, q: "*" })}`,
      });
    } else {
      this.setState({ q: queryParams.q });
      this.props.getNews(this.state.q);
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryParams = queryString.parse(this.props.location.search);
    const nextQueryParams = queryString.parse(nextProps.location.search);

    // console.log("queryParams", queryParams, "nextQueryParams", nextQueryParams);

    if (queryParams.q !== nextQueryParams.q) {
      this.setState({ q: nextQueryParams.q });
      this.props.getNews(this.state.q);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  onSelectMenuCategory = (selection) => {
    this.setState({ collapsed: true });

    const queryParams = queryString.parse(this.props.location.search);

    this.props.history.push({
      search: `?${queryString.stringify({ ...queryParams, q: selection.key })}`,
    });
  };

  onMenuToggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    console.log("this.props", this.props);

    return (
      <Layout className="layout" hasSider={true}>
        <Sider
          collapsed={this.state.collapsed}
          collapsible={false}
          collapsedWidth={this.state.windowInnerWidth < 480 ? 0 : 64}
          theme="light"
          trigger={null}
          width={this.state.windowInnerWidth < 480 ? "70vw" : "256px"}
        >
          <div className="justified layout sider vertical">
            <div>
              <div className="logo">
                <List.Item>
                  {this.state.collapsed ? (
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/news-512.png" />
                      }
                    />
                  ) : (
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/news-512.png" />
                      }
                      description="anything that gratifies one's intellectual curiosity"
                      title="HackerNews"
                    />
                  )}
                </List.Item>
              </div>

              <div className="category">
                <Menu mode="inline" onSelect={this.onSelectMenuCategory}>
                  {this.state.menuCategories.map((category) => (
                    <Menu.Item
                      className="menu"
                      icon={category.icon}
                      key={category.key}
                      title={category.title}
                    >
                      {category.title}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </div>

            <div>
              <Menu mode="inline">
                <Menu.Item
                  className="menu"
                  icon={<UserOutlined />}
                  key="user"
                  title="User"
                >
                  User
                </Menu.Item>

                <Menu.SubMenu
                  className="menu"
                  icon={<GlobalOutlined />}
                  key="language"
                  title="Language"
                >
                  <Menu.Item icon={<NumberOutlined />} key="english">
                    English
                  </Menu.Item>
                  <Menu.Item icon={<NumberOutlined />} key="malayalam">
                    Malayalam
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </div>
        </Sider>

        <Layout className="site-layout">
          <Header className="center horizontal layout site-layout-header">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "site-layout-header-trigger",
                onClick: this.onMenuToggle,
              }
            )}

            <div className="flex site-layout-header-title">
              {this.state.collapsed && this.state.windowInnerWidth < 512
                ? (
                    find(this.state.menuCategories, { key: this.state.q }) ||
                    this.state.menuCategories[0]
                  ).title
                : ""}
            </div>

            {this.state.collapsed ||
            (!this.state.collapsed && 512 < this.state.windowInnerWidth) ? (
              768 < this.state.windowInnerWidth ? (
                <Input
                  bordered={false}
                  className="site-layout-header-input"
                  placeholder="Search"
                  size="large"
                  suffix={<SearchOutlined />}
                />
              ) : (
                <Tooltip title="Search">
                  <Button
                    className="site-layout-header-button"
                    icon={<SearchOutlined />}
                    shape="circle"
                  />
                </Tooltip>
              )
            ) : (
              ""
            )}
          </Header>

          <Content className="site-layout-content">
            {this.state.collapsed ||
            (!this.state.collapsed && 512 < this.state.windowInnerWidth) ? (
              <Masonry
                breakpointCols={{ 480: 1, 736: 2, 992: 3, default: 4 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid-column"
              >
                {this.props.news.map((newsItem, key) => (
                  <NewsItem data={{ ...newsItem }} key={key} />
                ))}
              </Masonry>
            ) : (
              ""
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { news: state.news };
};

export default connect(mapStateToProps, (dispatch) => ({
  ...bindActionCreators({ getNews }, dispatch),
  dispatch,
}))(Home);
