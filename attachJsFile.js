function AddJS(name){
if (name==null){ return; }
head=document.getElementsByTagName('HEAD')[0];
// next line removes the previously added External JavaScript
//if (JSAdd){ head.removeChild(JSAdd); }
JSAdd=document.createElement('SCRIPT');
JSAdd.type='text/javascript';
JSAdd.src=name;
head.appendChild(JSAdd);
}

AddJS(chrome.extension.getURL("RT.js"));	
 

