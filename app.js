const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const { initDb } = require("./db/connect");
const moviesRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { saveUser } = require("./controllers/users"); // 👈 mueve esto AQUÍ arriba

dotenv.config();
const app = express();

app.use(express.json());

// 🧠 Configurar sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// 🧭 Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// ⚙️ Configurar Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("✅ Usuario autenticado:", profile.displayName);
      await saveUser(profile).catch(console.error); // 👈 Guarda el usuario en MongoDB
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// 🏠 Página principal
// 🏠 Página principal
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>🎬 Welcome, ${req.user.displayName}!</h1>
      <nav>
        <ul>
          <li><a href="/movies">Waatch movies</a></li>
          <li><a href="/logout">Sign out</a></li>
        </ul>
      </nav>
    `);
  } else {
    res.send(`
      <h1>Welcome to the Movies API 🎥</h1>
      <p>To continue, please sign in:</p>
      <a href="/auth/google">Sign in with Google</a>
    `);
  }
});


app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/"); // 👈 vuelve al home
    });
  });
});


// 🔗 Rutas principales
app.use("/movies", moviesRoutes);
app.use("/auth", authRoutes);

// 📘 Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API documentation for the Movies database project",
    },
    servers: [{ url: process.env.RENDER_URL || "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// 🚀 Conexión a la base de datos y servidor
initDb((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
      console.log("📚 Swagger docs available at http://localhost:3000/api-docs");
      console.log("🔐 Google login available at http://localhost:3000/auth/google");
    });
  }
});
