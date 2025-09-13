// FILE: src/components/Nav.jsx
import logo from "../images/hanshin.png";
import styles from "./Nav.module.css";
import { useState } from "react";

const Nav = ({ activeTab, setActiveTab, onSearch }) => {
  const [query, setQuery] = useState("");

  const tabs = [
    { id: "map", label: "캠퍼스 맵" },
    { id: "bus", label: "버스" },
    { id: "newB", label: "재학생" },
    { id: "club", label: "동아리" },
    { id: "assist", label: "학생지원" },
  ];

  const submit = () => {
    if (!query.trim()) return;
    onSearch && onSearch(query.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <header className={styles.header}>
      <div className={styles["top-bar"]}>
        <div className={styles["logo"]}>
          <img src={logo} alt="한신대학교 로고" width="80" height="60" />
        </div>
        <div className={styles["search-box"]}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className={styles["search-icon"]}
            onClick={submit}
            aria-label="검색"
          >
            🔍
          </button>
        </div>
        <button className={styles["lang-btn"]}>English</button>
      </div>

      <nav className={styles["nav-bar"]}>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? styles["active-tab"] : ""}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
