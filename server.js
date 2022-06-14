const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// turn on routes
app.use(routes);

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.use((req,res) => {
  res.status(404).end();
});

// turn on connection to database and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});