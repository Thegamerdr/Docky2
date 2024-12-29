import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
    ...components,
  }
}

