const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sql_codeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'username'
    },
    title: {
      type: String,
      trim: true,
      require: true,
      maxlength: 100
    },
    sql_code: {
      type: String,
      maxlength: 4000
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sql_code', sql_codeSchema);
