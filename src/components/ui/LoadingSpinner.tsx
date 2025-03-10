import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center my-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
