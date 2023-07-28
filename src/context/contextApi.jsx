import { useState,useEffect, createContext } from "react";
import {fetchDataFromApi} from "../utils/api"
export  const Context = createContext()

export const AppContext= ({children})=>{
    const[loading, setLoading] = useState(false)
    const[searchResults, setsearchResults] = useState(false)
    const[selectCategories, setSelectCategories] = useState("NEW")
    const[mobileMenu, setMobileMenu] = useState(false)


    useEffect(()=>{
   fetchSelectedCateogryData(selectCategories)
    },[selectCategories])

    const fetchSelectedCateogryData =(query)=>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            console.log(contents);
            setsearchResults(contents)
            setLoading(false)
        })

    }


    return(
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            setsearchResults,
            selectCategories,
            setSelectCategories,
            mobileMenu,
            setMobileMenu
        }}>
    
            {children}
        </Context.Provider>
    )
}

