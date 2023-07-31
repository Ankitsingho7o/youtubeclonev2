import { useState,useEffect, createContext } from "react";
import {fetchDataFromApi} from "../utils/api"
export  const Context = createContext()

export const AppContext= ({children})=>{
    const[loading, setLoading] = useState(false)
    const[searchResults, setsearchResults] = useState([])
    const[checking, setChecking]= useState(false)
    const[selectCategories, setSelectCategories] = useState("NEW")

    const[mobileMenu, setMobileMenu] = useState(false)


    useEffect(()=>{
   fetchSelectedCateogryData(selectCategories)
    },[selectCategories])

    const fetchSelectedCateogryData=(query)=>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then((data)=>{
            // console.log(data);
            // setsearchResults(prevResults =>{
            //     return [...data.contents]
            // })
            setsearchResults(data.contents)
            setChecking(true)
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
            setMobileMenu,
            checking
   
        }}>
    
            {children}
        </Context.Provider>
    )
}

