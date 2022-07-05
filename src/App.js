import React, { useState, useEffect } from "react";
// import QRCode from "qrcode";
// import Scanner from "react-webcam-qr-scanner";
import { QrReader } from "react-qr-reader";
// import QrReader from "react-qr-scanner";
import "./App.css";

const App = () => {
  const [scanFile, setScanFile] = useState();
  const [selected, setSelected] = useState("environment");
  // const [scanQrCode, setScanQrcode] = useState(false);
  // const qrRef = useRef(null);
  // const onScanFile = () => {
  //   qrRef.current?.openImageDialog();
  // };
  // console.log("qrRef ==>", qrRef);
  // const ref = useRef(null);
  // const [text, setText] = useState("");
  // const [imgUrl, setImgUrl] = useState("");
  // const generateQrcodeHandler = async () => {
  //   try {
  //     const res = await QRCode.toDataURL(text);
  //     setImgUrl(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //
  // const scanQRHandler = () => {
  //   setScanQrcode(!scanQrCode);
  //   console.log("qrRef");
  // };

  const handleError = (error) => {};
  const handleScan = (result) => {
    if (result) {
      setScanFile(result);
    }
  };
  // let localstream;

  // useEffect(() => {
  //   let vid = document.getElementById("vid");
  //   if (navigator.mediaDevices.getUserMedia !== null) {
  //     const options = {
  //       video: true,
  //       audio: true,
  //     };
  //     navigator.getUserMedia(
  //       options,
  //       function (stream) {
  //         vid.srcObject = stream;
  //         localstream = stream;
  //         vid.play();
  //         console.log(stream, "streaming");
  //       },
  //       function (e) {
  //         console.log("background error : " + e.name);
  //       }
  //     );
  //   }
  // });
  let imageCapture;
  const onGetUserMediaButtonClick = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        document.querySelector("video").srcObject = mediaStream;

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
      })
      .catch((error) => console.log(error));
  };
  console.log("imageCapture", imageCapture);
  useEffect(() => {
    onGetUserMediaButtonClick();
  });
  // const capOff = () => {
  //   let vid = document?.getElementById("vid");
  //   localstream?.getTracks()?.forEach((x) => x.stop());
  //   console.log("all capture devices off", localstream);
  //   if (vid) {
  //     console.log("vid", vid);
  //     vid.pause();
  //     vid.src = "";
  //   }
  // };
  //
  // const camON = () => {
  //   let vid = document.getElementById("vid");
  //   console.log("vid", vid);
  //   console.log("navigator", navigator);
  //   if (navigator.mediaDevices.getUserMedia !== null) {
  //     const options = {
  //       video: true,
  //       audio: true,
  //     };
  //     navigator.getUserMedia(
  //       options,
  //       function (stream) {
  //         console.log("stream", stream);
  //         vid.srcObject = stream;
  //         localstream = stream;
  //         vid.play();
  //         console.log(stream, "streaming");
  //       },
  //       function (e) {
  //         console.log("background error : " + e.name);
  //       }
  //     );
  //   }
  // };

  return (
    <div className={"App"}>
      <div
        style={{
          width: "70%",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <select onChange={(e) => setSelected(e.target.value)}>
          <option value={"environment"}>Back Camera</option>
          <option value={"user"}>Front Camera</option>
        </select>
        {/*{scanQrCode && (*/}
        <div
          style={{
            width: "450px",
            height: "450px",
            border: "1px solid black",
          }}
        >
          <QrReader
            videoId={"video"}
            // ref={qrRef}
            scanDelay={300}
            onResult={(result, error, codeReader) => {
              if (!!result) {
                handleScan(result?.text);
              }
              if (result) {
                if (!!error) {
                  handleError(error);
                }
              }
            }}
            // style={{ width: "300px", height: "300px" }}
            style={{ width: "100%" }}
            facingMode={selected}
          />
        </div>
        <div style={{ display: "flex", columnGap: "10px" }}>
          {/*<button onClick={capOff}>Turn Capture Off</button>*/}
          {/*<button onClick={camON}>Turn Capture ON</button>*/}
        </div>
        {/*)}*/}
        {/*<button onClick={onScanFile}>Scan QR</button>*/}
        <h2>Scanned :- {scanFile}</h2>
      </div>
      {/*// generate Qrcode*/}
      {/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
      {/*  <div style={{display:'flex'}}>*/}
      {/*    <input*/}
      {/*      type={"text"}*/}
      {/*      value={text}*/}
      {/*      placeholder={"Enter text here"}*/}
      {/*      onChange={(e) => setText(e.target.value)}*/}
      {/*    />*/}
      {/*    <button onClick={generateQrcodeHandler}>Generate</button>*/}
      {/*  </div>*/}
      {/*  {imgUrl && (*/}
      {/*    <a href={imgUrl} download>*/}
      {/*      <img src={imgUrl} alt={"img"} />*/}
      {/*    </a>*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*<button>Scan Qr code</button>*/}
      {/*<QrReader*/}
      {/*  ref={ref}*/}
      {/*  delay={300}*/}
      {/*  style={{ width: "100%" }}*/}
      {/*  onError={handleError}*/}
      {/*  onScan={handleScan}*/}
      {/*  legacyMode*/}
      {/*/>*/}
    </div>
  );
};

export default App;
