var fs = require('fs');
var path = require('path');

var desktop = path.dirname(path.dirname(path.dirname(process.argv[1])));

var netsuite = desktop + "\\NetSuite";


var totalLines = 0;

function getLines(path) {
	var files = fs.readdirSync(path);
	if (files.indexOf('.') != -1) {
		countFileLines(path + '\\' + files)
	} else {
		for (file of files) {
			if (file.indexOf('.') == -1) {
				
				getLines(path + '\\' + file);
			} else {
				if (file.indexOf('.js') != -1) {
					countFileLines(path + '\\' + file);
				}
				
			}
		}
	}
}

getLines(netsuite);
setTimeout(function() {
	console.log(totalLines);
}, 1000)




function countFileLines(filePath){
  return new Promise((resolve, reject) => {
  let lineCount = 1;
  let i = 0;
  fs.createReadStream(filePath)
    .on("data", (buffer) => {
      for (i = 0; i < buffer.length; ++i) {
        if (buffer[i] == 10) lineCount++;
      }
    }).on("end", () => {
      resolve(lineCount);
	  totalLines += lineCount;
    }).on("error", reject);
  });
};