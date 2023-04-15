import { Button } from '@mui/material';
import { ReactComponent as NotFoundIcon } from './image/ic-notfound.svg';

import s from "./styles.module.css";
export function NotFound({ children, title, buttonText = "На главную", buttonAction }) {
  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} aria-hidden="true" />
      <h1 className={s.title}>{title}</h1>
      {children && children}
      {/* {buttonAction
        ? <Button  href="#" action={buttonAction}>{buttonText}</Button> */}
         <Button  href="/"variant="outlined" sx={{ marginTop: '20px',color:"black"}}>{buttonText}</Button>
         
         {/* } */}
       </div>
     )
   }