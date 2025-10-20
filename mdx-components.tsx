import type { MDXComponents } from 'mdx/types';
import Code from './src/components/code';
import ZoomImg from './src/components/zoom-img';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    img: ZoomImg,
  };
}
