import { Router } from 'express';
import appsController from '@/controllers/apps.controller';

const router = Router();

router.post('/', appsController.create);
router.put('/:key', appsController.update);
router.get('/:key', appsController.get);
router.get('/', appsController.index);
router.delete('/:key', appsController.delete);
router.put('/:key/block', appsController.block);
router.put('/:key/unblock', appsController.unblock);
router.put('/:key/signature', appsController.updateSignature);

export default router;
