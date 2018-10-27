const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const auth = require('../utils/auth')

mongoose.connect('mongodb://localhost/test');

const User = require('./user')({ mongoose, Schema, auth })

module.exports = { User }