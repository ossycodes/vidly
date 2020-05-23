const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
    name: String,
    //defining author relationship via embedding it as opposed to reference
    // author: authorSchema
    //you can make author required by passing an a type object
    // author: {
    //     type: authorSchema,
    //     required: true
    // }

    //now for arrays of author
    //a course has many authors kind of relationship
    authors: [authorSchema]
});

const Course = mongoose.model('Course', courseSchema);

// async function createCourse(name, author) {
//     const course = new Course({
//         name,
//         author
//     });

//     const result = await course.save();
//     console.log(result);
// }

//create course, along with authors
async function createCourseWithAuthors(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    /**
     * to update an embedded or subdocument
     * you have the query the parent document
     * and the update the subdocument
     */

    // const course = await Course.findById(courseId);
    // course.author.name = 'Ossy';
    // course.save();

    /**
     * or you can update directly
     */

    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'John Smith'
        }
    });

}


async function deleteAuthorPropertyOrAuthorSubDocument(courseId, prop = null) {
    const course = await Course.updateOne({ _id: courseId }, {
        // if(props) {
        //     $unset: {
        //         "author.${prop}": ''
        //     }
        // }
        $unset: {
            "author": " "
        }
    })
}


async function createAuthors(courseId, author) {
    const course = await Course.findById(courseId);
    /**
     * since our embedded/subdocument author is an
     * array we can use the push method to add to it
     */
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    //we can look up a child id (embbedded/subdocument id)
    const author = course.authors.id(authorId);
    author.remove();
    course.save();    
}

// createCourse('Node Course (Embedded)', new Author({ name: 'Mosh' }));

// createCourseWithAuthors("Vue Course", [
//     new Author({ name: "Martin" }),
//     new Author({ name: "John" })
// ]);

// createAuthors("5e7d2fb34709090b00cc5c3c", new Author({ name: "Jasmin" }));
removeAuthor("5e7d2fb34709090b00cc5c3c", "5e7d2fb34709090b00cc5c3b");
// updateAuthor("5e7d2aac1744790adc91bf45");
// deleteAuthorPropertyOrAuthorSubDocument("5e7d2aac1744790adc91bf45");
