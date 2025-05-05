# NextJS docs - React foundations

Ref: https://nextjs.org/learn/react-foundations/what-is-react-and-nextjs

## Chapter 1. About React and Next.js

There are a few things you need to consider when building modern applications. Such as:

- User Interface - how users will consume and interact with your application.
- Routing - how users navigate between different parts of your application.
- Data Fetching - where your data lives and how to get it.
- Rendering - when and where you render static or dynamic content.
- Integrations - what third-party services you use (for CMS, auth, payments, etc.) and how you connect to them.
- Infrastructure - where you deploy, store, and run your application code (serverless, CDN, edge, etc.).
- Performance - how to optimize your application for end-users.
- Scalability - how your application adapts as your team, data, and traffic grow.
- Developer Experience - your team's experience building and maintaining your application

Next.js is a React framework that gives you building blocks to create web applications.

- By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

## Chapter 3. Updating UI with Javascript

Example:

```html
<script type="text/javascript">
  const app = document.getElementById("app");
  const header = document.createElement("h1");
  const text = "Develop. Preview. Ship.";
  const headerContent = document.createTextNode(text);
  header.appendChild(headerContent);
  app.appendChild(header);
</script>
```

### Imperative vs. declarative programming

The code above is a good example of **imperative programming**.

- You're **writing the steps** for how the user interface should be updated.
- But when it comes to **building user interfaces, a declarative approach is often preferred** because it can speed up the development process.
- Instead of having to write DOM methods, it would be helpful if developers were able to declare what they want to show (in this case, an h1 tag with some text).

In other words, imperative programming is like giving a chef **step-by-step instructions** on how to make a pizza. Declarative programming is like ordering a pizza **without being concerned about the steps it takes** to make the pizza. 🍕

**React is a popular declarative library** that you can use build user interfaces.

## Chapter 4. Getting Started with React

To use React in your newly created project, load 2 React scripts:

- `react` is the core React library.
- `react-dom` provides DOM-specific methods that enable you to use React with the DOM.

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

### What is JSX?

JSX is a syntax extension for JavaScript that allows you to **describe your UI in a familiar HTML-like syntax**.

- You don't need to learn any new symbols or syntax outside of HTML and JavaScript.
- But **browsers don't understand JSX** out of the box, so you'll need a **JavaScript compiler**, such as a `Babel`, to transform your JSX code into regular JavaScript.

Adding Babel to your project:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Now we can use the declarative React code you:

```html
<script type="text/jsx">
  const domNode = document.getElementById("app")
  const root = ReactDOM.createRoot(domNode);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```
