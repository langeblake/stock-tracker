"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react"; // For a modern close icon

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  // Close modal on pressing Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && show) {
        onClose();
      }
    },
    [show, onClose]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, handleKeyDown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[9999] overflow-y-scroll">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative transform scale-95 transition-transform duration-200 ease-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
          Welcome to Lumière!
        </h2>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Lumière Stock Tracker
          </span>{" "}
          is a front-end development project showcasing{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            interactive tables, dynamic cards, animated charts, and graphs
          </span>
          . It also includes{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            user authentication
          </span>
          , allowing users to log in via{" "}
          <span >email, Google, and GitHub</span>.
          <br />
          <br />
          <span className="text-gray-900 dark:text-gray-100 font-semibold">
            Note:
          </span>{" "}
          The stock data is based on real market data but has been{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            frozen as of February 6, 2025
          </span>{" "}
          and will no longer update in real-time.
        </p>

        <button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200"
        >
          Show me stocks!
        </button>
      </div>
    </div>
  );
};

export default Modal;
