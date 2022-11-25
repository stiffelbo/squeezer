import React from 'react';

//Icons
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const FileIcon = ({name}) => {
    const ext = typeof name === 'string' ? name.split('.')[1] : null;

    if(ext.indexOf('jpg') > -1 ){
        return <ImageIcon />;
    }
    else if(ext.indexOf('png') > -1){
        return <PermMediaIcon />;
    }
    else if(ext.indexOf('doc') > -1){
        return <ArticleIcon />;
    }
    else if(ext.indexOf('xls') > -1){
        return <GridOnIcon />;
    }
    else if(ext.indexOf('pdf') > -1){
        return <PictureAsPdfIcon />;
    }else{
        return <InsertDriveFileIcon />
    }
}
 
export default FileIcon;