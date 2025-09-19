// FILE: src/App.js
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {Nav} from "./components/Nav";
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

import { makeSearchIndex } from "./utils/searchIndex";
import { texts } from "./utils/texts";

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
  max-height: 600px; /* 지도와 동일한 높이로 제한 */
`;

function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [detail, setDetail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lang, setLang] = useState("ko");

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === "ko" ? "en" : "ko"));
  };

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
  const searchIndexData = useMemo(() => makeSearchIndex(), []);

  const runSearch = (query) => {
    const hit = searchIndexData.search(query);
    if (!hit) {
      console.log(texts[lang].nav.searchNoResult);
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

    waitUntil(() => ready && !!mapRef.current).then(() => {
      if (hit.type === "building") handleSelectBuilding(hit.name);
      else if (hit.type === "facility")
        handleSelectFacility(hit.category, hit.item);
    });

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
        lang={lang}
        texts={texts[lang]}
        onToggleLang={toggleLang}
      />
      <Container>
        <Aside
          activeTab={activeTab}
          onSelectBuilding={handleSelectBuilding}
          onSelectFacility={handleSelectFacility}
          onSelectItem={setSelectedItem}
          texts={texts[lang]}
        />

        <div style={{ padding: "20px", flexGrow: 1 }}>
          {/* ✅ 변경: 지도/상세 패널을 가로 배치 */}
          <MapSection active={activeTab === "map"}>
            <MapLayout>
              <MapBox>
                <MapView id="map" height={600} />
              </MapBox>
              <DetailBox>
                <MapDetailPanel detail={detail} texts={texts[lang].mapDetails} />
              </DetailBox>
            </MapLayout>
          </MapSection>

          {activeTab === "bus" && <BusInfo selected={selectedItem} texts={texts[lang]} />}

          {activeTab === "newB" && (
            <>
              {selectedItem === "학사일정" && <CalendarPage texts={texts[lang].calendarPage} />}
              {selectedItem === "OT 안내" && <OtInfo texts={texts[lang].otInfo} />}
              {!selectedItem && (
                <div style={{ padding: 20, color: "#666" }}>
                  {texts[lang].newB.notSelected}
                </div>
              )}
            </>
          )}

          {activeTab === "club" && (
            <>
              {selectedItem === texts[lang].aside.club.items[0] && <ClubHub texts={texts[lang].clubDetails.centralClub} />}
              {selectedItem === texts[lang].aside.club.items[1] && (
                <div style={{ padding: 20 }}>
                  <h2>{texts[lang].clubDetails.howToJoin.title}</h2>
                  <p>{texts[lang].clubDetails.howToJoin.body}</p>
                </div>
              )}
              {!selectedItem && (
                <div style={{ padding: 20, color: "#666" }}>
                  {texts[lang].clubDetails.selectPrompt}
                </div>
              )}
            </>
          )}

          {activeTab === "assist" && <AssistDetail selected={selectedItem} texts={texts[lang]} />}
        </div>
      </Container>
    </>
  );
}

export default App;