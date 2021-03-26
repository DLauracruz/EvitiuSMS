import { useState } from "react";
import shortid from "shortid";

// Libraries
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import saveAs from "save-as";

export const useFilesAsZip = (initialState = []) => {
  const [files, setFiles] = useState(initialState);
  const [urls, setUrls] = useState([]);

  const setFilesAsZip = async (files) => {
    setFiles(files);

    const urls = await files.map((file) => URL.createObjectURL(file));
    setUrls(urls);
    console.log(urls);
  };

  const saveAsZip = (zipName = shortid.generate()) => {
    let count = 0;
    const zip = new JSZip();
    const zipFilename = `${zipName}.zip`;

    urls.forEach(async function (url, idx) {
      try {
        const file = await JSZipUtils.getBinaryContent(url);
        zip.file(files[idx].name, file, { binary: true });

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
  };

  return {
    files,
    urls,
    setFilesAsZip,
    saveAsZip,
  };
};
