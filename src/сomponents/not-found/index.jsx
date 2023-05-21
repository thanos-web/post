import { Button } from '@mui/material';
import { ReactComponent as NotFoundIcon } from './ic-notfound.svg';


import s from "./styles.module.css";
export function NotFound({ children, title, buttonText = "На главную" }) {
  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} aria-hidden="true" />
      <h1 className={s.title}>{title}</h1>
      {children && children}
      <Button  href="/"variant="outlined" sx={{ marginTop: '20px',color:"black"}}>{buttonText}</Button>
    </div>
  )
}