const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send({ message: 'Video URL is required' });
    }

    const outputPath = path.join(__dirname, 'downloads', '%(title)s.%(ext)s');
    const command = `yt-dlp -o "${outputPath}" ${videoUrl}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send({ message: 'Error downloading video', error: stderr });
        }
        res.send({ message: 'Download successful', details: stdout });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
