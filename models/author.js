const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, minLength: 2, maxLength: 100 },
  family_name: { type: String, required: true, minLength: 2, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  let lifetime_string = 'No Info';
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  } else {
    lifetime_string += 'Still Alive';
  }
  return lifetime_string;
});

// Virtual form author's URL
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
