import { ArrowLeftOutlined } from "@ant-design/icons";
import { Tooltip, Upload, Modal, Typography } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import Link from "next/link";
import React from "react";
import "antd/dist/antd.css";
import { useRouter } from "next/router";

export default function Index() {
  const [fileList, setFileList] = React.useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const router = useRouter();

  return (
    <>
      <Link href={"./page1"}>
        <Tooltip title="Back">
          <ArrowLeftOutlined
            style={{ fontSize: 40, cursor: "pointer", margin: 10 }}
          />
        </Tooltip>
      </Link>
      <div style={{ textAlign: "center" }}>
        <h1>
          第三步：查看你已经上传好的<a>NFT</a>吧！
        </h1>
        <h2>找一找你上传的NFT在哪吧！</h2>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          // onPreview={this.handlePreview}
          onChange={({ fileList }) => {
            setFileList(fileList);
          }}
          accept=".png, .jpg, .jpeg"
        />

        <Typography.Text>{router.query.coinbase}</Typography.Text>
      </div>
    </>
  );
}
