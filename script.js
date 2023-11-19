$(document).ready(() => {
  /**
   * Función que inserta un texto cuando
   * detecta un cambio en #plantsNumber select tag
   * Captura el número de plantas seleccionadas con
   * variable num, necesaria en scope global
   */
  let num = 0;

  const plantSelection = () => {
    let txt = "Has seleccionado hacer crecer ";
    num = parseInt($("#plantsNumber").val());
    $("#plantSelected").text(txt + num + "🌺");
  };

  /**
   *  Función que inserta correctamente el nombre alternativo de las imágenes de flores
   */
  const altName = (num) => {
    switch (num) {
      case 1:
        return "Rosa de Realidad Virtual";
      case 2:
        return "Orquídea de Óptica Cuántica";
      case 3:
        return "Tulipán de Transistor";
      case 4:
        return "Margarita Móvil";
      case 5:
        return "Lirio Láser";
      case 6:
        return "Girasol de Gigabytes";
      default:
        return "Flor";
    }
  };

  /**
   * Función para renderizar el número correcto de flores seleccionadas
   */
  const renderFlowers = (num) => {
    let flowers = [];

    for (let i = 1; i <= num; i++) {
      let tag = `
                  <div class="each-flower">
                    <img
                        src="public/img/f${i}.png"
                        alt=${altName(i)}
                        id="f${i}"
                    />
                  </div>`;
      flowers.push(tag);
    }

    $(".flower").html(flowers.join(""));
  };

  /**
   * Función para renderizar el número correcto de macetas seleccionadas
   */
  const renderPots = (num) => {
    let pots = [];
    for (let i = 1; i <= num; i++) {
      let tag = `<img src="public/img/pot.png" alt="Pot" />`;
      pots.push(tag);
    }
    $(".pot").html(pots.join(""));
  };

  /**
   * Función para gestionar el movimiento de las plantas
   */
  const movePlant = (num) => {
    const position = {
      "margin-bottom": "100%",
      "z-index": -1,
    };

    let speeds = [];
    for (let i = 0; i < num; i++) {
      speeds.push(Math.floor(Math.random() * 10) + 1);
    }

    $(".flower img").each((idx, el) => {
      let milisec = speeds[idx] * 1000;
      $(el).animate(position, milisec);
    });
  };

  const animateImage = (element, speed) => {
    const position = {
      "height": "500px",
      //"z-index": -1,
    };

    const duration = speed * 1000;

    //.animate( properties [, duration ] [, easing ] [, complete ] )
    $(element).animate( position,
      {
        duration,
          specialEasing: {
            width: "linear",
            height: "easeOutBounce"
          }, 
        
          complete: function() {
            $( this ).after( "<div>Animation complete.</div>" );
          }
      }
    );
  };

/*   const animateImage = (element, speed) => {
    const position = {
      top: "100%",
    };
  
    const duration = speed * 1000;
  
    $(element)
      .animate(
        {
          position
        },
        {
          duration,
          easing: "linear",
        }
      );
  }; */


  const moveImages = () => {
      $(".each-flower img").each((index, element) => {
        console.log(element)
        const speed = Math.floor(Math.random() * 10) + 1; 
        animateImage(element, speed);
    });
  };

  // Llamar a la función para iniciar la animación
  const showGameArea = (num) => {
    $(".game").fadeIn("slow", () => {
      renderPots(num);
      renderFlowers(num);
      moveImages();
      //movePlant(num);
    });
  };

  /**
   * Estado inicial de los elementos: HIDDEN
   * excepto .main-menu
   */
  $(".board").hide();
  $(".game").hide();
  //renderFlowers(0);
  //renderPots(0);

  /**
   * Botón del menú principal
   * Oculta el menú y
   * aparece el tablero de selección de plantas
   */
  $("#plant-btn").click(() => {
    $(".main-menu").fadeOut("slow", () => {
      $(".board").fadeIn("slow");
    });
  });

  $("#plantsNumber").change(() => {
    plantSelection();
  });

  /**
   * Tras seleccionar cantidad de plantas
   * Oculta el área de selección
   * Aparece el juego en sí
   * renderiza macetas
   * renderiza flores
   * hace que las plantas se muevan
   */
  $("#grow-btn").click(() => {
    $("#form").fadeOut("slow", () => {
      showGameArea(num);
    });
  });
});
