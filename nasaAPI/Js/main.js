// função para tratar os dados da api APOD
function nasaAPI() {
  // declaração de const
  const apiUrl = "https://api.nasa.gov/planetary/apod?api_key=";
  const apiKey = "w8hcyR9r51VipLEJIlO6LTTdSXB5u6HJgQXMCjyg";
  const dateInput = document.querySelector("#datepicker");
  const titulo = document.querySelector("#title");
  const copyright = document.querySelector("#copyright");
  const secaoMidia = document.querySelector("#media-section");
  const informacao = document.querySelector("#description");

  const dataAtual = new Date().toISOString().slice(0, 10);

  const sectionImg = `<a id="hdimg" href="" target="-blank">
    <div class="image-div">
    <img id="image_of_the_day" src="" alt="image-by-nasa">
    </div>
   </a>`;

  const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`;

  // variavel puxar a imagem/gif/video da data referente
  let novaData = "&date=" + dateInput.value + "&";

  // função da data (sincronização da api com o imput date)
  function fetchData() {
    try {
      fetch(apiUrl + apiKey + novaData)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          diplaydata(json);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // mstrar a ata e o titulo com os creditos da imagem da API APOD
  function diplaydata(data) {
    titulo.innerHTML = data.title;

    if (data.hasOwnProperty("copyright")) {
      copyright.innerHTML = data.copyright;
    } else {
      copyright.innerHTML = "";
    }

    // restrição de data
    date.innerHTML = data.date;
    dateInput.max = dataAtual;
    dateInput.min = "1995-06-16";

    // tratamento de video e imagem disponibilizados pela API APOD
    if (data.media_type == "video") {
      secaoMidia.innerHTML = videoSection;
      document.getElementById("videoLink").src = data.url;
    } else {
      secaoMidia.innerHTML = sectionImg;
      document.getElementById("hdimg").href = data.hdurl;
      document.getElementById("image_of_the_day").src = data.url;
    }
    informacao.innerHTML = data.explanation;
  }
  fetchData();
}
const dateInput = document.querySelector("#datepicker");
dateInput.addEventListener("change", (e) => {
  e.preventDefault();
  nasaAPI();
});
nasaAPI().onload;

//botao (tirar ou adicionar descrição da imagem)
function Mudarestado(el) {
  var display = document.getElementById(el).style.display;
  if (display == "none") document.getElementById(el).style.display = "block";
  else document.getElementById(el).style.display = "none";
}
