export const multipleMongooseToObject = (mongooseArray) => {
    return mongooseArray.map(mongoose => mongoose.toObject());
};

export const mongooseToObject = (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
};