import React from "react";

interface iAppProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: (closeModal: () => void) => React.ReactNode;
}

export default function Modal(props: iAppProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div onClick={openModal} className="cursor-pointer">
        {props.children}
      </div>

      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => {}}
        id="modal"
        className="hidden peer"
      />
      {isOpen && (
        <div
          className="fixed z-10 inset-0 flex items-center justify-center bg-black/30"
          onClick={closeModal}
        >
          <div
            className="w-[300px] bg-white p-6 border border-gray-200 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {props.header && (
              <header className="mb-4 text-2xl font-semibold">
                {props.header}
              </header>
            )}
            {props.body && <main className="mb-4">{props.body}</main>}
            {props.footer && <footer>{props.footer(closeModal)}</footer>}
          </div>
        </div>
      )}
    </>
  );
}
