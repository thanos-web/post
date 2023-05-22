import { RingLoader } from "react-spinners";
import s from './styles.module.css';

export const Spinner = () => {
  return (
    <div className={s.spinner}>
      <RingLoader 
        height="75"
        width="75"
        radius="45" 
        color="#4836d6"
        loading={true}
        />
    </div>
  );
};