This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Command to create this project:

```sh
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

# Pages Router

Ref: https://nextjs.org/learn/pages-router

### Code splitting and prefetching

Next.js does **code splitting** automatically, so **each page only loads what’s necessary for that page**. That means when the homepage is rendered, the code for other pages is not served initially.

This ensures that the homepage **loads quickly** even if you have hundreds of pages.

Only loading the code for the page you request also means that **pages become isolated**. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically **prefetches the code for the linked page in the background**. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

Summary: Next.js automatically optimizes your application for the best performance by **code splitting, client-side navigation, and prefetching** (in production).
