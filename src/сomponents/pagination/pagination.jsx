import { useContext } from 'react';
import { Stack, Pagination } from '@mui/material';
import { LocalStorageContext } from '../../../App';

function ElementPagination() {
    const { page, setPage, pageQty } = useContext(LocalStorageContext)

    return (
        <Stack spacing={2} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '25px',
            mb: '5px'
        }}>
            <Pagination
                count={pageQty}
                page={page}
                onChange={(event, num) => {
                    setPage(num)
                }}
                variant="string"
                size='large'
                fontSize='20px'
                showFirstButton
                showLastButton
            />
        </Stack>
    );
}

export default ElementPagination;