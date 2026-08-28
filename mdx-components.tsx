import type { MDXComponents } from 'mdx/types';
import Code from './src/app/posts/components/code';
import ZoomImg from '@/app/posts/components/zoom-img';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    img: ZoomImg,
  };
}
