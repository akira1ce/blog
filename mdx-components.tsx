import type { MDXComponents } from 'mdx/types';
import Code from './src/components/code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
  };
}
