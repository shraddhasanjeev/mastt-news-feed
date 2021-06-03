const express = require('express');
const token = 'f39236376746483bb4f7922954f2f503'


function validateToken(str) {
    return str == token;
}

module.exports = validateToken;