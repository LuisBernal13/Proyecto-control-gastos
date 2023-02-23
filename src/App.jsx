//Organizarlos conforme se muestran en pantalla 
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
 
  /* se emplea un objeto vacío para tener acceso a los métodos */
  const [gastos, setGastos] = useState(
    localStorage.getItem('presupuesto') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() =>{
          setAnimarModal(true)
      }, 650)
    }
  }, [gastoEditar])

  //Guardar el presupuesto en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  //escuchará por cambios en el arreglo de filtros y así llamar al arreglo de gastos  
  useEffect(() => {
    if(filtro){
      //filtrar gastos por categoría
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  },[])
  
  const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})

      setTimeout(() =>{
          setAnimarModal(true)
      }, 650)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      //actualizar
     const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
     setGastos(gastosActualizados)
     setGastoEditar({})
    } else {

      //nuevo gasto
     gasto.id = generarId();
     gasto.fecha = Date.now();
     setGastos([...gastos, gasto])

    }

     setAnimarModal(false)
     setTimeout(() =>{
        setModal(false)
     }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados)
  }

  return (
      <div className={modal ? 'fijar' : ''}>
        <Header 
          gastos={gastos}
          setGastos={setGastos}
          presupuesto= {presupuesto}
          setPresupuesto= {setPresupuesto}
          isValidPresupuesto = {isValidPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro = {filtro}
            setFiltro = {setFiltro}
            
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
        )}

        {modal && <Modal 
        setModal= {setModal} 
        animarModal= {animarModal} 
        setAnimarModal={setAnimarModal}
        guardarGasto = {guardarGasto}
        gastoEditar = {gastoEditar}
        setGastoEditar = {setGastoEditar}
        />}
      </div>
  )
}

export default App
