"use client";
import React from "react";
import { DeleteIcon, EditIcon, MinusIcon, PlusIcon, ReplyIcon } from "./Icons";
import { CommentType, UserType } from "@/types";
import { getRelativeTime } from "../lib/Date";
import {
  handleDelete,
  handleEdit,
  handleReply,
  minusLike,
  plusLike,
} from "../lib/handleFunctions";
import Modal from "./Modal";
import { DeleteButton, SubmitButton } from "./SubmitButton";

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
  const [openState, setOpenState] = React.useState({
    edit: false,
    reply: false,
  });
  const [commentText, setCommentText] = React.useState("");
  const [loadingState, setLoadingState] = React.useState({
    edit: false,
    reply: false,
    delete: false,
    like: false,
  });

  function handleComment(type: string) {
    if (
      loadingState.edit ||
      loadingState.reply ||
      loadingState.delete ||
      loadingState.like
    )
      return;

    switch (type) {
      case "edit":
        setLoadingState({ ...loadingState, edit: true });
        handleEdit(comment.id, commentText);
        break;
      case "reply":
        setLoadingState({ ...loadingState, reply: true });
        handleReply(comment.id, commentText, comment.user.username);
        break;
      case "delete":
        setLoadingState({ ...loadingState, delete: true });
        handleDelete(comment.id);
        break;
      case "like":
        setLoadingState({ ...loadingState, like: true });
        plusLike(comment.id);
        break;
      case "dislike":
        setLoadingState({ ...loadingState, like: true });
        minusLike(comment.id);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div
        className={`px-4 flex gap-x-4 bg-white p-4 rounded-xl w-full ${className}`}
      >
        <div className=" flex flex-col items-center gap-y-4 bg-[#F5F7FA] text-[#5357B6] font-bold h-fit rounded-lg p-2 select-none">
          <PlusIcon
            onClick={() => handleComment("like")}
            className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]"
          />
          <p>{comment.likes}</p>
          <MinusIcon
            onClick={() => handleComment("dislike")}
            className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]"
          />
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
            {comment.user.username !== currentUser?.username ? (
              <div
                onClick={() =>
                  setOpenState((prev) => ({ ...prev, reply: !prev.reply }))
                }
                className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none"
              >
                <ReplyIcon className="hover:cursor-pointer" />
                <span>Reply</span>
              </div>
            ) : (
              <div className="flex gap-4">
                <Modal
                  header="Delete comment"
                  body={
                    <p className="text-[#828FA3] ">
                      Are you sure you want to delete this comment? This will
                      remove the comment and cant be undone.
                    </p>
                  }
                  footer={(closeModal) => (
                    <div className="flex gap-4">
                      <button
                        onClick={closeModal}
                        className="uppercase text-sm text-white px-4 py-3 rounded-lg cursor-pointer bg-gray-500 hover:bg-gray-600 active:opacity-90 select-none w-full"
                      >
                        no, cancel
                      </button>

                      <DeleteButton
                        loading={loadingState.delete}
                        handleComment={handleComment}
                      />
                    </div>
                  )}
                >
                  <div className="flex items-center gap-2 text-red-500 font-bold cursor-pointer hover:text-red-300 select-none">
                    <DeleteIcon className="hover:cursor-pointer" />
                    <span>Delete</span>
                  </div>
                </Modal>
                <div
                  onClick={() =>
                    setOpenState((prev) => ({ ...prev, edit: !prev.edit }))
                  }
                  className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none"
                >
                  <EditIcon className="hover:cursor-pointer" />
                  <span>Edit</span>
                </div>
              </div>
            )}
          </div>
          {!openState.edit ? (
            <p className=" text-[#828FA3]  break-words">
              <span className="text-[#5357B6] font-bold uppercase">
                {comment.parentId ? "@" + comment.parentUsername + " " : ""}
              </span>
              {comment.content}
            </p>
          ) : (
            <>
              <textarea
                defaultValue={comment.content}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={comment.user.username}
                className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:border-[#5357B6] focus:outline-none resize-none"
              />
              <SubmitButton
                loading={loadingState.edit}
                onClick={() => handleComment("edit")}
                className="self-end"
              >
                <span>update</span>
              </SubmitButton>
            </>
          )}
        </div>
      </div>
      {openState.reply && (
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

          <SubmitButton
            loading={loadingState.reply}
            onClick={() => handleComment("reply")}
          >
            <span>Reply</span>
          </SubmitButton>
        </div>
      )}
    </>
  );
}
