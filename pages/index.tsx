import type { NextPage } from "next";
import Head from "next/head";
import { Upload, message, Button, Row, Col } from "antd";

import React from "react";
import { SketchPicker, SliderPicker } from "react-color";
import CanvasDraw from "react-canvas-draw";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { saveAs } from "file-saver";
import Header from "../components/header";
import Title from "../components/title";

const { Dragger } = Upload;

function saveImage() {
  let sourceCanvas = document.getElementsByTagName("canvas")[1];

  sourceCanvas.toBlob((blob) => {
    saveAs(blob!, "MyNFT.png");
  });
}

const Home: NextPage = () => {
  const [color, setColor] = React.useState<string>("#00000");
  const [width, setWidth] = React.useState("1000px");
  const canvasRef = React.useRef<CanvasDraw>(null);

  const containerStyle = {
    width: width,
    marginBottom: 10,
  };

  return (
    <div className={styles.container}>
      <Header title="Create NFT" />

      <main className={styles.main}>
        <Title
          title={"创建一个你的"}
          link={"NFT"}
          content={"第一步：在这里绘制你的小人"}
          color={color}
        />
        <div className={styles.grid}></div>

        <div style={containerStyle}>
          <SliderPicker
            color={color}
            onChange={(color) => {
              setColor(color.hex);
            }}
          />
        </div>
        <br />
        <Row gutter={[5, 5]}>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                canvasRef.current?.undo();
              }}
            >
              Undo
            </Button>
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => {
                canvasRef.current?.clear();
              }}
            >
              Clear
            </Button>
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => {
                const image = saveImage();
                console.log(image);
              }}
            >
              Save
            </Button>
          </Col>
        </Row>
        <br />

        <CanvasDraw
          canvasWidth={500}
          canvasHeight={500}
          brushColor={color}
          ref={canvasRef}
        />
        <br />
        <Button type="primary">
          <Link href={"./page1"}>下一步</Link>
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.askideahk.com/index.php?route=information/information&information_id=8"
          target="_blank"
          rel="noopener noreferrer"
        >
          @2022 ASK IDEA
        </a>
      </footer>
    </div>
  );
};

export default Home;
