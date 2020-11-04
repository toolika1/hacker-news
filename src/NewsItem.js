import { random } from "lodash";
import React, { useState } from "react";

import "./NewsItem.css";

export default function NewsItem(props) {
  const [likes, incLikes] = useState(random(1000));

  return (
    <div className="news-item">
      {props.data ? (
        <div>
          <div className="title">{props.data ? props.data.title : ""}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
