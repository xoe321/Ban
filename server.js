const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const ROBLOX_WEBHOOK = "https://your-roblox-webhook-url.com"; // ใช้ URL ของ Roblox API

app.post("/ban", async (req, res) => {
    const { name, action } = req.body;
    if (!name) return res.status(400).send("กรุณากรอกชื่อผู้เล่น");

    try {
        await axios.post(ROBLOX_WEBHOOK, { name, action });
        res.send(`ส่งคำสั่ง ${action} ไปยัง Roblox สำเร็จ!`);
    } catch (error) {
        res.status(500).send("เกิดข้อผิดพลาดในการส่งคำสั่งไป Roblox");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
