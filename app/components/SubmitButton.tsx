import React from "react";

interface iAppProps {
  children?: React.ReactNode;
  loading: boolean;
  handleComment?: (type: string) => void;
  onClick?: () => void;
  className?: string;
}

const renderLoading = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);
const loadingClass = "flex items-center justify-center";

export function DeleteButton({ loading, handleComment }: iAppProps) {
  return loading ? (
    <button
      disabled
      className={`uppercase text-sm text-white px-4 py-2 rounded-lg bg-red-500 select-none w-full
        ${loadingClass}
        `}
    >
      {renderLoading()}
    </button>
  ) : (
    <button
      onClick={() => handleComment?.("delete")}
      className="uppercase text-sm text-white px-4 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 active:opacity-90 select-none w-full"
    >
      yes, delete
    </button>
  );
}
export function SubmitButton({
  loading,
  onClick,
  className,
  children,
}: iAppProps) {
  return loading ? (
    <button
      disabled
      className={`bg-[#5357B6] text-white px-6 py-3 rounded-lg h-fit select-none
        ${className}
        ${loadingClass}
        `}
    >
      {renderLoading()}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`bg-[#5357B6] text-white px-6 py-3 rounded-lg h-fit cursor-pointer hover:bg-[#5357B6]/80 active:opacity-90 select-none uppercase
        ${className}`}
    >
      {children}
    </button>
  );
}
