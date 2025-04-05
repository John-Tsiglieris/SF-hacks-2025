const API_KEY = 'AIzaSyCpbcQuSLrdQi9nuRE4v_PEWEuelXqC3kc';
const MODEL = 'models/gemini-2.0-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

const rateLimiter = {
  tokens: 60,
  lastRefill: Date.now(),
  refillRate: 60000,
  checkLimit: function () {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    this.tokens = Math.min(60, this.tokens + Math.floor(timePassed / this.refillRate) * 60);
    this.lastRefill = now;
    if (this.tokens < 1) return false;
    this.tokens--;
    return true;
  }
};

async function getRegionalDisasterHistory(region, city = null) {
  if (!rateLimiter.checkLimit()) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  const endpoint = `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`;
  const location = city ? `${city}, ${region}` : region;
  const prompt = `List the most common natural disasters and environmental hazards for ${location}. Include bullet points and severity/frequency levels.`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) throw new Error('No valid response from Gemini');

    return reply;
  } catch (err) {
    console.error('Error fetching disaster data:', err);
    throw new Error('Failed to fetch regional disaster information');
  }
}

export { getRegionalDisasterHistory };
