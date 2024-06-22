import express from 'express';
import { createGroup, getGroup, getAllGroups } from '../controllers/groupController.js';

const router = express.Router();

// Create a new group
router.post('/create',  createGroup);

// Get group details
router.get('/:groupId', getGroup);

router.get("/", getAllGroups)

export default router;
