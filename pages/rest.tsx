import { Divider } from "antd";
import axios from "axios";
import React from "react";
import useSWR from "swr";

export default function rest() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    async (url) => {
      const result = await axios.get(url);
      return result.data;
    }
  );

  return (
    <div>
      {data &&
        data.map((content: any, index: number) => (
          <div>
            <h1>{content.title}</h1>
            <h2>{content.body}</h2>
            <div>=======================</div>
          </div>
        ))}
    </div>
  );
}
