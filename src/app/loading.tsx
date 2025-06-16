import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center gap-2 p-10">
      <LoaderCircle className="animate-spin" /> loading...
    </div>
  );
}
