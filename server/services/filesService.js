const fs = require("fs");
const PATH = `D:/Diploma/server/userStorage/`;
// const officeParser = require("officeparser");
const FORMATS = [".json", ".xlsx", ".word", ".txt", "undefined"];

class FileService {
  async createJsonFile(content) {
    try {
      const rndInt = randomIntFromInterval(10, 1000);

      const fileName = String(Date.now() + rndInt + ".json");

      fs.writeFile(`${PATH}${fileName}.json`, content, "utf8", function (err) {
        if (err) throw err;
        console.log("complete");
      });

      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  async appendJsonFile(path, content) {
    try {
      fs.appendFile(path, content, function (err) {
        if (err) return console.log(err);
        return;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteJsonFile(path) {
    try {
      fs.unlink(path, (error) => {
        if (error) return console.log(error);
        console.log("File deleted");
      });
    } catch (e) {
      console.log(e);
    }
  }

  async readJsonFile(path) {
    try {
     await fs.readFile(path, "utf-8", function (err, data) {
        if (err) {
          return console.log(err);
        }
    
      });
      console.log(file);
      return file;
    } catch (e) {
      console.log(e);
    }
  }

  /*   async parseJsonToFormat(oldPath, newfileType) {
    const config = {
      newlineDelimiter: " ",
      ignoreNotes: true,
    };
    const newPath = String(oldPath + newfileType);
    try {
      await officeParser
        .parseOfficeAsync(`${oldPath}`, config)
        .then((data) => {
          fs.writeFile(
            `D:/Diploma/server/userStorage/${newPath}`,
            JSON.stringify(data),
            (err) => {
              if (err) {
                console.log(err + "file write error");
                return;
              }
            }
          );
          //some other functions
        })
        .catch((err) => {
          console.log(err + "parser error");
          return;
        });
      return newPath;
    } catch (e) {
      console.log(e);
    }
  } */
}

module.exports = new FileService();
