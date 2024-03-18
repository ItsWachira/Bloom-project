const express = require("express");
const client = require("prom-client");

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: "express_rest_api_response_time_duration_seconds",
    help: "Duration of Express REST API HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    
});

export const databaseResponseTimeHistogram = new client.Histogram({
    name: "database_response_time_duration_seconds",
    help: "Database operation response time in seconds",
    labelNames: ["operation", "success"],
});

export function startMetricsServer() {
const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

    app.get('/metrics', async (req, res) => {
        res.set("Content-Type", client.register.contentType);
        return res.send(await client.register.metrics());
    });

    app.listen(8000, () => {
        console.log("Metrics server started at http://localhost:8000");
    });
}
