

/* =====================================================
   ADVANCED MEDIA VAULT
===================================================== */

let activeVault = "Default";
let currentFolder = null;


/* =====================================================
   RENDER PAGE
===================================================== */

function renderMediaVaultPage(){

const container = document.getElementById("app-view");
if(!container) return;

container.innerHTML = `

<div class="vault-page">

<div class="vault-header">

<div>
<h1><i class="fas fa-vault"></i> Media Vault</h1>
<p>Store files, videos, notes and documents.</p>
</div>

<div class="vault-actions">

<button class="btn" id="toggleVaultSidebar">
<i class="fas fa-bars"></i>
</button>

<input id="vaultSearch" placeholder="Search..." />

<button class="btn" id="createVaultBtn">
<i class="fas fa-folder-plus"></i>
</button>

<button class="btn" id="createFolderBtn">
<i class="fas fa-folder"></i>
</button>

<button class="btn" id="newNoteBtn">
<i class="fas fa-note-sticky"></i>
</button>

<input type="file" id="vaultUpload" hidden multiple>

<button class="btn" id="uploadBtn">
<i class="fas fa-upload"></i>
</button>

</div>

</div>


<div class="vault-layout">

<aside class="vault-sidebar card">
<h3>Vaults</h3>
<ul id="vaultList"></ul>
</aside>

<div class="vault-overlay" id="vaultOverlay"></div>


<main class="vault-content">

<div class="vault-breadcrumb">
<span id="vaultRoot">Vault</span>
<span id="folderPath"></span>
</div>

<div id="vaultStats" class="vault-stats"></div>

<div id="dropZone" class="drop-zone">
<i class="fas fa-cloud-upload-alt"></i>
<p>Drag & Drop Files</p>
</div>

<div id="vaultItems" class="vault-grid"></div>

</main>

</div>


<!-- ACTION MODAL -->

<div id="vaultModal" class="vault-modal">

<div class="vault-modal-box card">

<div class="vault-modal-header">
<h3 id="vaultModalTitle"></h3>
<button id="vaultModalClose">&times;</button>
</div>

<div id="vaultModalBody" class="vault-modal-body"></div>

<div class="vault-modal-footer">
<button class="btn" id="vaultModalCancel">Cancel</button>
<button class="btn primary" id="vaultModalConfirm">Save</button>
</div>

</div>

</div>


<!-- PREVIEW MODAL -->

<div id="vaultPreview" class="vault-preview">

<div class="vault-preview-box card">

<button id="closePreview" class="preview-close">
<i class="fas fa-times"></i>
</button>

<div id="previewContent"></div>

</div>

</div>

</div>
`;

initMediaVault();

}


/* =====================================================
   INIT SYSTEM
===================================================== */

