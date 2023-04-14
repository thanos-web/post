import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button } from '@mui/material';

export const CreatePostButton = ({isEditMode, onEditModeChange, onOk, onCancel}) => {
  const {user} = useContext(CurrentUserContext)

  function handleOkClick() {
    onEditModeChange()
    onOk()
  }
  function handleCancelClick() {
    onEditModeChange()
    onCancel()
  }

  return (
    <>
      {isEditMode === false && <div><Button onClick={onEditModeChange}><BorderColorIcon /></Button></div>}
      {isEditMode === true && <div className="row">
        <Button type="primary" onClick={handleOkClick}>Сохранить</Button>
        <Button onClick={handleCancelClick}>Отменить</Button>
      </div>}  
    </>
  );
};