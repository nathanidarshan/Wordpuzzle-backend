var express = require('express');
var router = express.Router();

//----------------------------|| Admin Api's ||---------------------------------

var admin = require('../controller/admincontroller');

router.get('/viewadmin', admin.admin_get_data);
router.post('/admininsert', admin.admin_insert);
router.post('/adminlogin/', admin.admin_login);
router.get('/adminlogout/', admin.admin_logout);

//----------------------------|| User Api's ||---------------------------------

var user = require('../controller/usercontroller');

router.get('/view-user', user.get_data);
router.post('/add-user', user.insert);
router.post('/login/', user.login);
router.get('/logout/', user.logout);

//----------------------------|| Puzzle Api's ||---------------------------------

const multer = require('multer');
var puzzle = require('../controller/puzzlecontroller');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/add-puzzle', upload.single('p_image'), puzzle.insert);
router.get('/', puzzle.get_data);

//----------------------------|| Category Api's ||---------------------------------

var category = require('../controller/categorycontroller');

router.post('/add_cat',category.insert);
router.get('/view_cat',category.get_data);


module.exports = router;
