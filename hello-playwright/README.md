# Playwright tutorial

Tutorial from the docs: https://playwright.dev/docs/intro

# Commands in this tutorial

- `npm init playwright@latest`: init project
- `npx playwright test`: run all tests in the `tests` folder, in headless mode
- `npx playwright show-report`: start a server and show test result. We can also open the `playwright-report/index.html` file to see the result instead
- `npx playwright test --ui`: run tests using UI (not done yet)
- `npx playwright --version`: show version of playwright
- `npx playwright codegen demo.playwright.dev/todomvc`: run a test generator - a tool to generate test scripts using UI
- `npx playwright test --headed`: run all tests in the `tests` folder, in headed mode
- `npx playwright test codegen-demo.spec.ts`: run a single test file
- `npx playwright test tests/todo-page/ tests/landing-page/`: run tests inside some specific folders
- `npx playwright test --last-failed`: re-run last failed tests
- `npx playwright test --trace on`:
  - Explore recorded Playwright traces of your tests: you can go back and forward through each action of your test and visually see what was happening during each action
  - Normally run in a Continuous Integration(CI) environment, because locally you can use UI Mode for developing and debugging tests

More commands: https://playwright.dev/docs/test-cli

# VSCode extension for Playwright

Check here: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

Install it, we can run tests in the IDE, and even debug them
