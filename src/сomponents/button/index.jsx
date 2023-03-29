
import { Add} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

export const ButtonAdd = () => {
  const handleOpenModal = () => {

  };


  return (
    <Stack spacing={2} direction="row">
        {/* <Button variant="text" color="inherit" onClick={handleOpenModal}>Добавить пост</Button> */}
        <Button variant="contained" onClick={handleOpenModal} endIcon={<Add/>}>
      Добавить пост
    </Button>
    </Stack>

  )
}

