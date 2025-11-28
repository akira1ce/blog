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
    <div>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleCopy}
          className="cursor-pointer rounded-xl text-xs"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Code;
