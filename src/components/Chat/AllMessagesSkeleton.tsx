const AllMessagesSkeleton = () => {
  return (
    <>
      <div className="flex h-full flex-col overflow-scroll no-scrollbar space-y-2 mb-8">
        <div className="flex py-4 rounded-xl items-center bg-slate-200 dark:bg-gray-950 pr-4 rounded-bl-none animate-pulse">
          <div className="mx-4 w-6 h-6 bg-slate-400 animate-pulse rounded-full object-cover" />
          <h1 className="w-96 h-4 bg-slate-400 animate-pulse rounded-lg"></h1>
        </div>
      </div>
      <div className="flex h-full flex-col overflow-scroll no-scrollbar space-y-2 mb-8">
        <div className="flex py-4 rounded-xl items-center bg-slate-200 dark:bg-gray-950 pr-4 rounded-bl-none animate-pulse">
          <div className="mx-4 w-6 h-6 bg-slate-400 animate-pulse rounded-full object-cover" />
          <h1 className="w-96 h-4 bg-slate-400 animate-pulse rounded-lg"></h1>
        </div>
      </div>
      <div className="flex h-full flex-col overflow-scroll no-scrollbar space-y-2 mb-8">
        <div className="flex py-4 rounded-xl items-center bg-slate-200 dark:bg-gray-950 pr-4 rounded-bl-none animate-pulse">
          <div className="mx-4 w-6 h-6 bg-slate-400 animate-pulse rounded-full object-cover" />
          <h1 className="w-96 h-4 bg-slate-400 animate-pulse rounded-lg"></h1>
        </div>
      </div>
      <div className="flex h-full flex-col overflow-scroll no-scrollbar space-y-2">
        <div className="flex py-4 rounded-xl items-center bg-slate-200 dark:bg-gray-950 pr-4 rounded-bl-none animate-pulse">
          <div className="mx-4 w-6 h-6 bg-slate-400 animate-pulse rounded-full object-cover" />
          <h1 className="w-96 h-4 bg-slate-400 animate-pulse rounded-lg"></h1>
        </div>
      </div>
    </>
  );
};

export default AllMessagesSkeleton;
