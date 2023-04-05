import { useEffect, useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { getCategory } from "../../Redux/actions";
import NavBar from "../../Components/NavBar/NavBar";
import CardsProducts from "../../Components/CardsProducts/CardsProducts";
import Paginated from "../../Components/Paginated/Paginated";
import Filter from "../../Components/Filter/FilterShoes"
import Footer from"../../Components/Footer/Footer.jsx"

const Shoes=()=>{

  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getCategory("shoes"))
  },[dispatch]);

  const productsCategory= useSelector(state=> state.filterPrice);
  const[pageActual, setPageActual]= useState (1); //numero de pagina donde estoy
  const[productsViews, setProductsViews]= useState (8);
  const lastIndex= pageActual * productsViews; //segundo parametro
  const firstIndex= lastIndex - productsViews; //primer parameto
  const maximumPage= Math.ceil(productsCategory.length/productsViews); //nose si sera par o inpar
  const newStateProducts= productsCategory.slice(firstIndex,lastIndex);
  
  const pagin=(pageNumber)=>{ //rendirizamos
    setPageActual(pageNumber); //pasamos los numero de las paginas para modificar el estado local
  }

  /****************************Modo nocturno y claro */
const [theme, setTheme] = useState("light")

useEffect(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches){
    setTheme('dark');
  }
  else {setTheme('light')
}
},[])

useEffect(() => {
  if (theme === "dark"){
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
},[theme])

const handleTHemeSwitch = () =>{
  setTheme(theme === "dark" ? "light" : "dark")
}
/****************************Modo nocturno y claro */

  return(
    <div className="flex flex-col bg-slate-200 dark:bg-zinc-800">
      <div >
        <div>
          <h1 >No Eliminar</h1>
        </div>

      </div>
        
      <div class="fixed top-0 z-50 w-full">
        <NavBar pagin={pagin} />
        <button className="absolute bottom-[25px] left-[8rem] w-36 ml-4 mb-2" >
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={handleTHemeSwitch}/>
              <svg className="swap-on fill-current w-6 h-6 fill-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-6 h-6 fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          </label>
    
        </button>
      </div>
      <br /><br /><br />

      <div className="flex justify-between text-4xl  h-full w-full  dark:bg-zinc-700 bg-clip-padding dark:bg-clip-padding backdrop-filter dark:backdrop-filter backdrop-blur-lg dark:backdrop-blur-lg bg-opacity-10 dark:bg-opacity-10">
        <div >
          <h1 className="btn  font-normal  text-m  text-sky-400 animate-bounce">SHOES</h1>
        </div>

      </div>

      <Filter pagin={pagin}/>
      <br />
  
      <CardsProducts newStateProducts ={newStateProducts} />
      <br />
      <Paginated maximumPage={maximumPage} pagin={pagin} />
      <br />
      <Footer/>
      {/* <p>Pagina {pageActual}</p> */}
    </div>
  )
}

export default Shoes;