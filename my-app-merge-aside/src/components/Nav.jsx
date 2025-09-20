// FILE: src/components/Nav.jsx
import logo from "../images/hanshin.png";
import styles from "./Nav.module.css";
import { useState } from "react";

// ✅ export 방식 수정
export const Nav = ({ activeTab, setActiveTab, onSearch, texts, onToggleLang }) => {
  const [query, setQuery] = useState("");

  const tabs = [
    { id: "map", label: texts.aside.map.title },
    { id: "bus", label: texts.aside.bus.title },
    { id: "newB", label: texts.aside.newB.title },
    { id: "club", label: texts.aside.club.title },
    { id: "assist", label: texts.aside.assist.title },
  ];

  const submit = () => {
    if (!query.trim()) return;
    onSearch && onSearch(query.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };

  const goToHome = () => {
    setActiveTab("map");
  };

  return (
    <header className={styles.header}>
      <div className={styles["top-bar"]}>
        <div className={styles["logo"]} onClick={goToHome} style={{ cursor: "pointer" }}>
          <img src={logo} alt={texts.nav.logoAlt} width="80" height="60" />
        </div>
        <div className={styles["search-box"]}>
          <input
            type="text"
            placeholder={texts.nav.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className={styles["search-icon"]}
            onClick={submit}
            aria-label={texts.nav.searchAriaLabel}
          >
            🔍
          </button>
        </div>
        <button className={styles["lang-btn"]} onClick={onToggleLang}>
          {texts.nav.langButton}
        </button>
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