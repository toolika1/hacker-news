import {
  BankOutlined,
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
import React from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./Home.css";

import { getNews, popupAction } from "./modules/actions";

const { Content, Header, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: true,
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

    this.props.getNews();
    this.props.popupAction(true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  toggle = () => {
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
                <Menu mode="inline">
                  <Menu.Item
                    className="menu"
                    icon={<FireOutlined />}
                    key="top-headlines"
                    title="Popular"
                  >
                    Popular
                  </Menu.Item>
                  <Menu.Item
                    className="menu"
                    icon={<CoffeeOutlined />}
                    key="politics"
                    title="Politics"
                  >
                    Politics
                  </Menu.Item>
                  <Menu.Item
                    className="menu"
                    icon={<TrophyOutlined />}
                    key="sports"
                    title="Sports"
                  >
                    Sports
                  </Menu.Item>
                  <Menu.Item
                    className="menu"
                    icon={<BankOutlined />}
                    key="business"
                    title="Business"
                  >
                    Business
                  </Menu.Item>
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
                onClick: this.toggle,
              }
            )}

            <div className="flex site-layout-header-title">Popular</div>

            {768 < this.state.windowInnerWidth ? (
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
            )}
          </Header>

          <Content>
            <div>#</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { news: state.news, popup: state.popup };
};

export default connect(mapStateToProps, (dispatch) => ({
  ...bindActionCreators({ getNews, popupAction }, dispatch),
  dispatch,
}))(Home);
