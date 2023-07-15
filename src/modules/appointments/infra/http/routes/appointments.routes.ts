import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensuredAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

//exportando a rota
export default appointmentsRouter;