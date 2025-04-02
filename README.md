# Weather App

A simple weather application that provides weather information for a given location.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your weather API key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

## Development

To run the application in development mode:
```bash
npm run dev
```

## Production

To run the application in production mode:
```bash
npm start
```

## Project Structure

```
weather-app/
├── src/               # Source code
│   └── server.js     # Main application file
├── public/           # Static files (CSS, JS, images)
├── templates/        # EJS templates
│   ├── views/       # Main views
│   └── partials/    # Reusable partials
├── utils/           # Utility functions
├── package.json     # Project dependencies and scripts
└── .env             # Environment variables (not in repo)
```

## Deployment

1. Set up your environment variables in your hosting platform
2. Install dependencies: `npm install --production`
3. Start the application: `npm start`

## Environment Variables

- `PORT`: Server port (default: 4000)
- `WEATHER_API_KEY`: Your weather API key 