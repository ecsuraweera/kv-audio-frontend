import { createClient } from "@supabase/supabase-js";

const anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhamllbW5wd3JieG5kbHlkenlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNjczMDcsImV4cCI6MjA1NTY0MzMwN30.GMIFCit9ieBHVsBxHbWC0adX8_lA2okI4L6Nw6pHN60";

const supabase_url="https://fajiemnpwrbxndlydzyg.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {

        if(file == null){
            reject("No File Selected");
        }

    const timeStamp = new Date().getTime();
    const fileName = timeStamp +file.name;


    supabase.storage.from("Images").upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
    }).then(()=>{
        const publicUrl = supabase.storage.from("Images").getPublicUrl(fileName).data.publicUrl;
        resolve(publicUrl);
        
    }).catch(err => {
        reject("Error uploading file");
    })
        
    })

    

}