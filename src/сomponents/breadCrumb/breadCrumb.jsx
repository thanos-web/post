import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LocalStorageContext } from "../app/index";

export default function BasicBreadcrumbs() {
  const { token } = useContext(LocalStorageContext)
  return (
      <div>
        {token &&
            <Breadcrumbs aria-label="breadcrumb">
                <Link to={'/'}>Главная</Link>
                <Link to={'/mypostList'}>Мои посты</Link>
            </Breadcrumbs>    }
      </div>
  )
}