import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";


const CommentComp = ({ videoComments }) => {
  // console.log(comments);
  const { comments } = videoComments;
  console.log(comments);
  return (
    <div className="mt-6 h-[250px] overflow-y-hidden md:h-auto md:mt-6 flex gap-6 flex-col">
      <h1 className="text-white text-xl  md:text-2xl">Comments</h1>
      {comments.map((item) => {
        return (
          <div className="flex gap-4 w-full">
            <div className="flex h-8 w-8 md:h-10 md:w-10 rounded-full  overflow-hidden">
              <img
                className="h-full  object-cover "
                src={item?.author?.avatar[0]?.url}
              />
            </div>
            <div className="flex  w-2/3 flex-col">
              <div>
                <h3 className="text-white">
                  {item?.author?.title} <span className="text-gray-500 text-sm">{item.publishedTimeText}</span>
                </h3>
              </div>

              <p className="text-white p-2">{item?.content}</p>
            <div className="text-white">
                <AiOutlineLike className="text-xl text-white mr-2 inline-block mb-2" />
                {`${abbreviateNumber(item?.stats?.votes, 2)}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentComp;
