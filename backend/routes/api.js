const express = require('express');
const router = express.Router();
const { sendVerificationEmail } = require('../emailService');

router.post('/send-verification', async (req, res) => {
  try {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and code are required' 
      });
    }

    const result = await sendVerificationEmail(email, code);
    
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Verification endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;