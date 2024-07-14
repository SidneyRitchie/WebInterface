const getChartData = async (mode, time) => {
  time = new Date(time);
  let day = time.getDate();
  let month = ("0" + (time.getMonth() + 1)).slice(-2);
  let year = time.getFullYear();
  let json = [];

  try {
    const response = await fetch(`data/json/${year}-${month}-${day}.json`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    json = await response.json();
  } catch (error) {
    console.error(error.message);
  }

  let labels = [];
  let datasets = [];

  for (let index = 0; index < json.length; index++) {
    const element = json[index];
    labels.push(element.time);

    for (let index = 0; index < element.length; index++) {
      const entry = element[index];
      const key = Object.key(entry);

      if (key != "time" && !datasets.includes(key)) {
        datasets.push({ label: key });
      }
    }
  }

  console.log(datasets);

  return {
    labels: labels,
    datasets: [
      {
        label: "Temp",
        data: [1, 2, 3, 4, 5, 6],
        borderColor: "#ff0000",
        backgroundColor: "#ff0000",
      },
      {
        label: "Hum",
        data: [7, 8, 9, 10, 11, 12],
        borderColor: "#ff9900",
        backgroundColor: "#ff9900",
      },
    ],
  };
};

const renderChart = async (ctx, data) => {
  const labels = ["Heute", "morgen", "übermorgen"];

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };

  new Chart(ctx, config);
};
