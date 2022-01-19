'use strict'

import { Router } from 'express';
import handler from '../handlers/catfactsHandler.js';

const router = Router();

// get list cats api
router.get('/getListCats', handler.getListFromAPI);
router.get('/getCatFacts', handler.getListFromDB);
router.post('/add-fact-cats', handler.insertData);
router.put('/update-fact-cats/:id', handler.updateData);
router.delete('/delete-fact-cats/:id', handler.deleteData);

export default router;