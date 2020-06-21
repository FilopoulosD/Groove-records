const mongoose = require('mongoose')
const path = require('path')


const coverImageBasePath = 'uploads/albumCovers'

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  coverImageName: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  tracksCount: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Artist'
  }
})

albumSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})





module.exports = mongoose.model('Album', albumSchema)
module.exports.coverImageBasePath = coverImageBasePath

