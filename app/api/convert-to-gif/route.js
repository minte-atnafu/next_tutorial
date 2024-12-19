import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs/promises';

// Manually set the correct path to ffmpeg.exe
const ffmpegExecutablePath = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
console.log('Manually set FFmpeg Path:', ffmpegExecutablePath);

// Set the ffmpeg path
ffmpeg.setFfmpegPath(ffmpegExecutablePath);

export async function POST(req) {
  try {
    const data = await req.formData();
    const video = data.get('video');

    if (!video) {
      return NextResponse.json({ error: 'No video uploaded.' }, { status: 400 });
    }

    const tmpDir = path.join(process.cwd(), 'tmp');
    const tempVideoPath = path.join(tmpDir, `${Date.now()}_video.mp4`);
    const outputGifPath = path.join(process.cwd(), 'public', 'output.gif');

    // Ensure the 'tmp' directory exists
    await fs.mkdir(tmpDir, { recursive: true });

    // Save the uploaded video to a temporary file
    await fs.writeFile(tempVideoPath, Buffer.from(await video.arrayBuffer()));

    // Convert video to GIF
    await convertVideoToGif(tempVideoPath, outputGifPath);

    // Clean up temporary video file
    await fs.unlink(tempVideoPath);

    return NextResponse.json({ message: 'GIF conversion successful', gifUrl: `/output.gif` });

  } catch (error) {
    console.error('Error during GIF conversion:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const convertVideoToGif = (videoPath, outputGifPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(outputGifPath)
      .on('end', () => {
        console.log('GIF conversion complete:', outputGifPath);
        resolve(outputGifPath);
      })
      .on('error', (error) => {
        console.error('Error during GIF conversion:', error);
        reject(error);
      })
      .run();
  });
};
