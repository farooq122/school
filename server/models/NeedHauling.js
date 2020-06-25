//Code Author: Sp1d3r
var mongoose = require('mongoose');

var NeedHaulerSchema = new mongoose.Schema({
  description: { type: String },
  travel_distance: String,
  zip: String,
  worktype: {
    type: String,
    default: 'mile',
    enum: ['job', 'mile']
  },
  price: {
    required: true,
    type: Number
  },
  language: {
    type: String,
    default: 'both',
    enum: ['english', 'spanish', 'both']
  },
  contactMethod: {
    type: String,
    default: 'call',
    enum: ['call', 'email', 'text', 'website']
  },
  image: [],
  package: {
    type: String,
    default: 'regular',
    enum: ['regular', 'platinum', 'super']
  },
  // createdBy:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'user'
  // }
})


NeedHaulerSchema.methods.toAuthJSON = function () {
  return {
    description: this.description,
    travel_distance: this.travel_distance,
    worktype: this.worktype,
    price: this.price,
    language: this.language,
    contactMethod: this.contactMethod,
    image: this.image,
    package: this.package,
    createdBy: this.createdBy
  };
};
mongoose.model('needhaul', NeedHaulerSchema);
