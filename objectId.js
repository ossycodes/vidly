const mongoose = require('mongoose');

//generates an objectId in memory
const id = new mongoose.Types.ObjectId();

//determine if the objectId passed is valid
const isValidObjectId = mongoose.Types.ObjectId.isValid("5e7dfb41a5ae7c03a8b7b146");

console.log(id.getTimestamp());
console.log(isValidObjectId);
console.log(id);

//ObjectID
//_id 5e7d1eb721e6462234b6f6a8

//objectID is 24 characters
    //and every 2 characters represent a byte 
        //hence we have 12bytes to uniquely identify a document in mongoDB
             //out of this 12 bytes the first 4 bytes represent a timestamp
                //and that's the time this document was created.
                //to get the time it was created use the getTimeStamp()
                //method on the objectId.

//hence with this four bytes you don't have to create a seperate
//property such as created_at
//also if you want to sort your document based on the creation time 
//you can easily do that based on thier ID property     


//the next 3 bytes represent a machine identifier
//the next 2 bytes represent a process identifier
//the last 3 bytes represnt a counter
