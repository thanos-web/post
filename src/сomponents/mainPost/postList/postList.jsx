import { Grid } from '@mui/material';
import SetCard from './card/setCard';
import '../postList/postList.module.css'

export function PostList({ cards = [] }) {

    return (
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            {cards?.map((card, key) => (

                <Grid item key={key} xs={12} sm={4} md={4}>
                    <SetCard card={card} />
                </Grid>


            ))}
        </Grid>
    );
}