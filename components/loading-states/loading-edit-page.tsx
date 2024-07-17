"use client";
const LoadingEditPage = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="w-96 h-10 bg-slate-100 animate-pulse"></div>
      <div className="w-96 h-10 bg-slate-100 animate-pulse"></div>
      <div className="w-96 h-10 bg-slate-100 animate-pulse"></div>
      <div className="w-96 h-10 gap-10 animate-pulse">
        <div className="flex-1 h-full bg-slate-100 animate-pulse"></div>
        <div className="flex-1 h-full bg-slate-100 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingEditPage;
