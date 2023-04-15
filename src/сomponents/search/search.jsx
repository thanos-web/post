// import SearchIcon from '@mui/icons-material/Search';
// import { Search, SearchIconWrapper, StyledInputBase } from "./styleMUIComponent";
// import { PostsContext } from "../../contexts/postsContext";
// import { useContext, useCallback } from 'react';

// const SearchInfo = () => {
//     function ({ setSearchQuery, setPage }) = useContext(PostsContext)

//     const handleChange = useCallback((event) => {
//         setSearchQuery(event.target.value)
//         setPage(1)
//     }, [setSearchQuery, setPage])

//     return (<>
//         <Search>
//             <SearchIconWrapper>
//                 <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//                 placeholder="Найти пост"
//                 inputProps={{ 'aria-label': 'Найти' }}
//                 onChange={handleChange}
//             />
//         </Search>
//     </>
//     );

// }


// export default SearchInfo;