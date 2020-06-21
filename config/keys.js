

dbPassword = 'mongodb+srv://sofro:'+ encodeURIComponent('1YHVjCQIxCGXuGVL') + '@cluster0-hhdc6.mongodb.net/test?retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbPassword
};

//mongodb+srv://sofro:1YHVjCQIxCGXuGVL@cluster0-hhdc6.mongodb.net/test?retryWrites=true&w=majority

//retryWrites=true&w=majority&authSource=admin&readPreference=secondary