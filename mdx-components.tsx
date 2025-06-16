import { CodeBlock } from '@/components/CodeBlock';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { pre: (props: any) => <CodeBlock {...props} />, ...components };
}
