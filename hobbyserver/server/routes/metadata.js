app.get('/metadata', (req, res) => {
db.collection('metadata').find().toArray((err, result) => {
    const metadataArray= result.map(element => element._id);
          console.log(imgArray);

   if (err) return console.log(err)
   res.send(imgArray)
  })
});
