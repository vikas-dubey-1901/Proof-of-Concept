var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
/**
 * Add consumer key, secret, call back url. require passport, passport-twitter and express-session
 */
var TWITTER_CONSUMER_KEY = "process.env.key";
var TWITTER_CONSUMER_SECRET = "process.env.secret";
var callbackURL = "/twitter/callback";

var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var sess = require("express-session");
const { config } = require("process");
var BetterMemoryStore = require("session-memory-store")(sess);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: "DrgSI53WCNAMJ2NoqmGtoTNxJ",
      consumerSecret: "2mw6NFhGTwfCgKbRYeZaly9h3Pe6Cat6whriELVweHBLxjAvLJ",
      callbackURL: "https://tweet-handler.herokuapp.com/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    }
  )
);

// Serialize and deserialize user information
passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (object, callback) {
  callback(null, object);
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* add session cofig */
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(
  sess({
    name: "JSESSION",
    secret: "MYSECRETISVERYSECRET",
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Add route '/'

app.get("/", function (req, res) {
  res.render("index", {
    user: req.user,
    title: "Conversations",
  });
   console.log(res.data);
});

/** Add twitter login and return methoods */
app.get("/twitter/login", passport.authenticate("twitter"));

app.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = app;
