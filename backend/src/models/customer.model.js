const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    Age: { type: Number, required: true },
    Gender: { type: String, required: true, enum: ['Male', 'Female'] },
    Country: { type: String, required: true },
    City: { type: String, required: true },
    Membership_Years: { type: Number, min: 0 },
    Login_Frequency: { type: Number, min: 0 },
    Session_Duration_Avg: { type: Number, min: 0 },
    Pages_Per_Session: { type: Number, min: 0 },
    Cart_Abandonment_Rate: { type: Number, min: 0, max: 100 },
    Wishlist_Items: { type: Number, min: 0 },
    Total_Purchases: { type: Number, min: 0 },
    Average_Order_Value: { type: Number, min: 0 },
    Days_Since_Last_Purchase: { type: Number, min: 0 },
    Discount_Usage_Rate: { type: Number, min: 0, max: 100 },
    Returns_Rate: { type: Number, min: 0, max: 100 },
    Email_Open_Rate: { type: Number, min: 0, max: 100 },
    Customer_Service_Calls: { type: Number, min: 0 },
    Product_Reviews_Written: { type: Number, min: 0 },
    Social_Media_Engagement_Score: { type: Number, min: 0 },
    Mobile_App_Usage: { type: Number, min: 0 },
    Payment_Method_Diversity: { type: Number, min: 0 },
    Lifetime_Value: { type: Number, min: 0 },
    Credit_Balance: { type: Number, min: 0 },
    Churned: { type: Number, required: true, enum: [0, 1] },
    Signup_Quarter: { type: String, enum: ['Q1', 'Q2', 'Q3', 'Q4'] }
  },
  { timestamps: true }
);

customerSchema.index({ Country: 1 });
customerSchema.index({ City: 1 });
customerSchema.index({ Gender: 1 });
customerSchema.index({ Churned: 1 });
customerSchema.index({ Signup_Quarter: 1 });
customerSchema.index({ Lifetime_Value: 1 });

module.exports = mongoose.model('Customer', customerSchema);
