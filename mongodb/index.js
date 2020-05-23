const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((error) => {
        console.log(error.message);
    });

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'WEB', 'mobile', 'network'],
        // lowercase: true
        uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // isAsync: true,
            validator: function (v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                        if (!result) {
                            reject(result);
                        }
                    }, 2000);
                })
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular',
        category: "Web",
        author: "Mosh",
        tags: ["angular", "frontend"],
        // tags: [],
        // tags: null,
        isPublished: true,
        price: 15.8
    });

    // const course = new Course({
    //     // name: "vuejs",
    //     author: "kati"
    // });

    try {
        const result = await course.save();
        console.log(course);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }


}

// createCourse();

async function getCourses() {
    // const courses = await Course.find()
    // const courses = await Course.find({ author: /^Mosh/})
    // const courses = await Course.find({ author: /Ossy$/ })
    // const courses = await Course.find({ author: /Ossy$/i })
    const courses = await Course.find({ _id: "5e7ca94aa12e241e1025e3d2" })
        // .or([{author: "Mosh"}, {isPublished: false}])
        // .and([{ author: "Mosh" }, { isPublished: false }])
        // Course.find({ price: { $gte: 10, $lte: 20} });
        // Course.find({price: {$in: [10, 15, 20]} })
        // const courses = await Course.find({ author: "Mosh", isPublished: true })
        .select({ name: 1, price: 1})
        .sort({ name: 1 })

        // .estimatedDocumentCount();
        // .countDocuments();
        // .limit(1);
    console.log(courses[0].price);
}

getCourses();


//comparison operators
// eq (equal to)
// ne (not equal to)
// gt (greater than)
// gte (greater than or equal to)
// lt  (less than)
// lte (less than or equal to)
// in
// nin (not in)

//logical operators
// or
// and


async function updateCourse(id) {
    try {
        const course = await Course.findById(id);
        if (!course) {
            return;
        }

        course.isPublished = false;
        course.author = "Ossy Auhor";

        // course.set({
        //     isPublished: true,
        //     author: "Alexis"
        // });

        const result = await course.save();
        console.log(result);

    } catch (e) {
        console.log(e.message);
    }

}

async function updateCourseTwo(id) {
    try {

        // const result = await Course.updateOne({ _id: id }, {
        //     $set: {
        //         author: "Eyewo",
        //         isPublished: false
        //     }
        // });

        // const result = await Course.findByIdAndUpdate(id, {
        //     $set: {
        //         author: "Barter",
        //         isPublished: false
        //     }
        // });

        const result = await Course.findByIdAndUpdate(id, {
            $set: {
                author: "Barter",
                isPublished: false
            }
        }, {
                new: true
            });

        console.log(result);

    } catch (e) {
        throw new Error(e.message);
    }
}

// updateCourse("5e4f61b01d3c04321c4f281e");
// updateCourseTwo("5e4f61b01d3c04321c4f281e");


async function deleteCourse(id) {
    try {

        // const result = await Course.deleteOne({ _id: id })
        const course = await Course.findByIdAndRemove(id)
        console.log(course);
        if (course) {
            console.log("deleted");
        }

    } catch (e) {

        throw new Error(e.message);

    }
}

deleteCourse("5e4f6126cefeb507fc3eeb10");



//using references (normalization)
let Author = {
    name: "Mosh"
};



/**
 *here we are using a reference, In relational databases we have this concept of
 *relationship which ensures data integrity, but in mongoDB or noSQl database
 * we dont have a relationship, so even though I am setting the id of the author
 * in the course object there is no association betweenn these two documents in the
 * database, in other words we can set this author id to an invalid one and mongodb
 * won't care!
 */

// let Course = {
//     //course hasOne Author
//     Author: "id",
//     //course hasMany Authors
//     Authors: [
//         "id1",
//         "id2"
//     ]
// };


//using embedded documents (denormalization)

// let Course = {
//     Author: {
//         name: "Mosh"
//     }
// }


//There is better way btw embedded documents and references, you have to do a tradeoff between query performance or consistency!
    //1. refences -->> CONSISTENCY (one place to change/update the Author document, extra query to load the related author document for a course document)

    //2. Embedded document -->> QueryPerformance (One query request fetches both courses and the associated author documents, 
    // but no consistency, has you would have to update multiple course document with that embedded author)