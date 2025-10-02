import TemaToggle from "../../components/TemaToggle"
import { ThemeToggle } from "../../components/ThemeToggle"
import TemplatePointers from "./components/TemplatePointers"
import imgCenepredMapa from '../../assets/img/cenepred/cenepred-mapa.png'
import imgIntro from '../../assets/img/cenepred/intro.png'

function LandingIntro(){

    return(
        <div className="min-h-full hero rounded-r-xl bg-base-200/50">
            <div className="py-12 hero-content">
              <div className="max-w-md">

                {/* <ThemeToggle /> */}
                <TemaToggle />
                <h1 className='text-3xl font-bold text-center '>
                  <img src={imgCenepredMapa} className="inline-block w-12 mr-2 mask mask-circle" alt="dashwind-logo" />PLATAFORMA DIFAT
                </h1>
                <div className="mt-12 text-center"><img src={imgIntro} alt="Dashwind Admin Template" className="inline-block w-48"></img></div>
                
                {/* Importing pointers component */}
                <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro