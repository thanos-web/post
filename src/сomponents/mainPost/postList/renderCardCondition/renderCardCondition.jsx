import { useContext } from "react";
import { LocalStorageContext } from "../../../../App";
import { CardNotAuth } from "../cardNotAuth/cardNotAuth";
import { PostList } from "../postList";

export function RenderConditionCard() {

    const { token = '' } = useContext(LocalStorageContext);

    console.log('Токен из renderCardCondition >>', token)

    if (token) {

        return (
            <PostList />
        )

    } return (

        <CardNotAuth />
    )
}