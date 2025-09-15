// FILE: src/App.js
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import { useKakaoMap } from "./map/useKakaoMap";
import { MAP_CENTER, DEFAULT_LEVEL } from "./utils/constants";
import MapView from "./features/map/MapView";
import {
  makeHandleSelectBuilding,
  makeHandleSelectFacility,
} from "./features/map/handlers";
import MapDetailPanel from "./components/MapDetailPanel";
import BusInfo from "./components/BusInfo";
import CalendarPage from "./components/CalendarPage";
import OtInfo from "./components/OtInfo";
import ClubHub from "./components/ClubHub";
import AssistDetail from "./components/AssistDetail";

import { makeSearchIndex, searchIndex } from "./utils/searchIndex";
import "simplebar-react/dist/simplebar.min.css";

const Container = styled.div`
  display: flex;
`;

// ✅ 기존: 탭 전환 시 map 섹션만 표시
const MapSection = styled.div`
  width: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
`;

// ✅ 추가: 지도와 패널을 옆으로 배치
const MapLayout = styled.div`
  display: flex;
  gap: 16px;
`;

const MapBox = styled.div`
  flex: 2; /* 지도 공간 크게 */
`;

const DetailBox = styled.div`
  flex: 1; /* 설명 공간 */
  overflow-y: auto;
`;

function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [detail, setDetail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Kakao 지도 훅
  const { mapRef, markerRef, infoRef, ready, relayout } = useKakaoMap({
    activeTab,
    containerId: "map",
    center: MAP_CENTER,
    level: DEFAULT_LEVEL,
  });

  const handleSelectBuilding = makeHandleSelectBuilding({
    mapRef,
    markerRef,
    infoRef,
    ready,
    onDetail: setDetail,
  });
  const handleSelectFacility = makeHandleSelectFacility({
    mapRef,
    markerRef,
    infoRef,
    ready,
    onDetail: setDetail,
  });

  // 검색 인덱스 준비
  const index = useMemo(() => makeSearchIndex(), []);

  // 검색 실행
  const runSearch = async (query) => {
    const hit = searchIndex(index, query);
    if (!hit) {
      alert("검색 결과가 없습니다. (건물/편의시설 위주로 검색해보세요)");
      return;
    }
    setActiveTab("map");

    // 지도 준비 대기
    const waitUntil = (cond, ms = 50, tries = 40) =>
      new Promise((res) => {
        let n = 0;
        const t = setInterval(() => {
          if (cond() || n++ > tries) {
            clearInterval(t);
            res();
          }
        }, ms);
      });

    await waitUntil(() => ready && !!mapRef.current);

    if (hit.type === "building") handleSelectBuilding(hit.name);
    else if (hit.type === "facility")
      handleSelectFacility(hit.category, hit.item);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 맵 탭으로 돌아올 때 relayout 호출 (존재 시)
  useEffect(() => {
    if (activeTab === "map" && ready && typeof relayout === "function") {
      requestAnimationFrame(() => relayout());
    }
  }, [activeTab, ready, relayout]);

  return (
    <>
      <Nav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={runSearch}
      />
      <Container>
        <Aside
          activeTab={activeTab}
          onSelectBuilding={handleSelectBuilding}
          onSelectFacility={handleSelectFacility}
          onSelectItem={setSelectedItem}
        />

        <div style={{ padding: "20px", flexGrow: 1 }}>
          {/* ✅ 변경: 지도/상세 패널을 가로 배치 */}
          <MapSection active={activeTab === "map"}>
            <MapLayout>
              <MapBox>
                <MapView id="map" height={600} />
              </MapBox>
              <DetailBox>
                <MapDetailPanel detail={detail} />
              </DetailBox>
            </MapLayout>
          </MapSection>

          {activeTab === "bus" && <BusInfo selected={selectedItem} />}

          {activeTab === "newB" && (
            <>
              {selectedItem === "학사일정" && <CalendarPage />}
              {selectedItem === "OT 안내" && <OtInfo />}
            </>
          )}

          {activeTab === "club" && (
            <>
              {selectedItem === "중앙동아리" && <ClubHub />}
              {selectedItem === "가입방법" && (
                <div style={{ padding: 20 }}>
                  <h2>동아리 가입방법</h2>
                  <p>
                    중앙동아리 부스/SNS/학생회관 동아리실을 통해 문의 후
                    가입서를 제출하세요.
                  </p>
                </div>
              )}
              {!selectedItem && (
                <div style={{ padding: 20, color: "#666" }}>
                  좌측에서 <b>중앙동아리</b> 또는 <b>가입방법</b>을 선택하세요.
                </div>
              )}
            </>
          )}

          {activeTab === "assist" && <AssistDetail selected={selectedItem} />}
        </div>
      </Container>
    </>
  );
}

export default App;
