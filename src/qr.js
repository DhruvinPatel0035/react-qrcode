import React, { useState, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import cv from "opencv.js";
import { Buffer } from "buffer";
import "./App.css";
const Qr = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [imgId, setImgId] = useState("");
  const codeReader = new BrowserQRCodeReader();
  useEffect(() => {
    codeReader
      ?.getVideoInputDevices()
      ?.then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const setupDevices = (videoInputDevices) => {
    setSelectedDeviceId(videoInputDevices[0].deviceId);
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  };
  const saveImageHandler = (id, url) => {
    const updateData = {
      id: id,
      url: url,
    };
    setImageUrls([...imageUrls, updateData]);
  };
  const decodeContinuously = (selectedDeviceId) => {
    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      "video",
      (result, err) => {
        if (result) {
          const canvas = document.getElementsByTagName("canvas")[0];
          const video = document.getElementsByTagName("video")[0];
          const context = canvas.getContext("2d");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const data = canvas.toDataURL("image/png", 1.0);
          const urls = [data];
          localStorage.setItem("image", JSON.stringify(urls));
          const id = `Img-${Math.floor(Math.random() * 5000)}`;
          setImgId(id);
          saveImageHandler(id, data);
          const base64data = data
            .replace("data:image/jpeg;base64", "")
            .replace("data:image/png;base64", "");
          const buffer = Buffer?.from(base64data, "base64");
          console.log("IMAGE src buffer =====>", buffer);
          try {
            const image = cv.imdecode(new cv.Mat(buffer, cv.IMREAD_COLOR), 0);
            console.log("IMAGE", image);
          } catch (e) {
            console.log("Error ====>", e);
          }
          setCode(result.text);
        }
      }
    );
  };
  useEffect(() => {
    decodeContinuously(selectedDeviceId);
  }, [selectedDeviceId]);
  return (
    <div className="App">
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
        {imageUrls.length > 0 && (
          <div>
            <select
              id="sourceSelect"
              onChange={(img) => {
                setImgId(img.target.value);
              }}
              className={"select"}
            >
              {imageUrls.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.id}
                </option>
              ))}
            </select>
          </div>
        )}
        <div style={{ width: width <= 400 && "100%" }}>
          {width <= 400 && (
            <select
              id="sourceSelect"
              onChange={(sourceSelect) => {
                setSelectedDeviceId(sourceSelect?.value);
              }}
              className={"select"}
            >
              {videoInputDevices.map((element) => (
                <option value={element.deviceId} key={element.deviceId}>
                  {element.label}
                </option>
              ))}
            </select>
          )}
        </div>
        <div
          style={{
            width: "auto",
            border: "1px solid black",
          }}
        >
          <video id="video" width={"400px"} height={"400px"} />
          <canvas
            style={{ display: "none" }}
            width={"400px"}
            height={"400px"}
          />
        </div>
        <h2 id="result">Result:{code}</h2>
        {imageUrls
          ?.filter((item) => item?.id === imgId)
          ?.map((img) => {
            return (
              <a
                className="image-card"
                style={{ width: "400px" }}
                href={img.url}
                download
                key={img.id}
              >
                <img
                  src={img.url}
                  id={"imgId"}
                  alt={`${img.id}`}
                  width={"400px"}
                  height={"400px"}
                  key={img.id}
                />
              </a>
            );
          })}
      </div>
    </div>
  );
};
export default Qr;
