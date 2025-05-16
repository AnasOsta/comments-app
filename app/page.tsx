"use client";
import Comment from "./components/Comment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { handleAddComment } from "./lib/handleFunctions";
import { CommentType } from "@/types";
import { SubmitButton } from "./components/SubmitButton";
export default function Home() {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [data, setData] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
    const res = await fetch("/api/comment");
    const data = await res.json();
    setData(data);
  }
  useEffect(() => {
    fetchComments();
  }, []);

  if (!data)
    return (
      <div className="w-full  h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-[#5357B6]" />
      </div>
    );
  function handleComment() {
    setLoading(true);
    handleAddComment(comment);
    setComment("");
  }

  return (
    <div className="flex flex-col gap-4 pt-16 pb-44 relative">
      {data.map((comment) => (
        <div key={comment.id} className="">
          <Comment
            className="max-w-2xl mx-auto"
            currentUser={session?.user}
            comment={comment}
          />
          {comment.replies.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-y-4 mt-4 border-l-2 border-gray-300 mx-6">
                {comment.replies.map((reply) => (
                  <Comment
                    currentUser={session?.user}
                    className="max-w-xl mx-auto"
                    key={reply.id}
                    comment={reply}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {session?.user && (
        <div className="fixed bottom-0 right-0 left-0 bg-white rounded-lg flex gap-x-4 p-4 max-w-2xl mx-auto">
          <p className="font-bold text-white p-3 h-fit flex items-center justify-center bg-[#5357B6] rounded-full">
            {session?.user?.username?.slice(0, 2).toUpperCase()}
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:border-[#5357B6] focus:outline-none resize-none"
          />

          <SubmitButton onClick={handleComment} loading={loading}>
            Submit
          </SubmitButton>
        </div>
      )}
    </div>
  );
}
