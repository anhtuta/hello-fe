This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Command to create this project:

```sh
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

Node version: `v22.15.0`

# Pages Router

Ref: https://nextjs.org/learn/pages-router

## Code splitting and prefetching

Next.js does **code splitting** automatically, so **each page only loads what’s necessary for that page**. That means when the homepage is rendered, the code for other pages is not served initially.

This ensures that the homepage **loads quickly** even if you have hundreds of pages.

Only loading the code for the page you request also means that **pages become isolated**. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically **prefetches the code for the linked page in the background**. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

Summary: Next.js automatically optimizes your application for the best performance by **code splitting, client-side navigation, and prefetching** (in production).

https://nextjs.org/learn/pages-router/navigate-between-pages-client-side

## Pre-rendering

By default, Next.js **pre-renders every page**. This means that **Next.js generates HTML for each page in advance**, instead of having it all done by client-side JavaScript.

Pre-rendering can result in better performance and SEO

Each generated HTML is **associated with minimal JavaScript code** necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called **hydration**.)

Check that pre-rendering is happening:

- When you disable JS in browser, your app is rendered without JavaScript
- If your app is a plain React.js app (without Next.js), there’s no pre-rendering, so you won’t be able to see the app if you disable JavaScript

https://nextjs.org/learn/pages-router/data-fetching-pre-rendering

## Two Forms of Pre-rendering

Next.js has two forms of pre-rendering: **Static Site Generation** (SSG) and **Server-side Rendering** (SSR). The difference is in when it generates the HTML for a page

- Static Generation is the pre-rendering method that **generates the HTML at build time**. The pre-rendered HTML is then reused on each request.
- Server-side Rendering is the pre-rendering method that **generates the HTML on each request**

### Per-page Basis

- Importantly, Next.js lets you **choose which pre-rendering form to use for each page**.
- You can create a **"hybrid" Next.js app** by using **Static Generation for most pages** and using **Server-side Rendering for others**.

### When to Use Static Generation v.s. Server-side Rendering

We **recommend using Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it **much faster** than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation

You can use Server-side Rendering: when your page shows frequently updated data, and the page content changes on every request.

https://nextjs.org/learn/pages-router/data-fetching-two-forms

## Static Generation with and without Data

Static Generation can be done with and without data.

- Without data: khi ko cần fetch external data, mọi data cho app đều ở trong project này, chẳng hạn đã có page index.js, hoặc các page sẽ được gen từ thư mục chứa markdown
- With data: khi cần fetch external data, chẳng hạn lấy data từ DB hoặc CMS

## Static Generation with Data using `getStaticProps`

How does it work? Well, in Next.js, when you export a page component, you can also export an `async function` called `getStaticProps`. If you do this, then:

- `getStaticProps` runs at build time in production, and…
- Inside the function, you can fetch external data and send it as props to the page.

  ```js
  export default function Home(props) { ... }

  export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const data = ...

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: ...
    }
  }
  ```

Note: In development mode, getStaticProps runs on each request instead

https://nextjs.org/learn/pages-router/data-fetching-with-data

### So sánh với Gatsby

Bên Gatsby thì dùng graphQL để export data as props to the page, e.g.:

```js
const BlogIndexPage = ({ data }) => {
  return (
    <Layout pageTitle="All posts">
      <Seo title="All posts" />
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`${PREFIX_URL.blog}/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.datePublished}</p>
        </article>
      ))}
    </Layout>
  );
};
export default BlogIndexPage;

export const query = graphql`
  query GetAllMdxQuery {
    allMdx(sort: { frontmatter: { datePublished: DESC } }) {
      nodes {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          datePublished(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
      }
    }
  }
`;
```

Detail: [github](https://github.com/anhtuta/nenmongvn/blob/master/src/pages/blog/index.js)

## `getStaticProps` Details

See [posts.js](./lib/posts.js)

In production, **`getStaticProps` runs at build time**. However, this behavior can be enhanced using the fallback key returned by `getStaticPaths`

Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers

- **CANNOT use query parameters or HTTP headers**

`getStaticProps` can only **be exported from a page**. You can’t export it from non-page files

What If I Need to Fetch Data at Request Time? --> use Server-side Rendering

https://nextjs.org/learn/pages-router/data-fetching-getstaticprops-details

## Fetching Data at Request Time

To use Server-side Rendering, you need to **export `getServerSideProps`** instead of `getStaticProps` from your page

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

- Because `getServerSideProps` is called at request time, its parameter (`context`) contains request specific parameters.
- You should use `getServerSideProps` only if you need to pre-render a page whose data must be fetched at request time.
- **Time to first byte (TTFB) will be slower** than `getStaticProps` because the server must compute the result on every request, and the **result cannot be cached by a CDN** without extra configuration

--> Nghe khá giống với multi-page application (MPA): traditional web application. Backend sẽ handle request rồi trả về 1 trang web cho user, giống như code web = PHP hay WordPress vậy

### Client-side Rendering

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

This approach works well for user **dashboard pages**, for example. **Because a dashboard is a private, user-specific page, SEO is not relevant**, and the page doesn’t need to be pre-rendered. **The data is frequently updated**, which requires request-time data fetching.

--> E.g.: SPA (Single Page Applications): Frontend gọi API rồi render page

### SWR

The team behind Next.js has created a React hook for data fetching called [SWR](https://swr.vercel.app/). We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more

https://nextjs.org/learn/pages-router/data-fetching-request-time

## API Routes Details

Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`

- Instead, write your server-side code directly in `getStaticProps` or `getStaticPaths` (or call a helper function).
- Reason: `getStaticProps` and `getStaticPaths` **run only on the server-side** and will never run on the client-side. Moreover, these functions will **not be included in the JS bundle for the browser**. That means you can write code such as direct database queries without sending them to browsers.

Example: http://localhost:3000/api/hello

A good use case for API Routes is **handling form input**. For example, you can create a form on your page and have it send a POST request to your API Route

```js
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

Như vậy, cần Node.js server để phục vụ

- Server-side rendered pages
- API Routes

Còn static pages thì không cần

https://nextjs.org/learn/pages-router/api-routes-api-routes-details

## Next.js and Vercel

When you deploy your Next.js app to Vercel, the following happens by default:

- Pages that use **Static Generation and assets** (JS, CSS, images, fonts, etc) will automatically be served from the **Vercel CDN**, which is blazingly fast.
- Pages that use **Server-Side Rendering and API routes** will automatically become isolated **Serverless Functions** (e.g. Lambdas). This allows page rendering and API requests to scale infinitely.

Vercel has many more features:

- Custom Domains
- Environment Variables
- Automatic HTTPS

DPS workflow: Develop, Preview, and Ship.

- Develop: write code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.
- Preview: push changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.
- Ship: merge the pull request to main to ship to production

https://nextjs.org/learn/pages-router/deploying-nextjs-app-platform-details

## Other Hosting Options

Next.js can be deployed to any hosting provider that supports Node.js.

- Run the `build` script once, which builds the production application in the `.next` folder: `npm run build`
- After building, the `start` script starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages, and API Routes: `npm run start`

## Build static HTML pages

- Add nextjs config file: `next.config.js`
- Currently must disable Image Optimization
- Build: `npm run build`
- The output (static HTML pages) will be generated at `out` folder. Can deploy it to a hosting server, or start static server at local using php (run in `out` folder): `php -S localhost:8888`

# NextJS fundamentals

## Rendering

| Method    | File Example         | Data Fetching Function             | When to Use                                     |
| --------- | -------------------- | ---------------------------------- | ----------------------------------------------- |
| SSG       | `pages/[slug].js`    | `getStaticPaths`, `getStaticProps` | Known routes at build time                      |
| SSR       | `pages/[slug].js`    | `getServerSideProps`               | Data changes per request                        |
| CSR       | `pages/[slug].js`    | React hooks (`useEffect`)          | Data fetched on client                          |
| ISR       | `pages/[slug].js`    | `getStaticProps` + `revalidate`    | Static pages, but need updates after deployment |
| Catch-All | `pages/[...slug].js` | Any of the above                   | Flexible, nested dynamic routes                 |

Ref: Copilot

## NextJS SSG

There are two main ways to generate static pages:

### 1. Static Generation with `getStaticProps` (for **static routes**)

- How:
  - Create a page file (e.g. `about.js`).
  - Export an async `getStaticProps` function to fetch data at build time.
- Result:
  - The page is generated as static HTML at build time.
- Example:
  ```js
  export async function getStaticProps() {
    return { props: { message: "Hello SSG!" } };
  }
  ```

### 2. Static Generation with `getStaticPaths` + `getStaticProps` (for **dynamic routes**)

- How:
  - Create a dynamic route file (e.g. `pages/blog/[slug].js`).
  - Export `getStaticPaths` to specify all possible paths at build time.
  - Export `getStaticProps` to fetch data for each path.
- Result:
  - All specified dynamic pages are generated as static HTML at build time.
- Example:
  ```js
  export async function getStaticPaths() {
    return { paths: [{ params: { slug: "hello" } }], fallback: false };
  }
  export async function getStaticProps({ params }) {
    return { props: { slug: params.slug } };
  }
  ```

Note:

- You can also have plain static files (no data fetching) in the pages directory, which are always statically generated.
- ISR (`revalidate` in `getStaticProps`) is an extension of SSG, allowing static pages to be regenerated after deployment.

Compare with Gatsby SSG:

- Next.js does not have a direct equivalent to Gatsby’s `gatsby-node.js` for programmatically creating pages. Instead, Next.js uses the file system-based routing
- Both of them can use dynamic files in `pages` folder, to generate dynamic pages

Ref: Copilot
