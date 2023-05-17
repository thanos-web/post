import s from "./styles.module.css";
import { formattedDate } from "../../utils/posts";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";



export function Comment({ author, text, created_at, postId, _id, handleDeleteComment, currentUser }) {



    function handleClikButtonDelete() {
        handleDeleteComment(postId, _id);

    }
    return (

        <div className={s.comment}>
            <div className={s.comment__header}>
                <div className={s.comment__name}>{author.name} {author.about}</div>
                <div className={s.comment__date}>{formattedDate(created_at)}</div>
                {
                    currentUser?._id === author?._id &&
                    <IconButton aria-label="delete" onClick={handleClikButtonDelete}>
                        <Delete />
                    </IconButton>
                }

            </div>
            <p className={s.comment__text}>«{text}»</p>

        </div>
    );
}

