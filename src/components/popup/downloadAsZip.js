import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import saveAs from "save-as";

export function saveAsZip(files) {
  const urls = files;
  const zip = new JSZip();
  let count = 0;
  const zipFilename = "evidence.zip";
  urls.forEach(async function (url) {
    const urlArr = url.split("/");
    const filename = urlArr[urlArr.length - 1];
    console.log(filename);
    try {
      const file = await JSZipUtils.getBinaryContent(url);
      zip.file(`${filename}.png`, file, { binary: true });
      count++;
      if (count === urls.length) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
}
