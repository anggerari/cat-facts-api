'use strict'

import { Router } from 'express';

import catfacts from './catfacts.js';

// Import routes

const router = Router({
  caseSensitive: true
})

router.get('/', function(req, res, next) {
  res.send({
      message: 'Welcome to the beginning of nothingness.',
  })
});

router.use('/api',catfacts);
// Use imported routes in router

export default router;