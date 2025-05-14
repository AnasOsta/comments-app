"use client";
import React from "react";
import { DeleteIcon, EditIcon, MinusIcon, PlusIcon, ReplyIcon } from "./Icons";
import { CommentType, UserType } from "@/types";
import { getRelativeTime } from "../lib/Date";

interface iAppProps {
  comment: CommentType;
  className?: string;
  currentUser: UserType;
}

export default function Comment({
  comment,
  className,
  currentUser,
}: iAppProps) {
  const [isReplyOpen, setIsReplyOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  async function handleReply(commentId: string) {
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ comment: commentText, parentId: commentId }),
    });
    if (res.ok) {
      setCommentText("");
    } else {
      console.log(res);
    }
  }

  return (
    <>
      <div
        className={`px-4 flex gap-x-4 bg-white p-4 rounded-xl w-full ${className}`}
      >
        <div className=" flex flex-col items-center gap-y-4 bg-[#F5F7FA] text-[#5357B6] font-bold h-fit rounded-lg p-2 select-none">
          <PlusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
          <p>{comment._count.likes}</p>
          <MinusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex justify-between items-center ">
            <div className="flex gap-x-4">
              <p className="font-bold text-white p-3 h-fit flex items-center justify-center bg-[#5357B6] rounded-full">
                {comment.user?.username?.slice(0, 2).toUpperCase()}
              </p>
              <p className="font-bold uppercase">{comment.user.username}</p>
              <p className="text-[#828FA3]">
                {getRelativeTime(new Date(comment.createdAt))}
              </p>
            </div>
            {comment.user.username !== currentUser.username ? (
              comment.parentId === null ? (
                <div
                  onClick={() => setIsReplyOpen(!isReplyOpen)}
                  className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none"
                >
                  <ReplyIcon className="hover:cursor-pointer" />
                  <span>Reply</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400 font-bold select-none">
                  <ReplyIcon />
                  <span>Reply</span>
                </div>
              )
            ) : (
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-red-500 font-bold cursor-pointer hover:text-red-300 select-none">
                  <DeleteIcon className="hover:cursor-pointer" />
                  <span>Delete</span>
                </div>
                <div
                  onClick={() => setIsEditOpen(!isEditOpen)}
                  className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none"
                >
                  <EditIcon className="hover:cursor-pointer" />
                  <span>Edit</span>
                </div>
              </div>
            )}
          </div>
          {!isEditOpen ? (
            <p className=" text-[#828FA3]  break-words">{comment.content}</p>
          ) : (
            <>
              <textarea
                defaultValue={comment.content}
                placeholder={comment.user.username}
                className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:border-[#5357B6] focus:outline-none resize-none"
              />
              <button className="self-end bg-[#5357B6] text-white px-6 py-3 rounded-lg h-fit cursor-pointer hover:bg-[#5357B6]/80 active:opacity-90 select-none">
                UPDATE
              </button>
            </>
          )}
        </div>
      </div>
      {isReplyOpen && (
        <div
          className={`mt-2 bg-white rounded-lg flex gap-x-4 p-4 w-full ${className}`}
        >
          <p className="font-bold text-white p-3 h-fit flex items-center justify-center bg-[#5357B6] rounded-full">
            {currentUser.username?.slice(0, 2).toUpperCase()}
          </p>
          <textarea
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={"@" + comment.user.username}
            className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:border-[#5357B6] focus:outline-none resize-none"
          />

          <button
            onClick={() => handleReply(comment.id)}
            className="bg-[#5357B6] text-white px-6 py-3 rounded-lg h-fit cursor-pointer hover:bg-[#5357B6]/80 active:opacity-90 select-none"
          >
            REPLY
          </button>
        </div>
      )}
    </>
  );
}
