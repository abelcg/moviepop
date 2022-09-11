const campoRequerido = (valor) => {
    if (valor.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  };
   
  const validarURL = (valor) => {
    // validar URL con una expresión regular
  
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (valor.trim().length != "" && patron.test(valor)) {
      return true;
    } else {
      return false;
    }
  };
  
  const validarEmail = (valor) => {
    let patron = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (valor.trim().length != "" && patron.test(valor)) {
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
  