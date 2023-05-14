import { useContext } from 'react';
import { Stack, Pagination, createTheme, ThemeProvider } from '@mui/material';
import { LocalStorageContext } from '../app/index';

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    fontSize: "20px",
                    backgroundColor: '#f5f5f5',
                    "&:hover": {
                        backgroundColor: "#f5f5f5"
                    },
                },
            },
        },
    }
}); 

function ElementPagination() {
    const { page, setPage, pageQty } = useContext(LocalStorageContext)
    const changePage = (event, num) => setPage(num)

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '25px',
                mb: '5px'
            }} >
                <Pagination
                    count={pageQty}
                    page={page}
                    onChange={changePage}
                    variant="outlined"
                    size='large'
                    fontSize='20px'
                    showFirstButton
                    showLastButton

                />
            </Stack>
        </ThemeProvider>
    );
}

export default ElementPagination;