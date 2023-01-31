import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Chart from "react-apexcharts";

import Modal from './Modal.js';
import data from './data.js'

const BrushChart = () => {
  const [XAxisAnnotList, setXAxisAnnotList] = React.useState([])
  const [xAxisAnnot, setXAxisAnnot] = React.useState('')
  const [whichXAxisData, setWhichXAxisData] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var series = [{
    data: data.map(v=>Number(v['Revenue'].split('$').join('')))
  }]
  var options = {
    annotations: {
      yaxis: [
        {
          y: 697.84,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396"
            },
            text: "This is a test"
          }
        },
        {
          y: 645.99,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#ffe",
              background: "#00E396"
            },
            text: "This is a test 2"
          }
        },
        {
          y: 607.07,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fgf",
              background: "#00E396"
            },
            text: "This is a test 3"
          }
        }
      ],
      xaxis: XAxisAnnotList.length === 0 ? [] : XAxisAnnotList.map(el=>{
        return {
          x: el.xAxis,
          borderColor: "#00E396",
          label: {
            position: 'bottom',
            borderColor: "#00E396",
            style: {
              color: "#ffe",
              background: "#00E396"
            },
            text: el.text
          }
        }
      })
    },
    chart: {
      events: {
        click: function(event, chartContext, config) {
          setWhichXAxisData(data[config.dataPointIndex]['Date'])
          handleOpen()
        }
      },
      id: 'chart2',
      type: 'line',
      height: 230,
      toolbar: {
        autoSelected: 'pan',
        show: false
      }
    },
    colors: ['#546E7A'],
    stroke: {
      width: 1
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: data.map(v=>v['Date'])
    }
  }

  var seriesLine = [{
    data: data.map(v=>Number(v['Revenue'].split('$').join('')))
  }]
  var optionsLine = {
    chart: {
      id: 'chart1',
      height: 130,
      type: 'area',
      brush:{
        target: 'chart2',
        enabled: true
      },
      selection: {
        enabled: true,
        xaxis: {
          min: '09/02/2022',
          max: '09/20/2022'
        }
      },
    },
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 4
    }
  }

  var modalProps = {
    open, handleClose, whichXAxisData, setXAxisAnnotList
  }
  return (
    <div id="wrapper">
      <div id="chart-line2">
        <Chart options={options} series={series} type="line" height={230} />
      </div>
      <div id="chart-line">
        <Chart options={optionsLine} series={seriesLine} type="area" height={130} />
      </div>
      <Modal {...modalProps}/>
    </div>
)
}

export default function App() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              John Patrick Valera
            </Typography>
            <Button color="inherit" onClick={()=>window.open("https://github.com/withoutwax13/apexcharts-brushchart-jpv", '_blank')}>Repository Link</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <BrushChart/>
    </Box>
  );
}