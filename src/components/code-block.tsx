'use client';

import { useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export function CodeBlock({ children, ...props }: any) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;

    const code = preRef.current?.innerText ?? '';
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <pre
        ref={preRef}
        {...props}
        className={clsx('overflow-x-auto rounded-md bg-gray-900 p-4 text-white', props.className)}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 hidden rounded bg-white/10 px-2 py-1 text-xs text-white transition group-hover:block hover:bg-white/20"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
