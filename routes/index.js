var express = require('express');
var router = express.Router();
const con = require('../controller/usercontroller');
const multer = require('multer');
/* GET home page. */

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage })

router.post('/img_upload', upload.single('img'), con.cat);

router.post('/user_add', con.create);
router.post('/user_login', con.A_login);
router.get('/user_logout', con.A_logout);
router.post('/cat_update/:id', con.catupdate);
router.post('/cat_delete/:id', con.catdelete);
router.get('/cat_view', con.catview);

router.post('/puzz_add',upload.single('img'), con.add_p);
router.get('/puzz_view', con.view_p);
router.post('/puzz_update/:id', con.update_p);
router.get('/puzz_delete/:id', con.delete_p);

module.exports = router;
