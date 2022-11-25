import JSZip from "jszip";
import { saveAs } from 'file-saver';

export const downloadAndZip = async (zipName = "files", list = []) => {
    //zipName - string, name of file
    //list - array of objects {name, url}
    let zip = new JSZip();
    let folder = zip.folder(zipName);

    await Promise.all(list.map(async item => {
        const response = await fetch(item.url);
        const imageBlob = await response.blob();     
        // create a new file from the blob object
        const imageFile = new File([imageBlob], item.name, {type: 'image/jpeg'});
        folder.file(item.name, imageFile);
    }));

    /* Generate a zip file asynchronously and trigger the download */
    const zipped = await folder.generateAsync({ type: "blob" });
    if(saveAs(zipped, zipName)){
        return true;
    }else{
        return false;
    };
}