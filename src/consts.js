export const DATA_BASE = 'http://localhost:3030/getData'

export const INITIAL_STATE = {
    chart: {
        type: 'spline'
    },
    title: {
        text: '',
        align: 'left',
        useHTML: true,
    },
    subtitle: {
        text: '',
        align: 'left',
        useHTML: true,
        style: {
            fontWeight: 'bold',
            fontSize: '8.9px',
            color: '#BBBBBB'
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top'
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            },
        }
    },
    yAxis: {
        title: {
            text: null
        },
    },
    xAxis: {
        categories: [],
        labels: {
            // o this.value por padrão vem com o valor 0 antes de ser setado
            // fiz essa validação para efetuar o split apenas quando o valor for a string da data
            formatter: function () {
                if (typeof this.value === 'string')
                    return this.value.split('/')[0]
            }
        }
    },
    tooltip: {
        // formatação do tooltip
        formatter: function () {
            const { x, y } = this
            return `${this.series.name}<br>${x} <b>${y.toLocaleString('pt-BR')}</b>`
        }
    },
    // faltou especificacao no teste sobre as cores de cada serie
    series: [{
        name: 'affiliates',
        data: [],
        color: '#00CBFF'
    },
    {
        name: 'email',
        data: [],
        color: '#00CBFF'
    },
    {
        name: 'organic',
        data: [],
        color: '#1D6FCA'
    },
    {
        name: 'other',
        data: [],
        color: '#6638A2'
    },
    {
        name: 'paid search',
        data: [],
        color: '#FF0087'
    },
    {
        name: 'referral',
        data: [],
        color: '#FF0087'
    },
    {
        name: 'retargeting',
        data: [],
        color: '#FFCB64'
    },
    {
        name: 'social',
        data: [],
        color: '#FF5100'
    },
    {
        name: 'social paid',
        data: [],
        color: '#FF5100'
    }]
}
