

import {Router} from "express";
import {CreateUser, GetallProduct, GetMenProduct, GetWomenProduct} from "../controls/userform";
// import tryCatch from "../middlewares/tryCatch";


const router=Router();

router.post('/register',CreateUser);
router.get('/getallp',GetallProduct);
router.get('/getMenp',GetMenProduct);
router.get('/getWomenp',GetWomenProduct)

export default router;
