import { Button } from "./ui/button";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { Progress } from "@material-tailwind/react";

export default function AddFile() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
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
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <Button type="submit">Upload</Button>
                <Progress 
                    value={uploadProgress} 
                    size="lg" 
                    className="border border-gray-900/10 bg-gray-900/5 p-1" 
                    label={`${uploadProgress}%`}
                />
            </form>
        </div>
    );
}
