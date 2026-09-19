export default function Loading() {
  return (
    <div className="site-main">
      <div className="page-gutter py-5 sm:py-space-lg">
        <div className="mb-space-lg h-10 animate-pulse bg-surface-container" />
        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="h-64 animate-pulse bg-surface-container-lowest sm:h-96 lg:col-span-8 lg:h-[32rem]" />
          <div className="h-64 animate-pulse bg-surface-container-lowest sm:h-96 lg:col-span-4 lg:h-[32rem]" />
        </div>
      </div>
    </div>
  );
}
