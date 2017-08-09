import { Component, Input, OnInit } from '@angular/core';
 
@Component({
    selector: 'app-chart',
    template: `
         <chart [options]="options" (click)="click('OK')" (load)="saveInstance($event.context)"></chart>
         <button (click) = "changeOption()">redraw</button>
    `
})
export class ChartComponent implements OnInit{
    @Input() height: string = null;
    @Input() width: number = null;

    ngOnInit() {
        this.options = {
            chart:{type: 'column', height: this.height, width: this.width},
            title : { text : null},
            xAxis:{labels:{enabled: false},
              minPadding: 0,
              maxPadding: 0
            },
            yAxis:{labels:{enabled: false},
                    gridLineColor: 'transparent',
            gridLineWidth: 0,
            lineColor: 'transparent',
            lineWidth: 0,
                    title:{text: null}},
            plotOptions:{
              column:{dataLabels:{enabled: true}},
              series:{groupPadding: 0}
            },
            series: [{
        color: '#90ed7d',
        showInLegend: false,
        name: '.. 4+',
        data: [49.9]

    }, {
        color: '#7cb5ec',
        showInLegend: false,
        name: '5 ..',
        data: [83.6]

    }, {
        color: '#e4d354',
        showInLegend: false,
        name: '6a ..',
        data: [48.9]

    }, {
        color: '#f7a35c',
        showInLegend: false,
        name: '7a ..',
        data: [52.4]

    }, {
        color: '#f15c80',
        showInLegend: false,
        name: '8a ..',
        data: [32.4]

    }, {
        color: '#434348',
        showInLegend: false,
        name: '9a ..',
        data: [12.4]

    }]
        };
    }
    options: Object;
    chart : Object;

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    click(str){
        alert(str);
    }

    changeOption(){
        var data = [[29.9],[83.6],[38.9],[52.4],[32.4],[12.4],[15]];
        data.forEach( (item, index) =>{
            if(this.chart.series[index]){
                this.chart.series[index].setData(item);
            } else{
                this.chart.addSeries({showInLegend: false, data: item});
            }
        });
    }
}