function initMediaVault(){

const vaultList = document.getElementById("vaultList");
const vaultItems = document.getElementById("vaultItems");
const uploadInput = document.getElementById("vaultUpload");
const dropZone = document.getElementById("dropZone");
const searchInput = document.getElementById("vaultSearch");
const folderPath = document.getElementById("folderPath");
const statsBox = document.getElementById("vaultStats");

const sidebar = document.querySelector(".vault-sidebar");
const overlay = document.getElementById("vaultOverlay");

const modal = document.getElementById("vaultModal");
const modalTitle = document.getElementById("vaultModalTitle");
const modalBody = document.getElementById("vaultModalBody");
const modalConfirm = document.getElementById("vaultModalConfirm");

const preview = document.getElementById("vaultPreview");
const previewContent = document.getElementById("previewContent");


let vaults = JSON.parse(localStorage.getItem("mediaVaults")) || {
Default:{ folders:{}, files:[] }
};


/* =====================================================
   SAVE
===================================================== */

function saveVaults(){
localStorage.setItem("mediaVaults",JSON.stringify(vaults));
}


/* =====================================================
   MODAL SYSTEM
===================================================== */

function openModal(title,html,onConfirm){

modalTitle.innerText = title;
modalBody.innerHTML = html;

modalConfirm.onclick=()=>{
onConfirm();
closeModal();
};

modal.classList.add("show");

}

function closeModal(){
modal.classList.remove("show");
}

document.getElementById("vaultModalClose").onclick=closeModal;
document.getElementById("vaultModalCancel").onclick=closeModal;


/* =====================================================
   PREVIEW SYSTEM
===================================================== */

function openPreview(file){

let html="";

if(file.type==="image"){
html=`<img src="${file.url}" style="width:100%">`;
}

else if(file.type==="video"){
html=`<video src="${file.url}" controls style="width:100%"></video>`;
}

else if(file.type==="note"){
html=`<div class="vault-note-preview">${file.content}</div>`;
}

previewContent.innerHTML = html;
preview.classList.add("show");

}

document.getElementById("closePreview").onclick=()=>{
preview.classList.remove("show");
};


/* =====================================================
   SIDEBAR
===================================================== */

document.getElementById("toggleVaultSidebar").onclick=()=>{
sidebar.classList.toggle("open");
overlay.classList.toggle("show");
};

overlay.onclick=()=>{
sidebar.classList.remove("open");
overlay.classList.remove("show");
};


/* =====================================================
   LOCATION
===================================================== */

function getCurrentLocation(){

const vault = vaults[activeVault];

if(currentFolder){
return vault.folders[currentFolder].files;
}

return vault.files;

}


/* =====================================================
   VAULT LIST
===================================================== */

function renderVaults(){

vaultList.innerHTML="";

Object.keys(vaults).forEach(v=>{

const li=document.createElement("li");

li.className = v===activeVault ? "active":"";

li.innerHTML=`<i class="fas fa-folder"></i> ${v}`;

li.onclick=()=>{

activeVault=v;
currentFolder=null;

renderVaults();
renderItems();

sidebar.classList.remove("open");
overlay.classList.remove("show");

};

vaultList.appendChild(li);

});

}


/* =====================================================
   CREATE VAULT
===================================================== */

document.getElementById("createVaultBtn").onclick=()=>{

openModal(

"Create Vault",

`<input id="vaultNameInput" placeholder="Vault name">`,

()=>{

const name=document.getElementById("vaultNameInput").value;

if(!name) return;

if(!vaults[name]){

vaults[name]={folders:{},files:[]};

saveVaults();
renderVaults();

}

}

);

};


/* =====================================================
   CREATE FOLDER
===================================================== */

document.getElementById("createFolderBtn").onclick=()=>{

openModal(

"Create Folder",

`<input id="folderNameInput" placeholder="Folder name">`,

()=>{

const name=document.getElementById("folderNameInput").value;

const vault=vaults[activeVault];

if(!vault.folders[name]){

vault.folders[name]={files:[]};

saveVaults();
renderItems();

}

}

);

};


/* =====================================================
   CREATE NOTE
===================================================== */

document.getElementById("newNoteBtn").onclick=()=>{

openModal(

"New Note",

`<textarea id="noteContentInput" rows="6"></textarea>`,

()=>{

const text=document.getElementById("noteContentInput").value;

getCurrentLocation().push({
type:"note",
content:text,
date:Date.now()
});

saveVaults();
renderItems();

}

);

};


/* =====================================================
   FILE UPLOAD
===================================================== */

document.getElementById("uploadBtn").onclick=()=>{
uploadInput.click();
};

uploadInput.onchange=e=>{
handleFiles([...e.target.files]);
};


/* =====================================================
   DRAG DROP
===================================================== */

dropZone.ondragover=e=>{
e.preventDefault();
dropZone.classList.add("dragging");
};

dropZone.ondragleave=()=>{
dropZone.classList.remove("dragging");
};

dropZone.ondrop=e=>{
e.preventDefault();
dropZone.classList.remove("dragging");

handleFiles([...e.dataTransfer.files]);

};


/* =====================================================
   HANDLE FILES
===================================================== */

function handleFiles(files){

files.forEach(file=>{

let type="file";

if(file.type.startsWith("image")) type="image";
else if(file.type.startsWith("video")) type="video";

getCurrentLocation().push({
type,
name:file.name,
url:URL.createObjectURL(file),
date:Date.now()
});

});

saveVaults();
renderItems();

}


/* =====================================================
   FILE ICON
===================================================== */

function getFileIcon(name){

if(!name) return "fa-file";

const ext=name.split(".").pop().toLowerCase();

if(ext==="pdf") return "fa-file-pdf";
if(ext==="doc"||ext==="docx") return "fa-file-word";
if(ext==="xls"||ext==="xlsx") return "fa-file-excel";
if(ext==="zip") return "fa-file-zipper";

return "fa-file";

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.oninput=()=>renderItems();


/* =====================================================
   RENDER ITEMS
===================================================== */

function renderItems(){

const vault=vaults[activeVault];
const search=searchInput.value.toLowerCase();

vaultItems.innerHTML="";
folderPath.innerText=currentFolder ? " / "+currentFolder:"";


/* STATS */

statsBox.innerHTML=`
<div class="card stat">Files: ${vault.files.length}</div>
<div class="card stat">Folders: ${Object.keys(vault.folders).length}</div>
`;


/* FOLDERS */

if(!currentFolder){

Object.keys(vault.folders).forEach(folder=>{

const card=document.createElement("div");

card.className="card vault-item";

card.innerHTML=`
<i class="fas fa-folder"></i>
<p>${folder}</p>
`;

card.onclick=()=>{
currentFolder=folder;
renderItems();
};

vaultItems.appendChild(card);

});

}


/* FILES */

const files=getCurrentLocation();

files.filter(file=>{
const name=(file.name||file.content||"").toLowerCase();
return name.includes(search);
})
.forEach((file,index)=>{

const card=document.createElement("div");

card.className="card vault-item";

let content="";

if(file.type==="image"){
content=`<img src="${file.url}" class="vault-thumb">`;
}

else if(file.type==="video"){
content=`<video src="${file.url}" class="vault-thumb"></video>`;
}

else if(file.type==="note"){
content=`<div class="vault-note">${file.content}</div>`;
}

else{
content=`<i class="fas ${getFileIcon(file.name)}"></i>`;
}

card.innerHTML=`

${content}

<p>${file.name || "Note"}</p>

<div class="vault-tools">

<button class="icon-btn rename">
<i class="fas fa-pen"></i>
</button>

<button class="icon-btn delete">
<i class="fas fa-trash"></i>
</button>

</div>

`;

card.onclick=()=>openPreview(file);

card.querySelector(".delete").onclick=(e)=>{
e.stopPropagation();
deleteItem(index);
};

card.querySelector(".rename").onclick=(e)=>{

e.stopPropagation();

openModal(

"Rename",

`<input id="renameInput" value="${file.name || ""}">`,

()=>{

file.name=document.getElementById("renameInput").value;

saveVaults();
renderItems();

}

);

};

vaultItems.appendChild(card);

});

}


/* =====================================================
   DELETE
===================================================== */

function deleteItem(index){

const items=getCurrentLocation();

items.splice(index,1);

saveVaults();
renderItems();

}


/* =====================================================
   ROOT NAVIGATION
===================================================== */

document.getElementById("vaultRoot").onclick=()=>{

currentFolder=null;
renderItems();

};


/* =====================================================
   INIT
===================================================== */

renderVaults();
renderItems();

}

