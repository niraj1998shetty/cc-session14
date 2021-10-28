import react from "react";
import InputWithLabel from "./InputWithLabel";

const SearchForm=(props)=>(
        <form onSubmit={props.onSearchSubmit}>
        <InputWithLabel
          id="search"
          value={props.search}
          onInputChange={props.onSearchInput}
          type="text"
        >
          Search For Stories
        </InputWithLabel>
        <button disabled={!props.search} type="submit" onClick={props.onSearchSubmit}>
          submit
        </button>
      </form>
    )

export default SearchForm;