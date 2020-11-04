import { HeartOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import { random } from "lodash";
import moment from "moment";
import randomColor from "randomcolor";
import React, { useState } from "react";

import "./NewsItem.css";

export default function NewsItem(props) {
  const [likes, setLikes] = useState(random(1000));
  const [views] = useState(random(1000));

  return (
    <div className="news-item">
      {props.data ? (
        <div>
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: randomColor({
                      seed: props.data.source.name,
                    }),
                  }}
                >
                  {props.data.source.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              description={moment(props.data.publishedAt).fromNow()}
              title={props.data.source.name}
            />
          </List.Item>
          <img alt={props.data.title} src={props.data.urlToImage} />
          <div className="title">{props.data.title}</div>
          <div className="center justified horizontal layout footer ant-list-item-meta-description">
            <div>
              <Button
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => setLikes(likes + 1)}
              />
              &nbsp;{likes}
            </div>
            <div>{views} Views</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
