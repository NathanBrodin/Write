import { MDXRemote } from 'next-mdx-remote/rsc'
 

async function getMdxSource() {
    const res = `
    # Hello, world!
    This is a remote MDX page.

    ## This is a heading
    And this is a paragraph.
    `

    // Add a 1 second delay to simulate a slow network
    await new Promise((resolve) => setTimeout(resolve, 10000))

    return res
}

export default async function RemoteMdxPage() {
  const res = await getMdxSource()
  const markdown = await res

  return <MDXRemote source={markdown} />
}