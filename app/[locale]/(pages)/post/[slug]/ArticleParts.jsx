"use client";

import React, { useState } from "react";
import { BookOpen, ChevronRight, ChevronDown } from "lucide-react";
import styles from "@/sass/pages/blog/article-parts.module.scss";

const tocItems = [
  {
    id: "intro",
    title: "Introduction to Swift UI",
    active: true,
  },
  {
    id: "why",
    title: "Why Swift UI Matters",
  },
  {
    id: "features",
    title: "Key Features",
    children: [
      { id: "syntax", title: "Declarative Syntax" },
      { id: "preview", title: "Live Preview" },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
  },
  {
    id: "best-practices",
    title: "Best Practices",
  },
  {
    id: "conclusion",
    title: "Conclusion",
  },
];

const ArticleParts = () => {
  const [expandedIds, setExpandedIds] = useState(["intro", "features"]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.tocContainer}>
      <header className={styles.header}>
        <BookOpen size={20} strokeWidth={2.5} className={styles.headerIcon} />
        <h3 className={styles.headerTitle}>In This Article</h3>
      </header>

      <div className={styles.divider} />

      <nav className={styles.nav}>
        {tocItems.map((item) => {
          const isExpanded = expandedIds.includes(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.id} className={styles.itemGroup}>
              <button
                onClick={() => toggleExpand(item.id)}
                className={`${styles.navItem} ${item.active ? styles.active : ""}`}
              >
                <span className={styles.chevron}>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className={styles.title}>{item.title}</span>
              </button>

              {hasChildren && isExpanded && (
                <div className={styles.subItems}>
                  {item.children.map((sub) => (
                    <button key={sub.id} className={styles.subNavItem}>
                      <span className={styles.chevron}>
                        <ChevronRight size={16} />
                      </span>
                      <span className={styles.title}>{sub.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={styles.footerDivider} />

      <footer className={styles.footer}>
        <span className={styles.readingTime}>8 min read</span>
      </footer>
    </div>
  );
};

export default ArticleParts;
