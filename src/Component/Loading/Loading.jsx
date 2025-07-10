import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
                <p className="text-primary text-sm font-medium tracking-wide">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
