import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import SearchSuggestionComp from "../componenets/SearchSuggestionComp";
import { Context } from "../context/contextApi";
import useDebounce from "../hooks/useDebounce";
import Loader from "../shared/loader";

function HeaderComp() {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const [searchSuggestionVisiblity, setSearchSuggestionVisiblity] =
    useState(false);
  const debouncedValue = useDebounce(searchQuery);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      event?.key === "Enter" ||
      (event === "searchButton" && searchQuery?.length > 0)
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };
  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };
  function handelChange(e) {
    setSearchQuery(e.target.value);
  }
  const { pathname } = useLocation();
  const pageName = pathname?.split("/").filter(Boolean)?.[0];
  // console.log(pageName);

  return (
    <div className="sticky p-8 top-0 z-20 flex  flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {loading && <Loader />}
      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            onClick={mobileMenuToggle}
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
          >
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img src={ytLogo} alt="" className="h-full hidden dark:md:block" />
          <img src={ytLogoMobile} alt="" className="h-full md:hidden" />
        </Link>
      </div>
      <div className="group flex items-center relative">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={handelChange}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
        <div
          className={`w-5/6 h-100px bg-gray-800 absolute top-11 left-[10%] text-white rounded-lg p-3 ${
            searchSuggestionVisiblity ? "" : "hidden"
          }`}
        >
          <SearchSuggestionComp
            setQuery={setSearchQuery}
            suggestionVisiblity={setSearchSuggestionVisiblity}
            query={debouncedValue}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
        </div>
      </div>
    </div>
  );
}

export default HeaderComp;
