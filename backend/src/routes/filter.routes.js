const express = require('express');
const router = express.Router();
const customerService = require('../services/customer.service');

const makeFilterRoute = (field, fallback) => async (req, res, next) => {
  try {
    const data = await customerService.filterAboveAvg(field, fallback);
    res.json({ success: true, data });
  } catch (e) { next(e); }
};

router.get('/high-purchases', makeFilterRoute('Total_Purchases', 10));
router.get('/high-lifetime', makeFilterRoute('Lifetime_Value', 1000));
router.get('/high-credit', makeFilterRoute('Credit_Balance', 2000));
router.get('/high-login', makeFilterRoute('Login_Frequency', 10));
router.get('/high-mobile', makeFilterRoute('Mobile_App_Usage', 20));
router.get('/high-discount', makeFilterRoute('Discount_Usage_Rate', 40));
router.get('/high-cart-abandonment', makeFilterRoute('Cart_Abandonment_Rate', 50));
router.get('/high-engagement', makeFilterRoute('Social_Media_Engagement_Score', 50));
router.get('/high-reviews', makeFilterRoute('Product_Reviews_Written', 3));
router.get('/high-order-value', makeFilterRoute('Average_Order_Value', 100));
router.get('/low-session', async (req, res, next) => {
  try { const data = await customerService.filterBelowAvg('Session_Duration_Avg', 30); res.json({ success: true, data }); } catch (e) { next(e); }
});
router.get('/high-session', makeFilterRoute('Session_Duration_Avg', 30));
router.get('/loyal', makeFilterRoute('Membership_Years', 3));

router.get('/churned', async (req, res, next) => {
  try { const data = await customerService.filterAboveAvg('Churned', 1); res.json({ success: true, data }); } catch (e) { next(e); }
});

router.get('/active', async (req, res, next) => {
  try { const data = await customerService.filterAboveAvg('Churned', 0); res.json({ success: true, data }); } catch (e) { next(e); }
});

module.exports = router;

