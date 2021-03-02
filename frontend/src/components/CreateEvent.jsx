
import React, { useState } from 'react'
import eventsActions from './../redux/actions/eventsActions';
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import Compressor from "compressorjs";

const CreateEvent = (props) => {

    const [file, setFile] = useState();
    const [pathImage, setPathImage] = useState("/assets/upload.png");
    const errorAlert = (type, title, text) => {
        Swal.fire({
          icon: type,
          title: title,
          text: text,
          confirmButtonText: "Ok",
        });
      };

    const [newEvent, setNewEvent] = useState({})

    const captureNewEvent = e => {
        const field = e.target.name
        const value = e.target.value
        setNewEvent({
            ...newEvent,
            [field]: value
        })
    }

    const enviarEvento = (e) => {
        e.preventDefault();
        if(newEvent.length === undefined && file === undefined){
          errorAlert("error","All fields are required" )
          return false
        }
        if(!newEvent.description || !newEvent.date || !newEvent.title){
          errorAlert("error","All fields are required" )
          return false
        }

        props.newEvent(newEvent, file);

     }

     const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
    
          if (file.type.includes("image")) {
            //SE COMPRIME LA FOTO DE UNA PETICIÓN PARA QUE NO SEA MUY GRANDE
            const compressedFile = new Compressor(file, {
              quality: 0.5,
              success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = function load() {
                  setPathImage(reader.result);
                };
              },
            });
            setFile(compressedFile);
          } else {
            errorAlert("error", "Something went wrong");
          }
        } else {
          errorAlert("error", "Petition must have a picture");
        }
      };



    return (
        <div>
            <h1>Crear Evento</h1>
            <input type="text" name="title" onChange={captureNewEvent} placeholder="Titulo del evento"/>
            <input type="date" name="date" onChange={captureNewEvent}  placeholder="Fecha del evento"/>
            <input type="text" name="description" onChange={captureNewEvent}  placeholder="Descripción"/>
            <label htmlFor="inputUpload">
                <img style={{margin:"0"}} className="img-fluid profile-pic-profile-submit" src={pathImage} alt="petition-pic" />
            </label>    
            <input id="inputUpload" name="picture" type="file" onChange={onFileChange} />
            <span onChange={captureNewEvent}>
                <select name="category" id="categoria">
                <option value="Comida">Comida</option>
                <option value="Cantante">Cantante</option>
                <option value="Comedia">Comedia</option>
                <option value="Bebida">Bebida</option>
            </select>
            </span>
            
            <button onClick={enviarEvento}>Enviar</button>
        </div>
    )
}

const mapDispatchToProps = {
    newEvent: eventsActions.newEvent
}


export default connect(null, mapDispatchToProps)(CreateEvent)