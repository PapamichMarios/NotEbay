package com.dit.ebay.util;

import com.dit.ebay.model.Category;

public interface RecursiveQueries {
    String hierarchyPathQuery = String.format(
            " WITH RECURSIVE category_path (id, name, path) AS " +
            " ( " +
            "  SELECT id, name, name as path " +
            "    FROM categories " +
            "    WHERE parent_id IS NULL " +
            "  UNION ALL " +
            "  SELECT c.id, c.name, CONCAT(cp.path, ' > ', c.name) " +
            "    FROM category_path AS cp JOIN categories AS c " +
            "      ON cp.id = c.parent_id " +
            " ) " +
            "SELECT * FROM category_path " +
            "ORDER BY path;");

    String hierarchyLevelQuery = String.format(
            " WITH RECURSIVE category_path (id, name, lvl) AS " +
            " ( " +
            "  SELECT id, name, 0 lvl " +
            "    FROM categories " +
            "    WHERE parent_id IS NULL " +
            "  UNION ALL " +
            "  SELECT c.id, c.name, cp.lvl + 1 " +
            "    FROM category_path AS cp JOIN categories AS c " +
            "      ON cp.id = c.parent_id " +
            " ) " +
            "SELECT * FROM category_path as ctp where ctp.lvl <= ? " +
            "ORDER BY lvl;");

    String hierarchyOfCategoryQuery = String.format(
            " WITH RECURSIVE category_path (id, name, parent_id) AS " +
            "(" +
            "  SELECT id, name, parent_id " +
            "    FROM categories " +
            "    WHERE id = ? " +
            "  UNION ALL " +
            "  SELECT c.id, c.name, c.parent_id " +
            "    FROM category_path AS cp JOIN categories AS c " +
            "      ON cp.parent_id = c.id " +
            " ) " +
            "SELECT * FROM category_path;");
}
