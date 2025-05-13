import data from "@/data.json";
import Image from "next/image";
import { MinusIcon, PlusIcon, ReplyIcon } from "./components/Icons";
export default function Home() {
  return (
    <div className="flex flex-col gap-4 py-16 relative">
      {data.comments.map((comment) => (
        <div key={comment.id} className="max-w-2xl mx-auto ">
          <div className="px-4 flex gap-x-4 bg-white p-4 rounded-xl">
            <div className="flex flex-col items-center gap-y-4 bg-[#F5F7FA] text-[#5357B6] font-bold h-fit rounded-lg p-2 select-none">
              <PlusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
              <p>{comment.score}</p>
              <MinusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-4">
                  <Image
                    src={comment.user.image.png}
                    alt={comment.user.username}
                    width={40}
                    height={40}
                  />
                  <p className="font-bold">{comment.user.username}</p>
                  <p className="text-[#828FA3]">{comment.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none">
                  <ReplyIcon className="hover:cursor-pointer" />
                  <span>Reply</span>
                </div>
              </div>
              <p className="text-[#828FA3]">{comment.content}</p>
            </div>
          </div>
          {comment.replies.length > 0 && (
            <div className="flex flex-col gap-y-4 mt-4 border-l-2 border-gray-300 mx-6">
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="px-4 flex gap-x-4 bg-white p-4 max-w-xl mx-auto rounded-xl"
                >
                  <div className="flex flex-col items-center gap-y-4 bg-[#F5F7FA] text-[#5357B6] font-bold h-fit rounded-lg p-2 select-none">
                    <PlusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
                    <p>{comment.score}</p>
                    <MinusIcon className="hover:cursor-pointer text-[#5357B6]/50 hover:text-[#5357B6]" />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-4">
                        <Image
                          src={reply.user.image.png}
                          alt={reply.user.username}
                          width={40}
                          height={40}
                        />
                        <p className="font-bold">{reply.user.username}</p>
                        <p className="text-[#828FA3]">{reply.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[#5357B6] font-bold cursor-pointer hover:text-[#5357B6]/50 select-none">
                        <ReplyIcon className="hover:cursor-pointer" />
                        <span>Reply</span>
                      </div>
                    </div>
                    <p className="text-[#828FA3]">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="fixed bottom-0 right-0 left-0 bg-white rounded-lg flex gap-x-4 p-4 max-w-2xl mx-auto">
        <Image
          src={data.currentUser.image.png}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full h-fit"
        />
        <textarea
          placeholder="Add a comment..."
          className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:border-[#5357B6] focus:outline-none resize-none"
        />

        <button className="bg-[#5357B6] text-white px-6 py-3 rounded-lg h-fit cursor-pointer hover:bg-[#5357B6]/80 active:opacity-90 select-none">
          SEND
        </button>
      </div>
    </div>
  );
}
