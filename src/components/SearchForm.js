import react from "react";
import InputWithLabel from "./InputWithLabel";
import style from  "./SearchForm.module.css"

const SearchForm=(props)=>(
        <form onSubmit={props.onSearchSubmit}>
        <InputWithLabel
          id="search"
          value={props.search}
          onInputChange={props.onSearchInput}
          type="text"
        >
       
        </InputWithLabel>
        <button className={style.button} disabled={!props.search} type="submit" onClick={props.onSearchSubmit}>
          submit
        </button>
      </form>
    )

export default SearchForm;