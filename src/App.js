import React, { useState, useEffect } from "react";
// import QRCode from "qrcode";
// import Scanner from "react-webcam-qr-scanner";
import QrReader  from "react-qr-reader";
// import QrReader from "react-qr-scanner";
import "./App.css";

const App = () => {
  const [scanFile, setScanFile] = useState();
  const [selected, setSelected] = useState("environment");
  const [width, setWidth] = useState(window.innerWidth);
  // const [isMobile, setIsMobile] = useState(false);
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
  // let imageCapture;
  // const onGetUserMediaButtonClick = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((mediaStream) => {
  //       document.querySelector("video").srcObject = mediaStream;
  //
  //       const track = mediaStream.getVideoTracks()[0];
  //       imageCapture = new ImageCapture(track);
  //     })
  //     .catch((error) => console.log(error));
  // };
  // console.log("imageCapture", imageCapture);
  // useEffect(() => {
  //   onGetUserMediaButtonClick();
  // });
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  // console.log("isMobile ==>", isMobile);
  // const updateSize = () => {
  //   if (width < 1024) {
  //     setIsMobile(true);
  //   } else if (width > 1024) {
  //     setIsMobile(false);
  //   }
  // };
  // useEffect(() => {
  //   updateSize();
  // }, [width]);
  console.log("selected", selected);
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
        {width < 1024 && (
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
            <option value={"right"}>Right Camera</option>
            <option value={"left"}>Left Camera</option>
          </select>
        )}
        {/*{scanQrCode && (*/}
        <div
          style={{
            minWidth: "300px",
            minHeight: "300px",
            border: "1px solid black",
          }}
        >
          <QrReader
            // videoId={"video"}
            // ref={qrRef}
            // scanDelay={300}
            // onResult={(result, error, codeReader) => {
            //   if (!!result) {
            //     handleScan(result?.text);
            //   }
            //   if (result) {
            //     if (!!error) {
            //       handleError(error);
            //     }
            //   }
            // }}
            delay={300}
            onScan={handleScan}
            onError={handleError}
            // style={{ width: "300px", height: "300px" }}
            style={{ width: "100%" }}
            facingMode={selected}
            // constraints={{
            //   facingMode: selected,
            // }}
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
