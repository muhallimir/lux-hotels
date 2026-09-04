import React from "react";

const PageBreadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" style={{ padding: "12px 16px", fontSize: 13 }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={i}
              style={{ display: "flex", alignItems: "center" }}
              aria-current={isLast ? "page" : undefined}
            >
              {item.href && !isLast ? (
                <a href={item.href} style={{ textDecoration: "underline" }}>
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {!isLast && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumbs;
