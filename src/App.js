import "./App.css";
import Search from "./components/Search";
import List from "./components/List";
import { useState, useEffect, useCallback } from "react";
import usePersistanceState from "./hooks/useSemiPersistance";
import InputWithLabel from "./components/InputWithLabel";
import { useReducer } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "SET_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "SET_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "SET_FETCH_FAILURE":
      return { ...state, data: [], isLoading: false, isError: true };

    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((i) => action.payload.objectId !== i.objectId),
      };
    default:
      throw new Error();
  }
};

function App() {
  const [search, setSearch] = usePersistanceState("customerSearchTerm", "");

  const [url, seturl] = useState(`${API_ENDPOINT}${search}`);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //if(!search){return} ;
    seturl(`${API_ENDPOINT}${search}`);
  };

  const handleSearchStories = useCallback(async () => {
    dispatchItems({ type: "SET_FETCH_INIT" });
    /* fetch(url)
      .then((res) => res.json())
      .then((result) => {
        dispatchItems({ type: "SET_FETCH_SUCCESS", payload: result.hits });
      })
      .catch(() => {
        dispatchItems({ type: "SET_FETCH_FAILURE" });
      }); */
    try {
      const response = await axios.get(url);
      dispatchItems({ type: "SET_FETCH_SUCCESS", payload: response.data.hits });
    } catch {
      dispatchItems({ type: "SET_FETCH_FAILURE" });
    }
  }, [url]);

  const [items, dispatchItems] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  useEffect(() => {
    handleSearchStories();
  }, [handleSearchStories]);

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme","dark")
  })

  const onHandlerDeleteItem = (item) => {
    dispatchItems({ type: "REMOVE_STORY ", payload: item });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <button >Toggle Theme </button>


      <h1>My stories</h1>
     
     <SearchForm search={search} onSearchInput=
     {searchHandler} onSearchSubmit={handleSearchSubmit}/>
      <h4>searching for : {search}</h4>

      {items.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={items.data} handlerDelete={onHandlerDeleteItem} />
      )}
      {items.isError && "Error : Something Wrong"}
    </div>
  );
}

export default App;
