////////////////////  App downloads  /////////////////////////


$(function(){
     $("#chart").dxChart({
            dataSource: uGRaph,
             equalBarWidth:true,
            palette: "soft",
            commonSeriesSettings: {
                argumentField: "state",
                type: "bar"
            },
            series: [
                 { valueField: "male", name: "Male", stack: "male", color:"#3c8dbc"  },
                { valueField: "female", name: "Female", stack: "female",color:"#f83272" },
                { valueField: "tUser", name: "Total User", stack: "Total User", color : "#90A4AE"  }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: 'top'
            },
            valueAxis: {
                title: {
                    text: ""
                },
                position: "left"
            },
            title: "Users",
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    return {
                        text: arg.seriesName + " : " + arg.valueText
                    };
                }
            }
        });
     /////////////////////////////////

      $("#artistchart").dxChart({
            dataSource: sGRaph,
             equalBarWidth:true,
            palette: "soft",
            commonSeriesSettings: {
                argumentField: "state",
                type: "bar"
            },
            series: [
                 { valueField: "Independent", name: "Independent", stack: "Independent", color:"#3c8dbc"  },
                { valueField: "Business", name: "Business", stack: "Business",color:"#f83272" },
                { valueField: "tservice", name: "Total service provider", stack: "Total service provider", color : "#90A4AE"  }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: 'top'
            },
            valueAxis: {
                title: {
                    text: ""
                },
                position: "left"
            },
            title: "Service Provider",
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    return {
                        text: arg.seriesName + " : " + arg.valueText
                    };
                }
            }
        });
$("#booking").dxChart({
            dataSource: bGRaph,
             equalBarWidth:true,
            palette: "soft",
            commonSeriesSettings: {
                argumentField: "state",
                type: "bar"
            },
            series: [
                 { valueField: "Confirm", name: "Confirm Booking", stack: "Confirm Booking", color:"#00a65a"  },
                { valueField: "Complete", name: "Complete Booking", stack: "Complete Booking",color:"#3c8dbc" },
                { valueField: "Total", name: "Total Booking", stack: "Total Booking", color : "#f39c12"  }
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: 'top'
            },
            valueAxis: {
                title: {
                    text: ""
                },
                position: "left"
            },
            title: "Booking",
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    return {
                        text: arg.seriesName + " : " + arg.valueText
                    };
                }
            }
        });

    $("#chartContainer").CanvasJSChart({ 
      title: { 
        text: "Booking Services",
        fontSize: 24
      }, 
      axisY: { 
        title: "Products in %" 
      }, 
      legend :{ 
        verticalAlign: "center", 
        horizontalAlign: "right" 
      }, 
      data: [ 
      { 
        type: "pie", 
        showInLegend: true, 
        toolTipContent: "{label} <br/> {y} %", 
        indexLabel: "{y} %", 
        dataPoints:bchart
      } 
      ] 
    }); 

});   


