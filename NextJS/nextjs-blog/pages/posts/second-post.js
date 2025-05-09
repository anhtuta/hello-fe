import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export default function SecondPost() {
  return (
    <Layout>
      <Head>
        <title>Second Post</title>
      </Head>
      <h1>Second Post</h1>
      <p>This is the second post in the Next.js tutorial series.</p>
      <p>
        Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be
        referenced from the root of the application similar to pages. The public directory is also useful for
        robots.txt, Google Site Verification, and any other static assets.
      </p>
      <p>
        Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving
        images in modern formats like WebP when the browser supports it. This avoids shipping large images to devices
        with a smaller viewport
      </p>
      <p>
        Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike
        static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images
        or 10 million images. Images are lazy loaded by default. That means your page speed isn't penalized for images
        outside the viewport. Images load as they are scrolled into viewport
      </p>
      <div>
        Should read more:{" "}
        <a href="https://nextjs.org/learn/pages-router/assets-metadata-css-assets">
          https://nextjs.org/learn/pages-router/assets-metadata-css-assets
        </a>
      </div>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
  );
}
