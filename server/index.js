const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const Service = require('./models/Service');
// Import konfigurasi Cloudinary yang sudah kita buat
const upload = require('./config/cloudinary');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ DATABASE TERKONEKSI: Mantap Bro Agung!'))
  .catch((err) => console.error('❌ DATABASE ERROR:', err));

// -----------------------------------------------------------
// API ROUTES (CRUD LENGKAP DENGAN UPLOAD FOTO)
// -----------------------------------------------------------



// 1. REGISTER (Hanya dipakai sekali buat bikin akun Admin)
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username sudah dipakai!" });

    // Enkripsi Password (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan ke Database
    const newUser = new User({
      username,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: "Admin berhasil didaftarkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. LOGIN (Untuk masuk ke Dashboard)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek Username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Username tidak ditemukan" });

    // Cek Password (Bandingkan inputan dengan hash di DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah bro!" });

    // Bikin Token (Kartu Pass)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Expire 1 hari

    res.json({ 
      token, 
      user: { id: user._id, username: user.username } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 1. GET: Ambil Semua Data Layanan
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: Tambah Layanan Baru (+ Upload Foto)
// Perhatikan: ada upload.single('image') di sini
app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      time: req.body.time,
      // Jika ada file, pakai path Cloudinary. Jika tidak, pakai placeholder.
      image: req.file ? req.file.path : "https://via.placeholder.com/150" 
    });
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE: Hapus Layanan Berdasarkan ID
app.delete('/api/services/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Layanan berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. PUT: Update Layanan Berdasarkan ID (+ Upload Foto)
// Perhatikan: ada upload.single('image') di sini juga
app.put('/api/services/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Cek jika user mengupload foto baru
    if (req.file) {
      updateData.image = req.file.path; 
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// -----------------------------------------------------------

app.get('/', (req, res) => {
  res.send('API Adyalash Beauty Siap Melayani!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server nyala di http://localhost:${PORT}`);
});