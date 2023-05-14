import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "../search/styleMUIComponent";
import { LocalStorageContext } from "../app/index";
import { useContext, useCallback } from 'react';

const SearchInput = () => {
    const { setSearchQuery, setPage } = useContext(LocalStorageContext)

    const handleChange = useCallback((event) => {
        setSearchQuery(event.target.value)
        setPage(1)
    }, [setSearchQuery, setPage])

    return (<>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Найти пост"
                inputProps={{ 'aria-label': 'Найти' }}
                onChange={handleChange}
            />
        </Search>
    </>
    );

}

export default SearchInput;