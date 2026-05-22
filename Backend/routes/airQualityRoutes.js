const express = require('express');
const router = express.Router();
const db = require('../db');

// -----------------------------------
// AQI Trend by city
// -----------------------------------
router.get('/aqi', (req, res) => {
    const city = req.query.city;

    db.all(
        `SELECT date, aqi FROM air_quality WHERE city = ? ORDER BY date`,
        [city],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
});

// -----------------------------------
// Pollutant trend
// -----------------------------------
router.get('/trend', (req, res) => {
    const city = req.query.city;
    const pollutant = req.query.pollutant;

    db.all(
        `SELECT date, ${pollutant} FROM air_quality WHERE city = ? ORDER BY date`,
        [city],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
});

// -----------------------------------
// KPI Summary
// -----------------------------------
router.get('/kpi', (req, res) => {
    const city = req.query.city;

    db.get(
        `SELECT 
            AVG(aqi) as avg_aqi,
            MAX(aqi) as max_aqi,
            MIN(aqi) as min_aqi
         FROM air_quality
         WHERE city = ?`,
        [city],
        (err, row) => {
            if (err) return res.status(500).json(err);
            res.json(row);
        }
    );
});

// -----------------------------------
// Available cities
// -----------------------------------
router.get('/cities', (req, res) => {
    db.all(
        `SELECT DISTINCT city FROM air_quality ORDER BY city`,
        [],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
});

module.exports = router;