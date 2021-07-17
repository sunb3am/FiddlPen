//import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import PasteClient from "pastebin-api";
import axios from 'axios';

function App() {
  const codeMirrorOptions = {
    theme: 'monokai',
    viewportMargin: Infinity,
    lineNumbers: true,
    
//    scrollbarStyle:'simple',
    lineWrapping: true,
  };
  const client = new PasteClient("fiCunTslLXdOkuJwT4B3DgdSrt5fO4IT");
  let url = null;


  const [html,sethtml] = useState('<p> Hello there! </p>');
  const [css,setcss] = useState('p { color: navy };');
  const [js,setjs] = useState('var today = new Date(); var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); document.write(time);');
  const [file,setfile] = useState(1);
  const togglehtml = () => setfile(1);
  const togglecss = () => setfile(2);
  const togglejs = () => setfile(3);
  const htmleditor = <div className = "html-editor">
    <CodeMirror
      className="code-editor"
      value={html}
      
      options={{
        mode: 'htmlmixed',
        ...codeMirrorOptions,
      }}
      onBeforeChange={(editor, data, html) => {
        sethtml( html );
      }}
    />
  </div>;
  const csseditor =  <div className = "css-editor">
    <CodeMirror

      value={css}
      className="code-editor"
      options={{
        mode: 'css',
        ...codeMirrorOptions,
      }}
      onBeforeChange={(editor, data, css) => {
        setcss(css);
      }}
    />
  </div>;
  const jseditor=<div className = "js-editor">
  <CodeMirror
    className="code-editor"
    value={js}
    
    options={{
      mode: 'javascript',
      ...codeMirrorOptions,
    }}
    onBeforeChange={(editor, data, js) => {
      setjs(js);
    }}
  />
  </div>;
  

  const pasteBinproc = async ()=> {
    const paste = {api_dev_key: 'dJzBvFUS7oAOqO1-CCT3vZOqqhX6h1Nt',
             api_option: "paste",        
             api_paste_name: "yourcode.html",
             api_paste_code: 
             `<!DOCTYPE html>
             <html lang="en">
             <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <meta http-equiv="X-UA-Compatible" content="ie=edge">
               <title>Document</title>
               <style>
                 ${css}
               </style>
             </head>
             <body>
               ${html}
       
               <script type="text/javascript">
                 ${js}
               </script>
             </body>
             </html>`,
             api_paste_format: 'html', 
             api_paste_private: 1,         
             api_paste_expire_date: "1D",         
             api_user_key: "",         
             api_folder_key: "",  
            }
    
  }
//     axios.post('https://pastebin.com/api/api_post.php', user, {headers})
//   .then(response => {
//       console.log(response);
//       console.log(response.data);
//   }).catch(error => {
//       console.log("AXIOS ERROR!! " + error);
// });
  
  return (
    
    <div className="wsite">
      <div className = "title">
        FiddlPen
        {/* <div className="pb" onClick = {pasteBinproc}> PasteBin </div> */}
      </div>
      <div className="explorer">
        <header> File Explorer </header> <br />
        <ul>
          <div className="file" onClick = {togglehtml}> <img src = "https://img.icons8.com/ios/500/html-5--v2.png" alt=""></img>       index.html </div> <br />
          <div className="file" onClick  = {togglecss}> <img src = "https://www.pngrepo.com/png/171185/180/css-file.png" alt=""></img> index.css</div> <br />
          <div className="file" onClick = {togglejs}> <img src = "https://pic.onlinewebfonts.com/svg/img_475434.png" alt=""></img>     index.js</div> <br />
        </ul>
      </div>
      <div>
      {file === 1&&htmleditor}
      {file === 2&&csseditor}
      {file === 3&&jseditor}
      </div>
      <div className="result">
        <iframe title="result" srcDoc={
          `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
    
            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>`
        } />
      </div>
    </div>
  );
}

export default App;




