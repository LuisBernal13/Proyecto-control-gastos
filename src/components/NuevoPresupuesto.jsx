import {useState} from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if(!presupuesto || presupuesto < 0){
      //genera el mensaje de alerta usando los otros componentes de mensaje
      setMensaje('NO ES UN PRESUPUESTO VÁLIDO')
      return//si se cumple la función detiene las siguientes líneas de código
    } 

    setMensaje('')
    setIsValidPresupuesto(true)
      
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo' >  
         <label>Definir Presupuesto</label>
           <input 
           className='nuevo-presupuesto' 
           type="number" 
           placeholder='Añade tu presupuesto' 
           value={presupuesto} 
           onChange = {e => setPresupuesto(Number(e.target.value))} />     
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} 
      </form>
    </div>
  )
}

export default NuevoPresupuesto