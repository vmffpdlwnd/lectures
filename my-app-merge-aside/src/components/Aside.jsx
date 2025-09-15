import { useState } from "react";
import styleA from "./Aside.module.css";
import { ASIDE_CONTENT } from "../data/asideContent";

const Aside = ({
  activeTab,
  onSelectBuilding,
  onSelectFacility,
  onSelectItem,
}) => {
  const content = ASIDE_CONTENT[activeTab];
  const [openSections, setOpenSections] = useState({});
  const [openNodes, setOpenNodes] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleNode = (key) => {
    setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isObjectNode = (item) =>
    item && typeof item === "object" && !Array.isArray(item);

  // 재귀 렌더러 (편의시설 전용)
  const renderTreeItems = (items, path = []) => {
    return (
      <ul
        className={styleA.asideList}
        style={{ paddingLeft: path.length ? 12 : 0 }}
      >
        {items.map((item, idx) => {
          if (!isObjectNode(item)) {
            const key = [...path, String(item)].join("/");
            const isLeaf = path.length > 0;
            const handleClick = () => {
              if (!onSelectFacility || !isLeaf) return;
              const topCategory = path[0];
              onSelectFacility(topCategory, String(item));
            };

            return (
              <li
                key={key}
                onClick={isLeaf ? handleClick : undefined}
                style={{ cursor: isLeaf ? "pointer" : "default" }}
              >
                {String(item)}
              </li>
            );
          }

          const nodeKey = [...path, item.label].join("/");
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;
          const opened = !!openNodes[nodeKey];

          const handleLabelClick = () => {
            if (hasChildren) {
              toggleNode(nodeKey);
            } else if (onSelectFacility) {
              onSelectFacility(item.label, item.label);
            }
          };

          return (
            <li key={nodeKey}>
              <div
                onClick={handleLabelClick}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {item.label} {hasChildren ? (opened ? "▲" : "▼") : ""}
              </div>

              {opened && hasChildren && (
                <div>
                  {renderTreeItems(item.children, [...path, item.label])}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (!content) return null;

  return (
    <aside className={styleA.aside}>
      <div className={styleA.asideSection}>
        <h3>{content.title}</h3>

        {content.collapsible ? (
          content.collapsible.map((section, idx) => (
            <div key={idx}>
              <h4
                onClick={() => toggleSection(section.title)}
                style={{ cursor: "pointer" }}
              >
                {section.title} {openSections[section.title] ? "▲" : "▼"}
              </h4>

              {openSections[section.title] && (
                <>
                  {section.title === "건물 목록" && (
                    <ul className={styleA.asideList}>
                      {section.items.map((item, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            onSelectBuilding ? onSelectBuilding(item) : null
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.title === "편의시설" &&
                    renderTreeItems(section.items)}

                  {/* 버스 관련 섹션들 추가 */}
                  {(section.title === "셔틀버스" || 
                    section.title === "버스 노선" || 
                    section.title === "기타 정보") && (
                    <ul className={styleA.asideList}>
                      {section.items.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            if (onSelectItem) onSelectItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <>
            <ul className={styleA.asideList}>
              {content.items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (onSelectItem) onSelectItem(item);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </li>
              ))}
            </ul>
            {content.extra && (
              <>
                <h3>{content.extra.title}</h3>
                <ul className={styleA.asideList}>
                  {content.extra.items.map((item, index) => (
                    <li
                      key={`extra-${index}`}
                      onClick={() => {
                        if (onSelectItem) onSelectItem(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default Aside;