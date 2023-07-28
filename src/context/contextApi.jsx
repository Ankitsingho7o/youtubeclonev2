import { useState,useEffect, createContext } from "react";
import {fetchDataFromApi} from "../utils/api"
export  const Context = createContext()

export const AppContext= ({children})=>{
    const[loading, setLoading] = useState(false)
    const[search, setSearchResults] = useState(false)
    const[selectCategories, setSelectCategories] = useState("NEW")
    const[mobileMenu, setMobileMenu] = useState(false)


    useEffect(()=>{
   fetchSelectedCateogryData(selectCategories)
    },[selectCategories])

    const fetchSelectedCateogryData =(query)=>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            console.log(contents);
            setSearchResults(contents)
            setLoading(false)
        })

    }


    return(
        <Context.Provider value={{
            loading,
            setLoading,
            search,
            setSearchResults,
            selectCategories,
            setSelectCategories,
            mobileMenu,
            setMobileMenu
        }}>
    
            {children}
        </Context.Provider>
    )
}

