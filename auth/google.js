const express = require("express");
const passport = require("passport");

const router = express.Router();

// ✅ Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Callback después del login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile"); // redirige a una página protegida
  }
);

// ✅ Ruta para cerrar sesión
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
