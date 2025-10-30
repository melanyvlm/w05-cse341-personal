const express = require("express");
const passport = require("passport");

const router = express.Router();

// 🔗 Inicia sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔙 Callback después del login exitoso
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.redirect("/auth/success");
  }
);

// ✅ Si el login fue exitoso
router.get("/success", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");
  res.send(`
    <h2>✅ Welcome ${req.user.displayName}</h2>
    <p>You’ve successfully signed in with Google.</p>
    <a href="/auth/logout">Sign out</a>
  `);
});

// ❌ Si el login falló
router.get("/failure", (req, res) => {
  res.send("❌ Error en la autenticación. Intenta de nuevo.");
});

// 🔓 Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
