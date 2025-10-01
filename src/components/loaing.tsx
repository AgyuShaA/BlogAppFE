"use client";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/80 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-main border-gray-300 rounded-full animate-spin" />
        <p className="text-white text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
