const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Route files
const topfives = require('./routes/topfives');
const auth = require('./routes/auth');

const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// File upload

app.use(fileupload());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers

app.use('/api/v1/topfives', topfives);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Serving running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & Exit process
  server.close(() => {
    process.exit(1);
  });
});
