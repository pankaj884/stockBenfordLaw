import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sampleRoutes from './routes/sampleRoutes';
import stockRoutes from './routes/sampleRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from "path";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/sample', sampleRoutes);
app.use('/stocks', stockRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

// Swagger documentation options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stocks API Documentation',
      version: '1.0.0',
      description: 'API documentation for stocks REST API service',
    },
  },
  apis: [path.join( __dirname,"./routes/*.js" )] 
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const closeServer = function () {
  server.close();
};

export { app, closeServer };
