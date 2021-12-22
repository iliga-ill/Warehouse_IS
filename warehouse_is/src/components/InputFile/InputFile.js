import React from "react";
import './InputFile.css';

export default function InputFile(props){

    // function handleCapture ({ target }) {
    //     const fileReader = new FileReader();
    //     //fileReader.

    //     target.files.map(item=>{
    //         fileReader.readAsDataURL(target.files[0]);
    //         fileReader.onload = (e) => {
    //             props.func(e.target.result)
    //         };
    //     })
    // };

    
    

    //input.style.opacity = 0;

    function updateImageDisplay() {
        var input = document.getElementById("file_input_" + props.Id);
        var preview = document.querySelector(".file_preview_" + props.Id);
        while(preview.firstChild) {
          preview.removeChild(preview.firstChild);
        }
      
        var curFiles = input.files;
        if(curFiles.length === 0) {
          var para = document.createElement('p');
          para.textContent = 'Не были выбраны файлы для загрузки';
          para.preview.appendChild(para);
        } else {
          var list = document.createElement('ol');
          preview.appendChild(list);
          var docs = []
          for(var i = 0; i < curFiles.length; i++) {
            var listItem = document.createElement('li');
            var para = document.createElement('p');
            docs[i] = curFiles[i]
            if(validFileType(curFiles[i])) {
              //para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
              para.textContent = curFiles[i].name;
              listItem.appendChild(para);
            } else {
              para.textContent = curFiles[i].name + 'Неправильный тип файла.';
              listItem.appendChild(para);
            }
      
            list.appendChild(listItem);
          }
          props.func(docs)
        }
      }

      var fileTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/doc',
        'application/docx',
        'text/plain'
      ]
      
      function validFileType(file) {
        for(var i = 0; i < fileTypes.length; i++) {
            console.log("type: " + file.type)
          if(file.type === fileTypes[i]) {
            return true;
          }
        }
      
        return false;
      }

      function returnFileSize(number) {
        if(number < 1024) {
          return number + 'bytes';
        } else if(number > 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + 'KB';
        } else if(number > 1048576) {
          return (number/1048576).toFixed(1) + 'MB';
        }
      }

    return (
        // <input placeholder="Загрузить документы" accept=".pdf, .docx, .doc, .txt" onChange={handleCapture} type="file" multiple="true"/>
        <form method="post" enctype="multipart/form-data">
            <div>
                <label  >Документы&nbsp;</label>
                <input type="file" id={"file_input_" + props.Id} accept=".pdf, .docx, .doc, .txt" onChange={updateImageDisplay} multiple/>
            </div>
            <div class={"file_preview_" + props.Id}>
                <p>Ни одного файла не загружено</p>
            </div>
        </form>
    )
}