const campoRequerido = (valor) => {
    if (valor.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  };
   
  const validarURL = (valor) => {
    // validar URL con una expresión regular
    // eslint-disable-line
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/; // eslint-disable-line
    if (valor.trim().length !== "" && patron.test(valor)) {
      return true;
    } else {
      return false;
    }
  };
  
  const validarEmail = (valor) => {
    // eslint-disable-line
    let patron = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line
    if (valor.trim().length !== "" && patron.test(valor)) {
      return true;
    } else {
      return false;
    }
  };
   
  export {
    campoRequerido,
    validarURL,
    validarEmail,
  };
  