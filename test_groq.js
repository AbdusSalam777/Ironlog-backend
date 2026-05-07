// const axios = require('axios');
require('dotenv').config();

async function testAI() {
    console.log('--- Testing Groq AI Integration ---');
    try {
        // We need a user ID and mock auth for this to work through the route
        // But we can test the Groq SDK directly first to see if the key works
        const { Groq } = require('groq-sdk');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        
        console.log('Sending request to Groq...');
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello in an intense fitness coach voice.' }],
            model: 'llama-3.3-70b-versatile',
        });
        
        console.log('✅ Groq Response:', completion.choices[0].message.content);
    } catch (err) {
        console.error('❌ Groq Test Failed:', err.message);
    }
}

testAI();
