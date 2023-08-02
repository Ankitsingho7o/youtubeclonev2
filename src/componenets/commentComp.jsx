import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import TimeAgo from "react-timeago";

const CommentComp = ({ videoComments, commentCount: commCount }) => {
  // console.log(comments);
  const { items } = videoComments;
  const [commentButton, setCommentButton] = useState(false);
  const [commentCompHeight, setCommentCompHeight] = useState("[250px]");
  console.log(items.slice(0, 49));

  function handelClick() {
    setCommentButton(!commentButton);
    commentCompHeight === "[250px]"
      ? setCommentCompHeight("auto")
      : setCommentCompHeight("[250px]");
  }

  return (
    <>
      <div
        className={`mt-6 h-${commentCompHeight} overflow-y-hidden md:h-auto md:mt-6 flex gap-6 flex-col transition-all duration-500 ease-linear`}
      >
        <h1 className="text-white text-xl  md:text-2xl">{`${abbreviateNumber(
          commCount?.items[0]?.statistics?.commentCount,
          2
        )} Comments`}</h1>
        {items?.slice(0, 39).map((item,index) => {
          return (
            <div className="flex gap-4 w-full" key={index}>
              <div className="flex h-8 w-8 md:h-10 md:w-10 rounded-full  overflow-hidden">
                <img
                  loading="lazy"
                  className="h-full  object-cover "
                  src={
                    item?.snippet?.topLevelComment?.snippet
                      ?.authorProfileImageUrl
                  }
                />
              </div>
              <div className="flex  w-2/3 flex-col">
                <div>
                  <h3 className="text-white">
                    {item?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                    <span className="text-gray-500 text-sm">
                      {item.publishedTimeText}
                    </span>
                  </h3>
                </div>

                <p className="text-white p-2 line-clamp-5">
                  {item?.snippet?.topLevelComment?.snippet?.textOriginal}
                </p>
                <div className="text-white">
                  <AiOutlineLike className="text-xl text-white mr-2 inline-block mb-2" />
                  {`${abbreviateNumber(
                    item?.snippet?.topLevelComment?.snippet?.likeCount,
                    2
                  )}`}
                  <span className="ml-6">
                    <TimeAgo
                      date={
                        item?.snippet?.topLevelComment?.snippet?.publishedAt
                      }
                      className="text-white/[0.7]"
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-white border-2 rounded-md md:hidden mt-4
      "
        onClick={handelClick}
      >
        Show {commentButton ? "Less" : "More"}
      </button>
    </>
  );
};

export default CommentComp;
