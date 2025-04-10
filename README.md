# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# React + Google Gemini AI Integration

This project demonstrates how to integrate Google's Gemini AI into a React application.

## Setup

1. Get a Gemini API key from the [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root of the project (if not already created)
3. Add your API key to the `.env` file:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
4. Replace `your_api_key_here` with your actual Gemini API key

## Model Information
This application uses the following models from Google's Generative AI:
- `gemini-pro` - For text-only prompts
- `gemini-1.5-flash` - For PDF file analysis (multimodal capabilities)

Note: The previously used `gemini-pro-vision` model was deprecated by Google on July 12, 2024. The application now uses the recommended `gemini-1.5-flash` model instead.

If you encounter model-related errors, check the [Google AI documentation](https://ai.google.dev/models/gemini) for the latest available models and their capabilities.

## Features
- Text-based prompts with the Gemini API
- PDF file upload and analysis
- Sample prompts for quick testing
- Response history for text prompts
- **Markdown rendering** with support for:
  - Tables
  - Code blocks with syntax highlighting
  - Headers, lists, and emphasis
  - Properly formatted text output
- **Table generation and rendering** for:
  - Structured data in responses
  - Tables extracted from PDFs
  - Comparison tables and data presentation

## Dependencies
The application uses the following main dependencies:
- React for the UI
- Google Generative AI SDK for Gemini API integration
- React Markdown for rendering markdown content
- remark-gfm for GitHub-flavored markdown support (including tables)
- rehype-raw for processing raw HTML in markdown

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
