const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 ambil file HTML
app.use(express.static(path.join(__dirname, 'public')));

// endpoint QR
app.post('/generate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text wajib diisi" });
    }

    try {
        const qr = await QRCode.toDataURL(text);
        res.json({ qr });
    } catch (err) {
        res.status(500).json({ message: "Gagal generate QR" });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});