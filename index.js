import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render("about");
  });

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/source-code", (req, res) => {
  res.render("source_code");
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

let ImgUrl;

app.post("/submit", (req, res) => {
  const urlTxt = req.body.url;

  QRCode.toDataURL(urlTxt)
      .then(url => {
          const ImgUrl = url;
          res.render('index', { imagePath: ImgUrl });
      })
      .catch(err => {
          console.error(err);
          res.render('index', { imagePath: null });
      });
});



