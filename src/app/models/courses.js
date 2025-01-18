const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoose_delete = require("mongoose-delete");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        image: { type: String },
        idVideo: { type: String },
        level: { type: String },
        slug: {
            type: String,
            slug: "name",
        },
        deletedAt: { type: Date },
        deleted: { type: Boolean },
    },
    { timestamps: true }
);

CourseSchema.query._Sort = function (req) {
    if (req.query.hasOwnProperty("_Sort")) {
        return this.sort([[req.query.column, req.query.type]]);
    } else {
        return this;
    }
};

mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, {
    overrideMethods: "all",
    deletedAt: true,
});

module.exports = mongoose.model("Course", CourseSchema);
