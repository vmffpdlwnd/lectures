import logo from "./images/hanshin.png";
const Nav = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="한신대학교 로고" width="80" height="60" />
        </div>
        <div className="search-box">
          <input type="text" placeholder="검색어를 입력하세요" />
          <button className="search-icon">🔍</button>
        </div>
        <button className="lang-btn">English</button>x
      </div>
      <nav className="nav-bar">
        <nav className="nav-bar">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("map")}
                className={activeTab === "map" ? "active-tab" : ""}
              >
                캠퍼스 맵
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("bus")}
                className={activeTab === "bus" ? "active-tab" : ""}
              >
                버스
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("newB")}
                className={activeTab === "newB" ? "active-tab" : ""}
              >
                신입생
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("club")}
                className={activeTab === "club" ? "active-tab" : ""}
              >
                동아리
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("assist")}
                className={activeTab === "assist" ? "active-tab" : ""}
              >
                학생지원
              </button>
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  );
};

export default Nav;
