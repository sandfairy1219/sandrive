const File = require('../models/File');

exports.uploadFile = async (req, res) => {
    try {
        const { filename, path } = req.file;
        const userId = req.user.id; // Assuming user ID is available in req.user

        const newFile = new File({
            filename,
            path,
            userId
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.download(file.path, file.filename);
    } catch (error) {
        res.status(500).json({ message: 'File download failed', error: error.message });
    }
};