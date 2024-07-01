import axios from "axios";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import API from "../../constants/apiConstants";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const useTableData = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortField, setSortField] = useState<"postId" | "name" | "email">(
    "postId"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");

  const fetchComments = useCallback(() => {
    axios
      .get(API.CommentAPI)
      .then((r) => {
        return r.data;
      })
      .then(setComments);
  }, [setComments]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const savedSearch = localStorage.getItem("search") || "";
    const savedSortOrder =
      (localStorage.getItem("sortOrder") as "asc" | "desc") || "asc";
    const savedSortField =
      (localStorage.getItem("sortField") as "postId" | "name" | "email") ||
      "postId";
    const savedPage = Number(localStorage.getItem("page")) || 0;
    const savedRowsPerPage = Number(localStorage.getItem("rowsPerPage")) || 10;

    setSearch(savedSearch);
    setSortOrder(savedSortOrder);
    setPage(savedPage);
    setRowsPerPage(savedRowsPerPage);
    setSortField(savedSortField);
  }, []);

  const handleSortChange = useCallback(
    (field: "postId" | "name" | "email") => {
      if (field === sortField) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        localStorage.setItem("sortOrder", sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        localStorage.setItem("sortField", field);
        setSortOrder("asc");
        localStorage.setItem("sortOrder", "asc");
      }
      switch (field) {
        case "postId":
          comments.sort((a, b) => {
            if (sortOrder === "desc") {
              return a.postId - b.postId;
            } else {
              return b.postId - a.postId;
            }
          });
          break;
        case "name":
          comments.sort((a, b) => {
            if (sortOrder === "desc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
          break;
        case "email":
          comments.sort((a, b) => {
            if (sortOrder === "desc") {
              return a.email.localeCompare(b.email);
            } else {
              return b.email.localeCompare(a.email);
            }
          });
          break;
      }
      setComments([...comments]);
    },
    [setSortField, setSortOrder, sortOrder, sortField, comments, setComments]
  );

  const filteredComments = useMemo(() => {
    if (search === "") {
      return comments;
    } else {
      return comments.filter((comment) => {
        return (
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()) ||
          comment.body.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  }, [comments, search]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      localStorage.setItem("search", e.target.value);
    },
    [setSearch]
  );

  const commentsPerPage = useMemo(() => {
    return filteredComments.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredComments, page, rowsPerPage]);

  const totalPage = useMemo(() => {
    return Math.ceil(filteredComments.length / rowsPerPage);
  }, [filteredComments, rowsPerPage]);

  const totalRecords = useMemo(() => {
    return filteredComments.length;
  }, [filteredComments]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    commentsPerPage,
    totalPage,
    sortField,
    sortOrder,
    handleSortChange,
    totalRecords,
    search,
    handleSearchChange,
  };
};
