'use client';

import { Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

interface CodeProps {
  children: string;
  className?: string;
  [key: string]: any;
}

const Code = ({ children, className, ...props }: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.innerText || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="bg-fore/20 hover:bg-fore/10 absolute top-2 right-2 rounded px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default Code;
