// task2C

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import saveDataInDb from './saveDataInDb';
import Pet from './models/Pet';
import User from './models/User';
import isAdmin from './middlewares/isAdmin';

const urls = [
  'https://telegram.me/skillbranch',
  'https://Telegram.me/skillbranch',
  'https://Telegram.me/Skillbranch',
  'https://Telegram.me/Skillbranch',
  '//telegram.me/skillbranch',
  'http://telegram.me/skillbranch123',
  'telegram.me/skillbranch',
  'skillbranch',
  '@skillbranch',
  'https://vk.com/skillbranch',
  'http://vk.com/skillbranch',
  'vk.com/skillbranch',
  'vk.com/skillbranch?wall-117903599_1076',
  'vk.com/skillbranch/progile',
  'https://vk.com/skillbranch?w=wall-117903599_1076',
  'https://github.com/kriasoft/react-starter-kit',
  'vk.com/pavel.durov',
  'https://vk.com/pavel.durov/spam-url',
  'http://xn--80adtgbbrh1bc.xn--p1ai/pavel.durov',
];

urls.forEach((url) => {
  const result = '@' + getNameFromUrl(url);
  console.log(result);
});

function getNameFromUrl(url) {
  if (url) {
    url = url.toLowerCase();
    url = url.replace(/(https:|http:)?(\/\/)?/g, '');
    url = url.replace(/([\w\.]+)\.([a-z]{2,6})(\/)/, '');
    url = url.replace(/[0-9a-z][0-9a-z-]+[0-9a-z]\.xn--p1ai(\/)/, '');
    url = url.replace(/[@0-9]*/g, '');
    url = url.replace(/\?[a-zA-Z-_=]+/g, '');
    url = url.replace(/\/(.*)/g, '');
    return url;
  } else {
    return 'Invalid url';
  }

}

// console.log(getNameFromUrl('http://telegram.me/@internewsmaker'));

app.get('/task2C', (req, res) => {
  const url = req.query.username;
  let result = '@' + getNameFromUrl(url);
  res.send(result);
});
