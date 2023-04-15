import { Button, Stack } from "@mui/material";
import { PostAddForm } from "../postAddForm/postAddForm";
import {useState} from "react";


export const ButtonAdd = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleOpenModal = () => {
    setOpenDialog(!openDialog);   
  };
  
  
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text" color="inherit" onClick={handleOpenModal}>Добавить пост</Button>
            <PostAddForm open></PostAddForm>
        </Stack>
    )
    }
  