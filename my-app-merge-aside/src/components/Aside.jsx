// FILE: src/components/Aside.jsx
import { useState } from "react";
import styleA from "./Aside.module.css";

const Aside = ({
  activeTab,
  onSelectBuilding,
  onSelectFacility,
  onSelectItem,
  texts, // ✅ texts props를 사용합니다.
}) => {
  const content = texts.aside[activeTab]; // ✅ texts 객체에서 aside content를 가져옵니다.
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
              onSelectFacility && onSelectFacility(item.label, null);
            } else if (onSelectFacility) {
              onSelectFacility(item.label, item.label);
            }
          };

          return (
            <li key={nodeKey}>
              <button
                type="button"
                className={styleA.treeButton}
                onClick={handleLabelClick}
                aria-expanded={opened}
              >
                <span
                  className={styleA.caret}
                  data-open={opened ? "true" : "false"}
                />
                <span>{item.label}</span>
              </button>

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
        <h3 className={styleA.title}>{content.title}</h3>

        {content.collapsible ? (
          content.collapsible.map((section, idx) => {
            const opened = !!openSections[section.title];
            return (
              <div key={idx} className={styleA.section}>
                <button
                  type="button"
                  className={styleA.sectionButton}
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={opened}
                >
                  <span
                    className={styleA.caret}
                    data-open={opened ? "true" : "false"}
                  />
                  <span>{section.title}</span> {/* ✅ 번역된 텍스트를 사용합니다. */}
                </button>

                {opened && (
                  <>
                    {/* "건물 목록" 섹션 */}
                    {texts.aside.map.collapsible[0].title === section.title && (
                      <ul className={styleA.asideList}>
                        {section.items.map((item, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              className={styleA.itemButton}
                              onClick={() =>
                                onSelectBuilding ? onSelectBuilding(item) : null
                              }
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* "편의시설" 섹션 */}
                    {texts.aside.map.collapsible[1].title === section.title &&
                      renderTreeItems(section.items)}

                    {/* 버스 관련 섹션들 */}
                    {(texts.aside.bus.collapsible[0].title === section.title ||
                      texts.aside.bus.collapsible[1].title === section.title ||
                      texts.aside.bus.collapsible[2].title === section.title) && (
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
            );
          })
        ) : (
          <>
            <ul className={styleA.asideList}>
              {content.items.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={styleA.itemButton}
                    onClick={() => {
                      if (onSelectItem) onSelectItem(item);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {content.extra && (
              <>
                <h3 className={styleA.subTitle}>{content.extra.title}</h3>
                <ul className={styleA.asideList}>
                  {content.extra.items.map((item, index) => (
                    <li key={`extra-${index}`}>
                      <button
                        type="button"
                        className={styleA.itemButton}
                        onClick={() => {
                          if (onSelectItem) onSelectItem(item);
                        }}
                      >
                        {item}
                      </button>
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