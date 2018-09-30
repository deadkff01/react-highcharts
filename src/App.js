import React, { Component } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import axios from 'axios'
import { INITIAL_STATE, DATA_BASE } from './consts' // variaveis globais

class App extends Component {
  constructor(props) {
    super(props)
    // state responsável por amazenar a lógica do chart
    this.state = INITIAL_STATE
    // variavel global responsavel por armazernar as series
    this.series = INITIAL_STATE.series
  }
  // carregando os dados
  async componentDidMount() {
    try {
      // get para receber os dados
      const response = await axios.get(DATA_BASE)
      const { data } = response
      const { start_date, end_date } = data
      const { title, description } = data.metrics.revenue_by_medium
      const list = data.metrics.revenue_by_medium.data
      const xAxis = { categories: [] }
      // aqui é feito um simples foreach para pegar os dados do json
      list.series.forEach(s => {
        xAxis.categories.push(this.formatDataBr(s.name))
        this.pushSeries('affiliates', s.data['affiliates'])
        this.pushSeries('email', s.data['email'])
        this.pushSeries('organic', s.data['organic'])
        this.pushSeries('other', s.data['other'])
        this.pushSeries('paid search', s.data['paid search'])
        this.pushSeries('referral', s.data['referral'])
        this.pushSeries('retargeting', s.data['retargeting'])
        this.pushSeries('social', s.data['social'])
        this.pushSeries('social paid', s.data['social paid'])
      })
      // lógica de constução do title #faltou especificação sobre margens e tamanho das fontes no teste
      // aqui tbm são setados os valores no state que posteriormente são usados no chart
      this.setState({
        title: {
          ...this.state.title,
          text: `<span style="display: inline-block; height: 18px; text-transform: uppercase;">
                  <b>${title}</b>
                 </span>
                 <span style="font-size: 11px; color: #E7E7E7">
                 ${this.formatDataBr(start_date)} - ${this.formatDataBr(end_date)}
                 </span>`},
        subtitle: { ...this.state.subtitle, text: description },
        xAxis: xAxis,
        series: this.series
      })
    } catch (error) {
      throw error
    }
  }
  // função para adicionar as series
  pushSeries(name, data) {
    this.series.find(n => n.name === name).data.push(this.formatNumber(data))
  }
  // função responsável por converter o numero para float
  formatNumber(number) {
    return parseFloat(number.replace(',', '.'))
  }
  // função responsável por converter a data para o formato usado no Brasil
  formatDataBr(data) {
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }
  // aqui é setado o component do chart passando o HighCharts e o state como props
  render() {
    return (
      <div className="App">
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state}
        />
      </div>
    )
  }
}

export default App
