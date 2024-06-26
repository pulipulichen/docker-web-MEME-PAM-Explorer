// Create a scatter plot with Chart.js

function generateColorPalette(numColors) {
    const colors = [];
    const hueStep = 360 / numColors;

    for (let i = 0; i < numColors; i++) {
        const hue = i * hueStep;
        colors.push(`hsl(${hue}, 70%, 50%)`);
    }

    return colors;
}

const colorPalette = generateColorPalette(datasets.length);

datasets = datasets.map((item, i) => {
    item.backgroundColor = colorPalette[i]
    return item
})

const ctx = document.getElementById('scatterChart').getContext('2d');
const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        // datasets: [{
        //     label: 'Scatter Plot',
        //     data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }],
        //     backgroundColor: 'blue', // Point color
        //     pointRadius: 5,           // Point size
        // },
        // {
        //   label: 'Scatter Plot Red',
        //   data: [{ x: 2, y: 4, item_id: 100 }, { x: 2, y: 6 }, { x: 3, y: 1 }],
        //   backgroundColor: 'red', // Point color
        //   pointRadius: 5,           // Point size
        // }]
        datasets
    },
    options: {
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with the mouse wheel
                    },
                    // drag: {
                    //     enabled: true, // Enable panning by dragging
                    // },
                    // dblclick: {
                    //   enabled: false
                    // },
                    // mode: 'xy', // Allow zooming on both X and Y axes
                    // enabled: true,
                    mode: 'xy', // Enable zooming on both axes (x and y)
                    speed: 100
                },
                pan: {
                  enabled: true,
                  mode: 'xy',
                  seepd: 0.5
                },
            },
            colors: {
            //   forceOverride: true
            },
            // colorschemes: {
            //     scheme: 'tableau.Tableau20'
            // },
            // Customize the tooltips
            tooltip: {
              enabled: false,
              position: 'nearest',
              external: externalTooltipHandler
              // callbacks: {
              //     afterLabel: function (context) {
              //       // Create a new img element
              //       const imgElement = document.createElement('img');

              //       // Set the src attribute to the desired image URL
              //       imgElement.src = 'https://www.chartjs.org/docs/latest/favicon.ico';

              //       // Set optional attributes (e.g., alt, width, and height)
              //       imgElement.alt = 'Chart.js Icon';
              //       imgElement.width = 32;
              //       imgElement.height = 32;
              //       return imgElement
              //     },
              //   } 
            }
        },
        scales: {
            x: {
                type: 'linear', // X-axis type
                // position: 'bottom',
            },
            y: {
                type: 'linear', // Y-axis type
            }
        },
        onClick: (e) => {
            // const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

            // // Substitute the appropriate scale IDs
            // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
            // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
            console.log(e)
        }
    }
});