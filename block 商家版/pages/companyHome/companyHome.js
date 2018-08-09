var utils = require('../..//utils/util.js')
const app = getApp()
Page({
  data: {
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    var id=options.id
    this.setData({
        id:id
    })
    var data={
      id:id
    }
    utils.sendRrquest('getcompanyinfo', 1, data)
    .then((res)=>{
      var data=res.data.data
      this.setData({
        company_shortname: data.company_shortname,
        corporation: data.corporation,
        environment: data.environment,
        financ: data.financ,
        found_at: data.found_at,
        logo: data.logo,
        off_network: data.off_network,
        reg_capital: data.reg_capital,
        synopsis: data.synopsis,
        team: data.team,
        trade: data.trade,
      })
    })
  },

})