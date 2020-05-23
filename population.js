const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

/**
 * only the properties that you have defined in your defined in your model
 * would be persisted to your database.
 */
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

/**
 * we don't really have a proper relationship here
 * we can store a course with an invalid author
 * and mongo won't complain about that  
 */
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  //defines a relationship to author via reference.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

/**
 * populate loads the relationship collection
 * populate('relationshipname)
 */
async function listCourses() {
  const courses = await Course
    .find()
    // .select('name');
    //fetch the name and author field 
    //loads the relationship defined as argument
    // .populate('author')
    //second argument to populate selects the fields
    //we want to select from the loaded relationship
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '5e7d243b91391f1f74089283')

listCourses();