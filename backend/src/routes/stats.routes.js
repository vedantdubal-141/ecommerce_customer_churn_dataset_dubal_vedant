const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');

// --- Stats Routes ---
router.get('/count', async (req, res) => {
  try { const count = await Customer.countDocuments(); res.json({ success: true, data: { totalCustomers: count } }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/average-age', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgAge: { $avg: '$Age' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/average-lifetime', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgLifetime: { $avg: '$Lifetime_Value' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/average-credit', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgCredit: { $avg: '$Credit_Balance' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/average-order-value', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgOrderValue: { $avg: '$Average_Order_Value' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/highest-purchases', async (req, res) => {
  try { const d = await Customer.findOne().sort({ Total_Purchases: -1 }); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/highest-lifetime', async (req, res) => {
  try { const d = await Customer.findOne().sort({ Lifetime_Value: -1 }); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/highest-credit', async (req, res) => {
  try { const d = await Customer.findOne().sort({ Credit_Balance: -1 }); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/country-count', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$Country', count: { $sum: 1 } } }, { $sort: { count: -1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/city-count', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$City', count: { $sum: 1 } } }, { $sort: { count: -1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/gender-count', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$Gender', count: { $sum: 1 } } }, { $sort: { count: -1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/churn-count', async (req, res) => {
  try { const churned = await Customer.countDocuments({ Churned: 1 }); const active = await Customer.countDocuments({ Churned: 0 }); res.json({ success: true, data: { churned, active } }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/signup-quarter-count', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$Signup_Quarter', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/review-count', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, totalReviews: { $sum: '$Product_Reviews_Written' }, avgReviews: { $avg: '$Product_Reviews_Written' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/mobile-usage', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgMobileUsage: { $avg: '$Mobile_App_Usage' }, totalUsers: { $sum: 1 } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

module.exports = router;
