import React from 'react';

function Search(props) {
    return (
        <form>
            <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
            />
        </form>
    );
}

export default Search;
