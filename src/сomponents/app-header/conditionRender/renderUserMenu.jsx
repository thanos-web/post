import react, { useContext } from 'react';
import UserMenu from '../userMenu';
import AuthorizeForm from '../../authorization/authorizeModal';
import { LocalStorageContext } from '../../app';

function RenderUserMenu(props) {
  const { token = ''} = useContext(LocalStorageContext)

  if (token) {

      return (
        <>
          <UserMenu/>
        </>
      )
  } return (
    <>
      <AuthorizeForm/>
    </>
  )
}

export default RenderUserMenu;