import { Request, Response, NextFunction } from 'express';
import promClient from 'prom-client';

// Create metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const activeConnections = new promClient.Gauge({
  name: 'http_active_connections',
  help: 'Number of active HTTP connections',
});

// Register metrics
promClient.register.registerMetric(httpRequestDuration);
promClient.register.registerMetric(httpRequestTotal);
promClient.register.registerMetric(activeConnections);

// Enable default metrics collection
promClient.collectDefaultMetrics({
  prefix: 'nodejs_',
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Increment active connections
  activeConnections.inc();

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    const route = req.route?.path || req.path;
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestTotal.inc(labels);
    activeConnections.dec();
  });

  next();
};

export const getMetrics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const metrics = await promClient.register.metrics();
    res.set('Content-Type', promClient.register.contentType);
    res.end(metrics);
  } catch {
    res.status(500).json({ error: 'Failed to collect metrics' });
  }
};
