import React, { useContext } from 'react';
import UserMenu from "../userMenu/userMenu";
import FormDialog from "../authModal/authModal";
import { LocalStorageContext } from "../../../../App";


function RenderUserMenu(props) {
    const { token = '' } = useContext(LocalStorageContext)

    if (token) {

        return (
            <>
                <UserMenu />
            </>
        )
    } return (
        <>
            <FormDialog />
        </>
    )


}


export default RenderUserMenu;