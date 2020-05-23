//using References (Normalization)
let author = {
  name: 'Mosh'
}

let course = {
  author: 'id'
}

//Hybrid
let author = {
  name: 'Mosh'
  //50 other properties
}

let course = {
  author: {
    id: 'ref',
    name: 'Mosh'
  }
}

//Using Embedded Documents (Denormalization)


//choosing any one as to be a Trade off between query performance vs consistency
//Using References as the advantage Consitency but disadvantage of query performance
//Using Embedded document as the advantage of query performance but the disadvantage of consistency
