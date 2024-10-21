$(function () {


    // =====================================
    // Profit
    // =====================================
    var chart = {
      series: [
        { name: "Kurang Berat Badan", data: [355, 390, 300, 350] },
        { name: "Normal:", data: [280, 250, 325, 215] },
        { name: "Kelebihan Berat Badan:", data: [180, 160, 150, 140] },
        { name: "Obesitas:", data: [40, 50, 47, 45] },
      ],
  
      chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
  
  
      colors: ["#49beff", "#13deb9", "#ffae1f", "#fa896b"],
  
  
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all'
        },
      },
      markers: { size: 0 },
  
      dataLabels: {
        enabled: false,
      },
  
  
      legend: {
        show: false,
      },
  
  
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
  
      xaxis: {
        type: "category",
        categories: ["7/10", "14/10", "21/10", "28/10"],
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
  
  
      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },
  
  
      tooltip: { theme: "light" },
  
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              }
            },
          }
        }
      ]
  
  
    };
  
    var chart = new ApexCharts(document.querySelector("#weight-chart"), chart);
    chart.render();
  
  
  })