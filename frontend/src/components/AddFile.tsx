import { Button } from "./ui/button";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { Progress } from "@material-tailwind/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./dialog"

  
export default function AddFile() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [selected, setSelected]=useState<boolean>(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
        setSelected(true)
    }
  
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!file) {
            console.error("No file selected");
            return;
        }
        
        const url = 'http://localhost:3000/api/files';
        const formData = new FormData();
        formData.append('sendfile', file);
  
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: ProgressEvent) => {
                const { loaded, total } = progressEvent;
                const percent = Math.floor((loaded * 100) / total);
                setUploadProgress(percent);
            },
        };
  
        axios.post(url, formData, config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
            });
    }
  console.log(uploadProgress)
    return (
        <div className="pt-12 text-slate-950 dark:text-slate-50">
                <Dialog>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} className="p-4"/>
                <DialogTrigger>

                <Button type="submit" className="dark:bg-slate-50 dark:text-black bg-black p-2">Upload</Button>
                </DialogTrigger>
              
           

  <DialogContent>
    <DialogHeader>
        {
            selected ?  <DialogTitle>uploading file ..</DialogTitle> :  <h2>Select a file to share</h2>
        }
      
      <DialogDescription className="p-4">
{
    selected ?  <Progress 
    value={uploadProgress} 
    size="md" 
    label={` `}
/>   :  'please selact a file to upload and share'
}
      


      </DialogDescription>

      {
        selected ?  <Button>copy link</Button>  :''
      }
      
      
    </DialogHeader>
  </DialogContent>
</form>
</Dialog>
        </div>
    );
}
