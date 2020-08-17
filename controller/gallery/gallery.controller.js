const fs = require('fs');
const {
    render
} = require('pug');

var img_pattern = RegExp('.*\.(jpg)|\.(JPG)|\.(jpeg)|\.(png)$');
var video_pattern = RegExp('.*\.(mp4)|\.(avi)|\.(3gp)|\.(MOV)|\.(mov)$');
var another_pattern = RegExp('.*[\.].*$');
const path = 'F:\\ảnh + video';

module.exports.gallery = function (req, res) {
    var folders = [];
    var imgrows = [];
    var imgCount = 0;
    var videorows = [];
    var videoCount = 0;

    var files = fs.readdirSync(path);
    files.forEach(file => {
        var stats = fs.statSync(path + '\\' + file);
        if (stats.isDirectory()) {
            folders.push(file);
        } else if (img_pattern.exec(file)) {
            if (imgCount % 4 == 0) {
                var imgrow = [];
                imgrow.push(file);
                imgrows.push(imgrow);
            } else {
                imgrows[imgrows.length - 1].push(file);
            }
            imgCount++;
        } else if (video_pattern.exec(file)) {
            if (videoCount % 4 == 0) {
                var videorow = [];
                videorow.push(file);
                videorows.push(videorow);
            } else {
                videorows[videorows.length - 1].push(file)
            }
            videoCount++;
        }
    });

    res.render('./gallery/gallery', {
        title: "GALLERY",
        folders: folders,
        img_rows: imgrows,
        video_rows: videorows,
        user: res.locals.userName ? res.locals.userName : ""
    });

};

module.exports.galleryFolder = function (req, res) {
    var folders = [];
    var imgrows = [];
    var imgCount = 0;
    var videorows = [];
    var videoCount = 0;

    var subPath = path + '\\' + req.params.folder;
    var files = fs.readdirSync(subPath);
    files.forEach(file => {
        var stats = fs.statSync(subPath + '\\' + file);
        if (stats.isDirectory()) {
            folders.push(file);
        } else if (img_pattern.exec(file)) {
            if (imgCount % 4 == 0) {
                var imgrow = [];
                imgrow.push(file);
                imgrows.push(imgrow);
            } else {
                imgrows[imgrows.length - 1].push(file);
            }
            imgCount++;
        } else if (video_pattern.exec(file)) {
            if (videoCount % 4 == 0) {
                var videorow = [];
                videorow.push(file);
                videorows.push(videorow);
            } else {
                videorows[videorows.length - 1].push(file)
            }
            videoCount++;
        }


    });

    res.render('./gallery/gallery', {
        title: "GALLERY",
        folders: folders,
        img_rows: imgrows,
        video_rows: videorows,
        user: res.locals.userName ? res.locals.userName : ""
    });

};
module.exports.gallerySubFolder = function (req, res) {
    var folders = [];
    var imgrows = [];
    var imgCount = 0;
    var videorows = [];
    var videoCount = 0;

    var subPath = path + '\\' + req.params.folder + '\\' + req.params.subFolder;
    var files = fs.readdirSync(subPath);
    files.forEach(file => {
        var stats = fs.statSync(subPath + '\\' + file);
        if (stats.isDirectory()) {
            folders.push(file);
        } else if (img_pattern.exec(file)) {
            if (imgCount % 4 == 0) {
                var imgrow = [];
                imgrow.push(file);
                imgrows.push(imgrow);
            } else {
                imgrows[imgrows.length - 1].push(file);
            }
            imgCount++;
        } else if (video_pattern.exec(file)) {
            if (videoCount % 4 == 0) {
                var videorow = [];
                videorow.push(file);
                videorows.push(videorow);
            } else {
                videorows[videorows.length - 1].push(file)
            }
            videoCount++;
        }

    });

    res.render('./gallery/gallery', {
        title: "GALLERY",
        folders: folders,
        img_rows: imgrows,
        video_rows: videorows,
        user: res.locals.userName ? res.locals.userName : ""
    });

};

function createFolderTree(path) {
    var arr = [];
    var files = fs.readdirSync(path);


    files.forEach(file => {
        var stats = fs.statSync(path + '\\' + file);
        if (img_pattern.exec(file)) {
            var obj = {
                name: file,
                type: "image"
            };
            arr.push(obj);
        } else if (video_pattern.exec(file)) {
            var obj = {
                name: file,
                type: "video"
            };
            arr.push(obj);
        } else if (stats.isDirectory()) {
            var obj = {
                name: file,
                type: "folder",
                child: createFolderTree(path + '\\' + file)
            };
            arr.push(obj);
        } else {
            var obj = {
                name: file,
                type: "unknown"
            };
            arr.push(obj);

        }
    });
    return arr;
};

module.exports.folderTree = function (req, res) {
    // console.log(createFolderTree('D:\\ảnh + video'));
    var FolderTree = createFolderTree(path);

    res.json(FolderTree);
}

module.exports.subGallery = function (req, res) {
    if (req.query.img) {
        res.render('./gallery/subGallery', {
            title: 'image',
            user: res.locals.userName ? res.locals.userName : "",
            image: req.query.img
        });
    } else if (req.query.video) {
        res.render('./gallery/subGallery', {
            title: 'video',
            user: res.locals.userName ? res.locals.userName : "",
            video: req.query.video
        });
    }
}