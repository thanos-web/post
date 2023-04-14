import { Button, Stack } from "@mui/material";
// import { Link, useLocation } from "react-router-dom";
// import { useState, useContext } from "react";
// import { PostAddForm } from "../postAddForm/postAddForm"; 
// import { LocalStorageContext } from "../postAddForm/postAddForm";


export const ButtonAdd = () => {
  // const [openDialog, setOpenDialog] = useState(false);
  // const { authorization } = useContext(LocalStorageContext)
  // const location = useLocation()
  const handleClick = () => {
    // setOpenDialog(!openDialog)
  };
  
    return (
      <div>
        <Stack spacing={2} direction="row">
          {/* { authorization &&
            <> */}
           <Button variant="text" color="inherit" onClick={handleClick}>Добавить пост</Button> 
            {/* <PostAddForm openDialog={openDialog} onClose={handleClick} onClick={handleClick}/>
            </>}   */}

{/* <Link to > </Link> */}
        </Stack>
      </div>
    )
    }
  
  