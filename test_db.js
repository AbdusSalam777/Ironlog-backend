const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();

async function testConnections() {
    console.log('--- Database Connection Test ---');
    
    // Test PostgreSQL
    console.log('Testing PostgreSQL...');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
    });

    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL Connected:', res.rows[0].now);
    } catch (err) {
        console.error('❌ PostgreSQL Connection Failed:', err.message);
    } finally {
        await pool.end();
    }

    // Test MongoDB
    console.log('\nTesting MongoDB Atlas...');
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI missing in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Atlas Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

testConnections();
