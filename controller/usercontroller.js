const login = require('../model/usermodel');
const cat = require('../model/catmodel');
const puzzle = require('../model/puzzlemodel');
const storage = require('node-persist');
storage.init( /* options ... */);
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;
    var user = await login.create(req.body);
    res.status(200).json({
        message: 'user create',
        user
    })
}

exports.A_login = async (req, res) => {
    try {
        var user = await storage.getItem('admin_login');
        if (user == undefined) {
            var data = await login.find({ email: req.body.email });
            if (data.length == 1) {
                bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
                    if (result == true) {
                        await storage.setItem('admin_login', data[0]);
                        res.status(200).json({
                            message: 'login successfuly',
                        })
                    } else {
                        res.status(200).json({
                            message: 'login failed',
                        })
                    }
                })
            } else {
                res.status(200).json({
                    message: "not login faild 2"
                })
            }
        }
        else {
            res.status(200).json({
                message: "already login"
            })
        }
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}
exports.A_logout = async (req, res) => {
    await storage.clear('admin_login');
    res.status(200).json({
        message: 'logout successfuly'
    })
}
exports.cat = async (req, res) => {
    req.body.img = req.file.originalname;

    var data = await cat.create(req.body);
    res.status(200).json({
        data
    })
}
exports.catupdate = async (req, res) => {
    var id = req.params.id;
    var data = await cat.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        message: 'categary update',
    })
}
exports.catdelete = async (req, res) => {
    var id = req.params.id;
    var data = await cat.findByIdAndDelete(id);
    res.status(200).json({
        message: 'categary delete'
    })
}
exports.catview = async (req, res) => {
    var data = await cat.find();
    res.status(200).json({
        data
    })
}
exports.add_p = async (req, res) => {

    try {
        var ans = req.body.ans;
        var array = [];
        var a = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        var k = 0;
        for (var i = 0; i < 16 - ans.length; i++) {
            var r = Math.floor(Math.random() * (122 - 97) + 97);
            array[i] = String.fromCharCode(r);
        }
        while (k !== array.length) {
            var r = Math.floor(Math.random() * (16 - 0) + 0);
            if (a[r] == '') {
                a[r] = array[k];
                k++;
            }
        }
        k = 0;
        while (k !== ans.length) {
            var r = Math.floor(Math.random() * (16 - 0) + 0);
            if (a[r] == '') {
                a[r] = ans[k];
                k++;
            }
        }
        req.body.char = a.toString();
        req.body.img = req.file.originalname;
        var data = await puzzle.create(req.body)
        res.status(200).json({
            data
        })
    } catch (error) {
        error
    }
}
exports.view_p = async (req, res) => {
    var data = await puzzle.find();
    res.status(200).json({
        massage: 'puzzle view',
        data
    })
}
exports.update_p = async (req, res) => {
    var id = req.params.id;
    var data = await puzzle.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        message: 'puzzle update',
        data
    })
}
exports.delete_p = async (req, res) => {
    var id = req.params.id;
    var data = await puzzle.findByIdAndDelete(id);
    res.status(200).json({
        message: 'puzzle delete',
        data
    })
}