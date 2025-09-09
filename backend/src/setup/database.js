'use strict';

const mongoose = require('mongoose');
const { logger } = require('./logger');
require('dotenv').config();

let isConnected = false;

// Plugin to log query timings
function timingPlugin(schema) {
  schema.pre(['find', 'findOne', 'findOneAndUpdate', 'updateMany', 'updateOne', 'aggregate', 'count', 'countDocuments'], function() {
    this.__startTime = Date.now();
  });

  function logDuration(opName) {
    const start = this.__startTime;
    if (!start) return;
    const duration = Date.now() - start;
    const modelName = this.model && this.model.modelName ? this.model.modelName : schema?.options?.collection || 'UnknownModel';
    // eslint-disable-next-line no-console
    console.log(`MongoDB ${opName} on ${modelName} took ${duration} ms`);
  }

  schema.post('find', function() { logDuration.call(this, 'find'); });
  schema.post('findOne', function() { logDuration.call(this, 'findOne'); });
  schema.post('findOneAndUpdate', function() { logDuration.call(this, 'findOneAndUpdate'); });
  schema.post('updateMany', function() { logDuration.call(this, 'updateMany'); });
  schema.post('updateOne', function() { logDuration.call(this, 'updateOne'); });
  schema.post('count', function() { logDuration.call(this, 'count'); });
  schema.post('countDocuments', function() { logDuration.call(this, 'countDocuments'); });
  // Aggregation timing: attach start in pre hook
  schema.pre('aggregate', function() { this.__startTime = Date.now(); });
  schema.post('aggregate', function() { logDuration.call(this, 'aggregate'); });
}

// Helper to explain a query with executionStats
async function explainWithStats(query) {
  if (!query || typeof query.exec !== 'function') {
    throw new Error('explainWithStats requires a Mongoose Query instance');
  }
  const mQuery = query.mongooseCollection ? query : query.model.find(query.getQuery());
  const collection = mQuery.mongooseCollection || (query.model && query.model.collection);
  if (!collection) {
    throw new Error('Could not resolve MongoDB collection from query');
  }
  const filter = mQuery.getQuery ? mQuery.getQuery() : {};
  const options = mQuery.getOptions ? mQuery.getOptions() : {};
  const cursor = collection.find(filter, options);
  return cursor.explain('executionStats');
}

async function connectToDatabase() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);

  // Attach global plugin for timing
  mongoose.plugin(timingPlugin);

  await mongoose.connect(uri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 15000,
    // Prefer DB name from the URI; avoid separate dbName to prevent mismatches
    dbName: undefined,
  });

  isConnected = true;
  const usedDb = (mongoose.connection && mongoose.connection.name) || 'unknown';
  logger.info(`Connected to MongoDB (db: ${usedDb})`);
}

module.exports = { connectToDatabase, timingPlugin, explainWithStats };


