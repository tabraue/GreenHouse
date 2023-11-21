
$(document).ready(() => {
  /**
   * Variables de scope global
   */
  let windowHeight = 0;
  let num = 0;
  let ranking = [];
  let maxSpeed = [];
  
  /**
   * Función para insertar texto cuando ha detectado el cambio
   */
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
        return `Rosa de Realidad Virtual`;
      case 2:
        return `Orquídea de Óptica Cuántica`;
      case 3:
        return `Tulipán de Transistor`;
      case 4:
        return `Margarita Móvil`;
      case 5:
        return `Lirio Láser`;
      case 6:
        return `Girasol de Gigabytes`;
      default:
        return `Flor`;
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
                        id="${i}"
                    />
                  </div>`;
      flowers.push(tag);
    }

    $(".flowers-container").html(flowers.join(""));
  };

  /**
   * Función para renderizar el número correcto de macetas 
   * en función de las flores seleccionadas
   */
  const renderPots = (num) => {
    let pots = [];
    for (let i = 1; i <= num; i++) {
      let tag = `<img src="public/img/pot.png" alt="Pot" class="pot"/>`;
      pots.push(tag);
    }
    $(".pots-container").html(pots.join(""));
  };

  /**
   * Función para gestionar la animación de las flores
   * e inserción de los datos necesarios para rellenar la tabla
   */
  const animateImage = (element, speed, callback) => {
    let num = parseInt(element.children[0].id);

    ranking.push({
      velocidad: speed,
      nombre: altName(num),
      imagen: `<img src="public/img/f${num}.png" 
              alt=${altName(num)} id="${num}"/>`,
    });
    
    const duration = speed * 1000;

    windowHeight = $(window).innerHeight() - 100;

    $(element).animate(
      { height: `${windowHeight}px` },
      {
        duration,
        complete: callback,
      }
    );
  };

  /**
   * Función que renderiza la tabla del ranking con la info correspondiente a cada "replantar"
   */
  const renderRanking = (rank) => {
    $(".ranking").show();
    $("tbody").empty();
    rank.map((el, idx) => {
      $("tbody").append(`<tr class="${idx === 0 ? `first` : ``}">
                            <td class="table-icon">${
                              idx + 1
                            } - ${`<img src="public/img/heart.png"/>`}</td>
                            <td class="table-name">${el.nombre}</td>
                            <td class="table-image">${el.imagen}</td>
                            <td class="table-speed">${el.velocidad}</td>
                          </tr>`);
    });
  };

  /**
   * Función para generar el movimiento random
   * Animar el movimiento de las flores mediante ANIMATEIMAGE
   * Y al llegar al final del movimiento, renderizar el ranking RENDERRANKING
   */
  const moveImages = () => {
    maxSpeed = [];
    ranking = [];

    const totalFlowers = $(".each-flower").length;
    let flowerAnimations = 0;

    const checkEnd = () => {
      flowerAnimations++;
      if (flowerAnimations === totalFlowers) {
        ranking = ranking.sort((a, b) => a.velocidad - b.velocidad);
        renderRanking(ranking);
      }
    };

    $(".each-flower").each((index, element) => {
      let speed = Math.floor(Math.random() * 10) + 1;
      maxSpeed.push(speed);
      animateImage(element, speed, checkEnd);
    });
  };

  /**
   * Función que reinicia el crecimiento
   * "baja" las flores y se reinicia el juego
   */  
  const replantImages = () => {
    $(".each-flower").each((index, element) => {
      $(element).animate({ height: "100px" }, 500);
    });
    moveImages();
  };

  /**
   * Estado inicial de los elementos: HIDDEN
   * excepto .main-menu
   */
  $(".ranking, .game, .board").hide();

  /**
   * Botón del menú principal
   * Oculta el menú y
   * aparece el tablero de selección de flores
   */
  $("#plant-btn").click(() => {
    $(".main-menu").fadeOut("slow", () => {
      $(".board").fadeIn("slow");
      $("form").fadeIn("fast");
    });
  });

  /**
   * Captura el cambio del SELECT,
   * ejecutando función selección de plantas
   */
  $("#plantsNumber").change(() => {
    plantSelection();
  });

  /**
   * Inicia el juego: ejecuta funciones que
   * renderiza macetas
   * renderiza flores
   * se mueven las imágenes de las flores
   */
  const showGameArea = (num) => {
    $(".game").fadeIn("fast", () => {
      renderPots(num);
      renderFlowers(num);
      moveImages();
    });
  };

  /**
   * Tras seleccionar cantidad de flores
   * ejecuta mostrar área de juego,
   * donde comienza
   */
  $("#grow-btn").click(() => {
    $("#form").fadeOut("slow", () => {
      showGameArea(num);
    });
  });

  /**
   * Si se pulsa el botón salir o volver
   * se resetea todo volviendo al menú principal de bienvenida
   */
  $("#back-btn, #end-btn").click((e) => {
    e.preventDefault();
    maxSpeed = [];
    ranking = [];

    $(".each-flower").stop();
    $(".ranking, .game, .board").hide();
    $(".main-menu").fadeIn("fast");
  });

  /**
   * Botón REPLANTAR ejecuta función replantar imagenes de flores
   */
  $("#replant-btn").click((e) => {
    e.preventDefault();
    $(".ranking").hide();
    replantImages();
  });

  /**
   * Función para gestionar el audio: silenciar y poner sonido
   */
  let audio = $(".audio")[0];
  let muteBtn = $("#mute-btn");

  $("#mute-btn").click(() => {
    if (audio.muted) {
      audio.muted = false;
      muteBtn.text(`🔊`);
    } else {
      audio.muted = true;
      muteBtn.text(`🔇`);
    }
  });
});
