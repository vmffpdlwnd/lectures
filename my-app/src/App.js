import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import AsideCampus from "./AsideCampus";
import AsideBus from "./AsideBus";
import AsideFreshman from "./AsideFreshman";
import AsideClub from "./AsideClub";
import AsideSupport from "./AsideSupport";
import "./App.css";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [activeTab, setActiveTab] = useState("map");

  useEffect(() => {
    if (activeTab === "map") {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=14216e37d0aab6cbf25280c28858ec8b&autoload=false";
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              37.193538386212296,
              127.02352860043403
            ),
            level: 3,
          };
          new window.kakao.maps.Map(container, options);
        });
      };
      document.head.appendChild(script);
    }
  }, [activeTab]);

  return (
    <>
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container>
        {/* 각 탭에 따른 사이드바 */}
        {activeTab === "map" && <AsideCampus />}
        {activeTab === "bus" && <AsideBus />}
        {activeTab === "newB" && <AsideFreshman />}
        {activeTab === "club" && <AsideClub />}
        {activeTab === "assist" && <AsideSupport />}

        {/* 우측 메인 컨텐츠 */}
        <div style={{ padding: "20px", flexGrow: 1 }}>
          {activeTab === "map" && (
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
          )}
          {activeTab === "bus" && (
            <img
              src={require("./images/hanshinMap.png")}
              alt="한신대학교 버스 노선도"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
