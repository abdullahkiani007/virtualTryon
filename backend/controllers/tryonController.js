const axios = require('axios');
const fs = require('fs');

// Helper function to upload the image to the signed URL
async function uploadToSignedUrl(filePath, url) {
  console.log(`Uploading file ${filePath} to URL ${url}`);
  const imageData = fs.readFileSync(filePath);
  try {
    const response = await axios.put(url, imageData, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
    console.log(`Upload response status: ${response.status}`);
    return response.status === 200;
  } catch (error) {
    console.error(`Failed to upload file ${filePath}:, error.message`);
    throw error;
  }
}

const tryonController = {
  handleTryOn: async (req, res) => {
    console.log('Received a try-on request');
    console.log('Request body:', req.body);
    const API_KEY = "hb-yUnj291lOOedNIDRASPVZ8BUAs4MZCN1"
    const API_KEY92 = 'hb-HyMzo18FeleHR8BWfuH3sWpfuloM3sJ8'; // Replace with your actual API key
    try {
      const { category, caption } = req.body;
      console.log('Category:', category);
      console.log('Caption:', caption);

      const userImage = req.files['userImage'][0];
      const clothImage = req.files['clothImage'][0];

      if (!userImage || !clothImage || !category) {
        console.error('Missing required parameters: userImage, clothImage, or category');
        return res.status(400).json({ error: 'Please provide userImage, clothImage, and category' });
      }

      console.log('Step 1: Creating a task');
      const taskResponse = await axios.post(
        'https://heybeauty.ai/api/create-task',
        {
          user_img_name: userImage.originalname,
          cloth_img_name: clothImage.originalname,
          category: category,
          caption: caption || '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const taskData = taskResponse.data.data;
      const taskUUID = taskData.uuid;
      const userImgUrl = taskData.user_img_url;
      const clothImgUrl = taskData.cloth_img_url;

      // Step 2: Upload images to signed URLs
      await uploadToSignedUrl(userImage.path, userImgUrl);
      await uploadToSignedUrl(clothImage.path, clothImgUrl);

      // Step 3: Submit task for processing
      const submitResponse = await axios.post(
        'https://heybeauty.ai/api/submit-task',
        { task_uuid: taskUUID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      // Step 4: Poll the task status until the try-on image is ready
      let tryOnImageUrl = '';
      while (true) {
        const taskInfoResponse = await axios.post(
          'https://heybeauty.ai/api/get-task-info',
          { task_uuid: taskUUID },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const taskInfo = taskInfoResponse.data.data;
        if (taskInfo.status === 'successed') {
          tryOnImageUrl = taskInfo.tryon_img_url;
          break;
        } else if (taskInfo.status === 'failed') {
          console.error('Try-on task failed.');
          return res.status(500).json({ error: 'Try-on task failed.' });
        }

        await new Promise(resolve => setTimeout(resolve, 3000)); // Polling delay
      }

      res.status(200).json({
        message: 'Try-on completed successfully!',
        tryon_image_url: tryOnImageUrl,
      });

      // Clean up the uploaded files
      fs.unlinkSync(userImage.path);
      fs.unlinkSync(clothImage.path);
    } catch (error) {
      console.error('Error processing try-on:', error.message);
      res.status(500).json({ error: 'An error occurred while processing the try-on.' });
    }
  }
};

module.exports = tryonController