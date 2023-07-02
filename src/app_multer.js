import express from 'express'
import multer from 'multer'// se ocupa para cargar archivos al servidor

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
    destination: function(req,file,cd){
        // ubicacion del archivo
        cd(null,'./public/')
    },
    filename: function(res,file,cd){

        cd(null,file.originalname)
    }
})

// MIddleware para la carga de archivos
const uploader = multer({storage})
app.post('/',uploader.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send({status: 'error',error: 'NO FILE'})
    }
    console.log(req.file)
    res.send('File uploaded!')
})

app.listen(8080)