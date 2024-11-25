import { Router } from 'express';

import appsController from '@/controllers/apps.controller';

const router = Router();

router.post('/', appsController.create);
router.put('/', appsController.update);
router.get('/:id', appsController.get);
router.get('/', appsController.index);
router.delete('/', appsController.delete);

export default router;
