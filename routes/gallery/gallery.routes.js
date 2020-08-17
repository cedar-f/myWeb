const express = require('express');
const fs = require('fs');
const path = require('path');

const controller = require('../../controller/gallery/gallery.controller');


const route = express.Router();

route.use(express.static('F:\\ảnh + video'));

route.get('/', controller.gallery);

route.get('/allpath', controller.folderTree);

route.get('/:folder', controller.galleryFolder);

route.get('/:folder/subGallery', controller.subGallery);

route.get('/:folder/:subFolder', controller.gallerySubFolder);



module.exports = route;