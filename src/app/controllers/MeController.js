const { mutibleMongooseToObject } = require("../../utill/mongoose");
const Course = require("../models/courses");

class MeController {
    show(req, res, next) {
        Promise.all([
            Course.countDocumentsWithDeleted({ deleted: true }),
            Course.find({})._Sort(req),
        ]).then(([countDeleted, courses]) => {
            res.render("me/courses", {
                courses: mutibleMongooseToObject(courses),
                countDeleted,
            });
        });
    }

    async trash(req, res, next) {
        try {
            const courses = await Course.findWithDeleted({ deleted: true });
            res.render("me/courses-trash", {
                courses: mutibleMongooseToObject(courses),
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MeController();
