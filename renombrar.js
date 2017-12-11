var snakeCase = require('snake-case');
var removeDiacritics = require('diacritics').remove;
var fs = require('fs');
const path = require('path');

var argv = process.argv;

var dir_svg = path.join(__dirname,'iconfont-src','svg');

if(argv[2]){
	dir_svg = path.join(__dirname,'iconfont-src',argv[2]);
}
console.log(dir_svg);

fs.readdir(dir_svg, function (err, files) {
    files.forEach(function (file) {
      console.log(file);
      fs.rename(path.join(dir_svg,file), path.join(dir_svg,removeDiacritics(snakeCase(path.basename(file,path.extname(file))))+path.extname(file)), function (err) {
        if (err) throw err;
        console.log('renamed complete');
      });
    });
});

//removeDiacritics(snakeCase(data.CATEGORIA));
