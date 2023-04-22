import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { ModalFormContext } from "../../contexts/header-context";

export const ButtonAdd = () => {

  const {ChangeModalFormStatus} = useContext(ModalFormContext)

  const handleOpenModal = () => {
    ChangeModalFormStatus(true)
  };
    
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text" color="inherit" onClick={handleOpenModal}>Добавить пост</Button>
        </Stack>
    )
    }
  
