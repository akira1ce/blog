import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 p-10">
      <LoaderCircle className="animate-spin" /> loading...
    </div>
  );
}
