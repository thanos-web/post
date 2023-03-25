import React from 'react';
import { Stack, Pagination } from '@mui/material';

function PaginationElement(props) {
    return (
        <>
            <Stack spacing={5} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '25px',
                mb: '5px'
            }}>
                <Pagination count={500} variant="string" size='large' fontSize='20px' />
            </Stack>
        </>
    );
}

export default PaginationElement;