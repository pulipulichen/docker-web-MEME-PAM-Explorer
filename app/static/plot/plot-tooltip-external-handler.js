
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.zIndex = 999;
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    // tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.classList.add('tooltip')

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);

    $(tooltipEl).on('mouseenter', (e) => {
      e.preventDefault();
      e.stopPropagation()

      console.log('ok')
    })

    $(tooltipEl).hover(() => {
      isHoverTooltip = true
      console.log({isHoverTooltip})
    }, () => {
      isHoverTooltip = false

      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        tooltipEl.style.opacity = 0;
      }, 3000)
      console.log({isHoverTooltip})
    })
  }

  return tooltipEl;
};

let hideTimer
let isHoverTooltip = false

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);
  console.log(tooltip.opacity)
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      if (isHoverTooltip === true) {
        return false
      }
      tooltipEl.style.opacity = 0;
    }, 3000)
    
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);
    const items = tooltip.dataPoints.map(({raw}) => raw)
    // console.log(items)
    // console.log(tooltip)

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.color = '#FFF';

      let {image, pattern, item_id} = items[i]
      let info = `<a href="/raw_post/${item_id}" target="raw_post_${item_id}">${item_id} (${pattern})</a>`
      // const text = document.createTextNode(body);

      td.appendChild(span);
      $(td).append(info)
      // td.appendChild(text);


      $(td).append(`<a href="/raw_post/${item_id}" target="raw_post_${item_id}"><img src="/input/${image}" /></a>`)
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
}