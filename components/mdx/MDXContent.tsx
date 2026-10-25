import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx/MDXComponents";

// `code` is Velite's compiled MDX output (a `function-body` string). Running
// it via `new Function` is the standard Velite/Contentlayer rendering
// pattern — the code is produced entirely at build time from our own
// trusted content, never from user input.
function runMdxCode(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{ components?: typeof mdxComponents }>;
}

export function MDXContent({ code }: { code: string }) {
  // Velite compiles each entry to its own function-body string, so the
  // component is necessarily built per-`code` value rather than declared
  // once at module scope — this is the standard Velite/Contentlayer
  // rendering pattern, and safe here since this runs once per server render.
  const Component = runMdxCode(code);
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={mdxComponents} />;
}
