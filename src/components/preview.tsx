'use client';

import { ReactNode, useState } from 'react';
import { GalleryThumbnails, RotateCcw } from 'lucide-react';

const Preview = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState(0);
  return (
    <div className="bg-card border-fore/5 mb-4 rounded-xl p-4 shadow">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center gap-2">
          <GalleryThumbnails className="size-4" />
          <div>预览</div>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="size-4 cursor-pointer" onClick={() => setKey(key + 1)} />
        </div>
      </div>
      <div className="bg-main rounded-xl p-4" key={key}>
        {children}
      </div>
    </div>
  );
};

export default Preview;
