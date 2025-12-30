const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama layanan harus diisi'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi harus diisi']
  },
  price: {
    type: Number,
    required: [true, 'Harga harus diisi']
  },
  category: {
    type: String,
    required: [true, 'Kategori harus diisi'],
    enum: ['Eyelash', 'Nails', 'Add-ons', 'Maintenance'] // Membatasi hanya dua kategori ini
  },
  time: {
    type: String, // Contoh: "60 mins"
    default: "60 mins"
  },
  image: {
    type: String, // Kita simpan URL gambarnya saja nanti
    default: "https://via.placeholder.com/150"
  }
}, { timestamps: true }); // Otomatis buat createdAt dan updatedAt

module.exports = mongoose.model('Service', serviceSchema);