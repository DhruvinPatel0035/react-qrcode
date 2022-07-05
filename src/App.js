import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import "./App.css";

const App = () => {
  const [scanFile, setScanFile] = useState();
  const [selected, setSelected] = useState("environment");
  const [width, setWidth] = useState(window.innerWidth);
  const handleError = (error) => {};
  const handleScan = (result) => {
    if (result) {
      setScanFile(result);
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
  }, []);
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
        {width <= 1280 && (
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className={"select"}
          >
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
        )}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight: "400px",
            border: "1px solid black",
          }}
        >
          <QrReader
            delay={300}
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
            facingMode={selected}
          />
        </div>
        <h2>Scanned :- {scanFile}</h2>
      </div>
    </div>
  );
};

export default App;
