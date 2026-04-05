import express from "express";

const router = express.Router();

router.get("/login",(req, res) => {
    res.send("Login endPoint");
})
router.get("/logout",(req, res) => {
    res.send("Logout endPoint");
})
router.get("/signup",(req, res) => {
    res.send("Signup endPoint");
})


export default router;