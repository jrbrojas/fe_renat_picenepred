import React, { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { Link } from "react-router-dom";
import LandingIntro from './LandingIntro';
import imgMindefLogo from '../../assets/img/cenepred/mindef.png'
import imgCenepredLogo from '../../assets/img/cenepred/cenepred.png'
import imgCenepredLogo2 from '../../assets/img/cenepred/CENEPREDLogo.png'
import imagen1 from '../../assets/img/cenepred/cenepred-mapa.png';

const user_email = import.meta.env.VITE_USER_EMAIL
    ? import.meta.env.VITE_USER_EMAIL
    : 'VITE_USER_EMAIL not found!';
const user_password = import.meta.env.VITE_USER_PASSWORD
    ? import.meta.env.VITE_USER_PASSWORD
    : 'VITE_USER_PASSWORD not found!';

export default function LoginUser() {
  //const emailRef = createRef();
  //const passwordRef = createRef();
  const emailRef = user_email;
  const passwordRef = user_password;
  const { setUser, setToken } = useStateContext();
  const { message, setMessage } = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      //email: emailRef.current.value,
      //password: passwordRef.current.value,
      email: emailRef,
      password: passwordRef,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="flex items-center min-h-screen bg-login-fondo bg-base-200" >  
        <img src={imgMindefLogo} alt="Your Logo" 
        className="absolute z-10 object-cover h-10 top-10 left-10 w-30" />
        <img src={imgCenepredLogo} alt="Your Logo" 
        className="absolute z-10 object-cover h-12 top-10 right-10 w-30 drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]" />
 
      <div className="w-full max-w-5xl mx-auto shadow-xl card">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-base-100/50 rounded-xl">
          {/* <div className="">
            <img src="/assets/img/cenepred/mindef.png" alt="" />
          </div> */}
          {/* <div class="bg-[url('/img/hero-pattern.svg')]">
            <img src="/assets/img/cenepred/mindef.png" alt="" />
          </div>           */}
    
          <div className="px-10 py-24">
            {/* <h1 className='mb-2 text-2xl font-semibold text-center'>Acceso</h1> */}
            <div className="flex items-center justify-center px-4 py-2">
              <img src={imgCenepredLogo2} alt="Your Logo" className="object-cover auto drop-shadow-[0_5px_5px_rgba(255,255,255,0.9)]" />
            </div>
            <form onSubmit={onSubmit} className="card-body">
              <div className="mb-4">
                {message && (
                  <div>
                    <p>{message}</p>
                  </div>
                )}

                {/* <div className="mb-4">
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Correo electrónico</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="Correo electrónico"
                      className="w-full input input-bordered"
                      required
                      name=""
                      id="correo_id"
                    />
                  </div>
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Contraseña</span>
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="Contraseña"
                      className="w-full input input-bordered"
                      required
                      name=""
                      id="contrasena_id"
                    />
                  </div>
                </div> */}

              </div>

              {/* <div className='text-right text-primary'><Link to="/forgot-password"><span className="inline-block text-sm transition duration-200 hover:text-primary hover:underline hover:cursor-pointer">¿Has olvidado tu contraseña?</span></Link>
              </div> */}

              <div className="mt-6 form-control">
                {/* <button className="btn btn-outline ">Ingresar</button> */}
                {/* <button className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-cenepred-300 text-cenepred-200 hover:text-white border-cenepred-300 hover:border-transparent">
                  Ingresar
                </button>*/}
                {/* <button className="px-4 py-2 font-semibold text-black bg-gray-400 border rounded hover:bg-cenepred-300 hover:text-white border-cenepred-300 hover:border-gray-400">
                  ACCEDER
                </button> */}
                <button className="px-4 py-2 font-semibold text-white border border-gray-400 rounded hover:bg-gray-400 hover:text-black bg-cenepred-300 hover:border-cenepred-300">
                  ACCEDER
                </button>
              </div>
               <div>
          <img src={imagen1} alt="DIFAT" className="object-cover auto drop-shadow-[0_5px_5px_rgba(255,255,255,0.9)]" />

               </div>

              {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button> */}

              {/* <div className='mt-4 text-center'>¿Aún no tienes una cuenta? <Link to="/register"><span className="inline-block transition duration-200 hover:text-primary hover:underline hover:cursor-pointer">Registrate</span></Link></div> */}

            </form>
          </div>
          <div className=''>
            <LandingIntro />
          </div>
        </div>

      </div>
    </div>
  );
}
