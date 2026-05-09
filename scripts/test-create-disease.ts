import axios from 'axios';

async function testCreateDisease() {
  try {
    const response = await axios.post('http://localhost:3000/api/diseases-conditions', {
      name: "Test Disease " + Date.now(),
      description: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Test description" }] }] },
      pictureLink: "https://res.cloudinary.com/ds0g6w4to/image/upload/v1/sdc/test.jpg"
    });
    console.log("Success:", response.data);
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testCreateDisease();
