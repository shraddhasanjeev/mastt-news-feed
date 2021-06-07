const express = require('express');
const config = require('../config.json');

function validateToken(str) {
    return str == config.security.token;
}

module.exports = validateToken;