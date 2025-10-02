import React, { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../components/ThemeToggle.jsx";

export default function LoginUser() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const { message, setMessage } = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
    // <div className="min-h-screen hero bg-base-200" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
    // <div className="min-h-screen hero bg-base-200" style={{backgroundImage: 'url(/assets/img/cenepred/cenepred.jpg)'}}> 
    <div className="min-h-screen hero bg-base-200"> 
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left"> <ThemeToggle />
          <h1 className="text-5xl font-bold">RENAT </h1>
          <p className="py-6">
            Registro Nacional de Asistencia Técnica. <br/> La asistencia técnica es un procedimiento metodológico, sistemático y continuo, orientado a obtener un resultado objetivo y medible. Se constituye como un recurso complementario a los cursos de formación especializada. Las asistencias técnicas se desarrollan en el marco de la gestión prospectiva y correctiva del riesgo de desastres, asi como en los procesos de estimación, prevención, reducción y reconstrucción.
          </p>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form onSubmit={onSubmit} className="card-body">
            <h1>Inicie sesión en su cuenta</h1>
            {message && (
              <div>
                <p>{message}</p>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Correo electrónico"
                className="input input-bordered"
                required
                name=""
                id="correo_id"
              />
            </div>

            <div className="form-control">             
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Contraseña"
                className="input input-bordered"
                required
                name=""
                id="contrasena_id"                
              />              
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                ¿Has olvidado tu contraseña?
                </a>
              </label>
            </div>

            <div className="mt-6 form-control">
              <button className="btn btn-outline">Ingresar</button>
            </div>
            <p>
            ¿No registrado?  <Link to="/signup">Crea una cuenta</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
