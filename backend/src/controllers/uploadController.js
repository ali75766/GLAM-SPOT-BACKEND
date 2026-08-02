const uploadImages = (req, res) => {
  const files = (req.files || []).map((file) => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  }));

  res.status(201).json({
    files
  });
};

module.exports = {
  uploadImages
};
