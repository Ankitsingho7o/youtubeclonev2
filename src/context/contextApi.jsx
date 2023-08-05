import { useState, useEffect, createContext } from "react";
import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setsearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(false);
  const [checking, setChecking] = useState(false);
  const [selectCategories, setSelectCategories] = useState("NEW");

  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setItems([]);
    // fetchSelectedCateogryData(selectCategories, pageNum);
  }, [selectCategories]);


  useEffect(()=>{
    if(pageNum){
        fetchSelectedCateogryData(selectCategories,pageNum)
    }
  },[pageNum])

  const fetchSelectedCateogryData = (query, pageNum = " ") => {
    setLoading(true);
    fetchDataFromApi(
      `search?part=snippet&q=${query}${pageNum ? `&pageToken=${pageNum}` : " "}`
    ).then((data) => {
      // console.log(data);
      // setsearchResults(prevResults =>{
      //     return [...data.contents]
      // })
      setsearchResults(data);
      setChecking(true);
      setLoading(false);
    });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setsearchResults,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
        checking,
        setPageNum,
        items,
        setItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};
