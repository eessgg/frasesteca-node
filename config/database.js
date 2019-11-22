if(process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI:`mongodb+srv://esterdev:esterdev@omnistack-cjkv9.mongodb.net/vidjotAppVsDois?retryWrites=true&w=majority`}
} else {
  module.exports = { mongoURI: `mongodb://localhost/vidjotAppVsDois`}
}