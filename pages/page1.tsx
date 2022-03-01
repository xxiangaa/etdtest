import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Upload, Modal, Tooltip, Input, Button } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";

interface Props {}

interface State {
  previewTitle: string;
  previewVisible: boolean;
  previewImage: any;
  fileList: any[];
  coinbase: string;
}

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      coinbase: "",
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ fileList }: any) => this.setState({ fileList });

  onChange = async (e: any) => {
    this.setState({ coinbase: e.target.value });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const buttonStyle = {
      marginTop: 10,
    };
    const onClick = async () => {
      const result = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          //coinbase: coinbase,
          //image: image,
        }
      );

      console.log(result);
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Link href={"./"}>
          <Tooltip title="Back">
            <ArrowLeftOutlined
              style={{ fontSize: 40, cursor: "pointer", margin: 10 }}
            />
          </Tooltip>
        </Link>
        <div style={{ textAlign: "center" }}>
          <h1>
            第二步：上传已经画好的小人到<a>区块链</a>上吧！
          </h1>
          <h3>点击上载你的NFT图片以及你学校的校徽</h3>
          <Upload
            accept=".png, .jpg, .jpeg"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <div>
            <label>请输入你的钱包地址：</label>

            <Input
              showCount
              maxLength={256}
              onChange={this.onChange}
              value={this.state.coinbase}
              style={{ width: "50%" }}
            />
          </div>
          <Button style={buttonStyle} type="primary" onClick={onClick}>
            上传
          </Button>
          <br />
          <br />
          <Button type="primary">
            <Link href={`./page2?coinbase=${this.state.coinbase}`}>下一步</Link>
          </Button>
        </div>
      </>
    );
  }
}
