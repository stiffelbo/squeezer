import {toast} from 'react-toastify';

export const copyTxtToClipboard = txt => {
    if(txt){
        const fakeInput = document.createElement('input');
        fakeInput.setAttribute('value', txt);
        document.body.appendChild(fakeInput);
        fakeInput.select();
        document.execCommand('copy');
        fakeInput.parentNode.removeChild(fakeInput);
        return true;
    }else{
        return false;
    }    
}

export const handleCopy = val => {
    if(typeof val === 'string'){
        if(copyTxtToClipboard(val)){
            toast.success('Skopiowano!');
        };
    }
    if(typeof val === 'object'){
        let range = document.createRange();
        range.selectNode(val);
        window.getSelection().addRange(range);
        if(document.execCommand('copy')){
            toast.success('Skopiowano!');
        };            
    }
}