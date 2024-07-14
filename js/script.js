const init = async () => {
  const now = new Date();
  const chartMode = "day";

  loadCatMeme();
  loadChart(chartMode, now);
};

const loadCatMeme = async () => {
  const catMeme = await getCatPicture();

  if (catMeme) {
    const element = document.getElementById("cat-meme");
    element.src = catMeme[0].url;
    element.parentElement.parentElement.ariaBusy = "false";
  }
};

const reloadCatMeme = async (e) => {
  const element = e;

  e.ariaBusy = "true";

  const catMeme = await getCatPicture();

  if (catMeme) {
    const element = document.getElementById("cat-meme");
    element.src = catMeme[0].url;
    e.ariaBusy = "false";
  }
};

const loadChart = async (mode, time) => {
  const ctx = document.getElementById("chart");
  const data = await getChartData(mode, time);

  if (data) {
    renderChart(ctx, data);
  }
};
