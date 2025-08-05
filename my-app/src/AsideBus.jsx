const AsideBus = () => {
  return (
    <div id="aside">
      <div className="aside-section">
        <h3>버스 노선</h3>
        <ul className="aside-list">
          <li>5511: 서울대 ↔ 흑석동</li>
          <li>5513: 서울대 ↔ 백산아파트</li>
        </ul>
      </div>
      <div className="aside-section">
        <h3>셔틀버스</h3>
        <ul className="aside-list">
          <li>통학 셔틀</li>
          <li>야간 셔틀</li>
        </ul>
      </div>
    </div>
  );
};

export default AsideBus;
