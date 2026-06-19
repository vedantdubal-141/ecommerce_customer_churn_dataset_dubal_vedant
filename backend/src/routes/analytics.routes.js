const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');

// --- Analytics Routes ---
router.get('/top-buyers', async (req, res) => {
  try { const d = await Customer.find().sort({ Total_Purchases: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-lifetime', async (req, res) => {
  try { const d = await Customer.find().sort({ Lifetime_Value: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-credit', async (req, res) => {
  try { const d = await Customer.find().sort({ Credit_Balance: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-engagement', async (req, res) => {
  try { const d = await Customer.find().sort({ Social_Media_Engagement_Score: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-mobile-users', async (req, res) => {
  try { const d = await Customer.find().sort({ Mobile_App_Usage: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-discount-users', async (req, res) => {
  try { const d = await Customer.find().sort({ Discount_Usage_Rate: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/top-reviewers', async (req, res) => {
  try { const d = await Customer.find().sort({ Product_Reviews_Written: -1 }).limit(20); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/churn-analysis', async (req, res) => {
  try { const total = await Customer.countDocuments(); const churned = await Customer.countDocuments({ Churned: 1 }); res.json({ success: true, data: { total, churned, active: total - churned, churnRate: ((churned / total * 100) || 0).toFixed(2) + '%' } }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/retention', async (req, res) => {
  try { const total = await Customer.countDocuments(); const active = await Customer.countDocuments({ Churned: 0 }); res.json({ success: true, data: { total, retained: active, retentionRate: ((active / total * 100) || 0).toFixed(2) + '%' } }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/session-analysis', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgSession: { $avg: '$Session_Duration_Avg' }, minSession: { $min: '$Session_Duration_Avg' }, maxSession: { $max: '$Session_Duration_Avg' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/purchase-analysis', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgPurchases: { $avg: '$Total_Purchases' }, avgOrderValue: { $avg: '$Average_Order_Value' }, totalLifetime: { $sum: '$Lifetime_Value' } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/country-analysis', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$Country', count: { $sum: 1 }, avgLifetime: { $avg: '$Lifetime_Value' } } }, { $sort: { count: -1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/city-analysis', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$City', count: { $sum: 1 }, avgLifetime: { $avg: '$Lifetime_Value' } } }, { $sort: { count: -1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/signup-analysis', async (req, res) => {
  try { const d = await Customer.aggregate([{ $group: { _id: '$Signup_Quarter', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]); res.json({ success: true, data: d }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get('/payment-analysis', async (req, res) => {
  try { const stats = await Customer.aggregate([{ $group: { _id: null, avgPaymentMethods: { $avg: '$Payment_Method_Diversity' }, diverseUsers: { $sum: { $cond: [{ $gte: ['$Payment_Method_Diversity', 2] }, 1, 0] } } } }]); res.json({ success: true, data: stats[0] }); } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

module.exports = router;
