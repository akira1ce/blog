'use client';

import { useState } from 'react';
import Show from './components/show';

const Index = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="cursor-pointer" onClick={() => setShow(!show)}>
        Click me!
      </button>
      <Show when={show}>
        <div>我来</div>
      </Show>
    </>
  );
};

export default Index;
