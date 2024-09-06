// src/routes/rating.route.ts
import { Router } from 'express';
import multer from 'multer';
import { addRating } from '../controller/rating.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/ratings', upload.single('image'), addRating);

export default router;