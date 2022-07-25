import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { isMobile } from "react-device-detect";
import { crop } from "./tagCropping";
import "./App.css";
import fs from "fs";
import cv from "opencv.js";
const jpeg = require("jpeg-js");
const App = () => {
  const [scanFile, setScanFile] = useState();
  const [selected, setSelected] = useState("user");
  const [width, setWidth] = useState(window.innerWidth);
  const [url, setUrl] = useState("");
  const inputImgRef = React.createRef();
  const grayImgRef = React.createRef();
  const cannyEdgeRef = React.createRef();
  const haarFaceImgRef = React.createRef();
  const video = document.getElementsByTagName("video");
  console.log("video", video);
  const handleError = (error) => {};
  const handleScan = async (result) => {
    if (result) {
      console.log("result", result);
      await setScanFile(result);
      const canvas = document.getElementsByTagName("canvas")[0];
      const video = document.getElementsByTagName("video")[0];
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      let image_data_url = canvas.toDataURL("image/jpeg");

      // Converting to base64
      const base64Image = canvas.toDataURL("image/jpeg");
      // data url of the image
      await setUrl(image_data_url);
      // const f = new File(new URL(image_data_url));
      console.log("Here img==>", image_data_url);
      // const f = new File(image_data_url);
      // console.log("Here ff ==>", f);
      await crop(image_data_url, [], 0, true, "", "", 0, 1);

      // const res = await qrcode.toDataURL(result);
      // await setUrl(res);
      // console.log("res", res);
      // await processImage();
      // const cropStore = crop(res, [], 0, true, "", "", 0, 1);
      // console.log("cropStore", cropStore);
    }
  };
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    // loadHaarFaceModels();
  }, []);

  // const processImage = () => {
  //   const id = document.getElementById("imgId");
  //
  //   // console.log("ctx", ctx);
  //   const img = cv.imread(id);
  //   console.log("img", img);
  //   // to gray scale;
  //   const imgGray = new cv.Mat();
  //   cv.cvtColor(img, imgGray, cv.COLOR_RGB2HLS_FULL);
  //   cv.imshow(grayImgRef.current, imgGray);
  //
  //   // detect edges using Canny
  //   const edges = new cv.Mat();
  //   cv.Canny(imgGray, edges, 100, 100);
  //   cv.imshow(cannyEdgeRef.current, edges);
  //
  //   // const jpeg_data = jpeg?.encode(raw_data, 50);
  //   // fs.writeFileSync("out_img.jpg", jpeg_data.data);
  //
  //   // detect faces using Haar-cascade Detection
  //   // const haarFaces = detectHaarFace(img);
  //   // cv.imshow(haarFaceImgRef.current, haarFaces);
  //
  //   // need to release them manually
  //   img.delete();
  //   imgGray.delete();
  //   edges.delete();
  //   // haarFaces.delete();
  // };
  return (
    <div className={"App"}>
      <div
        style={{
          width: "100%",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <div style={{ width: width <= 400 && "100%" }}>
          {isMobile && (
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={"select"}
            >
              <option value={"environment"}>Back Camera</option>
              <option value={"user"}>Front Camera</option>
            </select>
          )}
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight: "400px",
            border: "1px solid black",
          }}
        >
          <QrReader
            delay={500}
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
            facingMode={selected}
            id={"qr"}
          />
        </div>
        <h2>Scanned :- {scanFile}</h2>
        {/*{scanFile && <QRCode value={scanFile || ""} id={"img"} />}*/}
        {url && (
          <div className="image-card">
            <div style={{ margin: "10px" }}>↓↓↓ The original image ↓↓↓</div>
            <img src={url} id={"imgId"} alt={""} />
          </div>
        )}
        {/*{url && (*/}
        {/*  <div className="images-container">*/}
        {/*    <div className="image-card">*/}
        {/*      <div style={{ margin: "10px" }}>↓↓↓ The gray scale image ↓↓↓</div>*/}
        {/*      <canvas ref={grayImgRef} />*/}
        {/*    </div>*/}

        {/*    <div className="image-card">*/}
        {/*      <div style={{ margin: "10px" }}>↓↓↓ Canny Edge Result ↓↓↓</div>*/}
        {/*      <canvas ref={cannyEdgeRef} />*/}
        {/*    </div>*/}

        {/*    /!*<div className="image-card">*!/*/}
        {/*    /!*  <div style={{ margin: "10px" }}>*!/*/}
        {/*    /!*    ↓↓↓ Haar-cascade Face Detection Result ↓↓↓*!/*/}
        {/*    /!*  </div>*!/*/}
        {/*    /!*  <canvas ref={haarFaceImgRef} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default App;
