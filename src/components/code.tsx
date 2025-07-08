'use client';

import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Code = (props: any) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;

    const code = codeRef.current?.innerText ?? '';
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* inline code */
  if (!props['data-language']) {
    return <code {...props} children={props.children.slice(1, -1)} />;
  }

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 hidden rounded bg-white/10 px-2 py-1 text-xs text-white transition group-hover:block hover:bg-white/20"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <code ref={codeRef} {...props} />
    </div>
  );
};

export default Code;
