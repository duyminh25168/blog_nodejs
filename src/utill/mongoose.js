module.exports = {
    mutibleMongooseToObject: (mongooses) => {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    MongooseToObject: (mongooses) => {
        return mongooses.toObject();
    },
};
