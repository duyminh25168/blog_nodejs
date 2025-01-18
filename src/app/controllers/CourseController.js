const { MongooseToObject } = require("../../utill/mongoose");
const Course = require("../models/courses");

class SourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: MongooseToObject(course),
                });
            })
            .catch((err) => next);
    }

    create(req, res, next) {
        res.render("courses/create");
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/hq720.jpg`;
        formData.idVideo = `${req.body.videoId}`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/me/courses"))
            .catch((error) => {
                console.error(error);
                next(error);
            });
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById({ _id: req.params.id })
            .then((course) => {
                res.render("courses/edit", {
                    course: MongooseToObject(course),
                });
            })
            .catch((err) => next);
    }

    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/hq720.jpg`;
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect("/me/courses"))
            .catch((error) => {
                console.error(error);
                next(error);
            });
    }

    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch((error) => {
                next(error);
            });
    }

    trash_delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch((error) => {
                next(error);
            });
    }

    trash_restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("/me/courses-trash"))
            .catch((error) => {
                next(error);
            });
    }

    action(req, res, next) {
        switch (req.body.Action) {
            case "delete":
                req.body.idCheckeds.forEach((idChecked) => {
                    Course.delete({ _id: idChecked }).then(() => {});
                });
                break;
            case "restore":
                req.body.idCheckeds.forEach((idChecked) => {
                    Course.restore({ _id: idChecked }).then(() => {});
                });
                break;
            case "delete-trash":
                req.body.idCheckeds.forEach((idChecked) => {
                    Course.deleteOne({ _id: idChecked }).then(() => {});
                });
                break;
        }
        res.redirect("back");
    }
}

module.exports = new SourseController();
