import { Button, Stack } from "@mui/material";

export const ButtonAdd = () => {
  const handleOpenModal = () => {
    console.log("Есть контакт");
  };
  
  
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text" color="inherit" onClick={handleOpenModal}>Добавить пост</Button>
        </Stack>
    )
    }
  
