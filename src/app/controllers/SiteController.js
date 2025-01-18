const Course = require("../models/courses");
const { mutibleMongooseToObject } = require("../../utill/mongoose");

class SiteController {
    async home(req, res, next) {
        try {
            const courses = await Course.find({});
            res.render("home", {
                courses: mutibleMongooseToObject(courses),
            });
        } catch (err) {
            next(err);
        }
    }
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
