import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { DeleteOutlined } from "@mui/icons-material";

export const DeletePostButton = ({postId, onDeletePost}) => {
  function handleDeleteClick() {
    onDeletePost({postId})
  }

  return (
    <>
      <div className={cn(s.deletePostBtn)} onClick={handleDeleteClick}>
        <DeleteOutlined/>
      </div>
    </>
  );
};