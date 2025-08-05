import { useState } from "react";

const AsideCampus = () => {
  const [showBuildings, setShowBuildings] = useState(true);
  const [showFood, setShowFood] = useState(true);
  const [showEtc, setShowEtc] = useState(true);

  return (
    <div id="aside">
      {/* 건물 */}
      <div className="asideCampus-section">
        <h3
          onClick={() => setShowBuildings((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          건물 {showBuildings ? "▲" : "▼"}
        </h3>
        {showBuildings && (
          <ul className="asideCampus-list">
            <li>장공관(본관)</li>
            <li>필현관</li>
            <li>만우관</li>
            <li>샬롬채플</li>
            <li>임마누엘관(학생회관)</li>
            <li>경삼관(도서관)</li>
            <li>송암관</li>
            <li>소통관</li>
            <li>학습실습동</li>
            <li>한울관(체육관)</li>
            <li>성빈학사(생활관)</li>
            <li>새롬터</li>
            <li>해오름관</li>
            <li>정준하통일관</li>
            <li>늦봄관</li>
          </ul>
        )}
      </div>

      {/* 식음료 */}
      <div className="asideCampus-section">
        <h3
          onClick={() => setShowFood((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          식음료 {showFood ? "▲" : "▼"}
        </h3>
        {showFood && (
          <ul className="asideCampus-list">
            <li>식당</li>
            <li>카페/편의점</li>
          </ul>
        )}
      </div>

      {/* 기타 */}
      <div className="asideCampus-section">
        <h3
          onClick={() => setShowEtc((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          기타 {showEtc ? "▲" : "▼"}
        </h3>
        {showEtc && (
          <ul className="asideCampus-list">
            <li>은행/ATM/우체국</li>
            <li>병원/약국</li>
            <li>서점/문구</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AsideCampus;
