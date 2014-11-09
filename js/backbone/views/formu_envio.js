Loviz.Views.Formu_envio = Backbone.View.extend({
  template: swig.compile($("#informacion_de_carro_template").html()),
  events:{
    'change #departamento_envio':'seleccionar_provincia',
    'change #provincia_envio':'seleccionar_distrito',
    'change #distrito_envio':'enviar_formu',

  },
  initialize: function () {
    this.$el = $('#formu_envio');
    this.buscar_region();
    this.mostrarse();
    this.listenTo(window.models.carro, "change", this.mostrarse, this);
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    this.mostrarse();
  },
  buscar_region:function () {
    $.get('http://lovizdc.herokuapp.com/api/ubigeo/').done(function (data) {
      $.each(data,function(i,item){
        self.$("#departamento_envio").append("<option value='"+item.id+"'>"+item.name+"</option>")
      })
    })
  },
  seleccionar_provincia:function () {
    $('#provincia_envio').empty();
    $('#distrito_envio').empty();

    var region = this.$('#departamento_envio').val()
    var self = this;
    $.get('http://lovizdc.herokuapp.com/api/ubigeo/?region='+region).done(function (data) {
      $("#provincia_envio").append("<option>Por favor seleccione</option>")
      $.each(data,function(i,item){
        self.$("#provincia_envio").append("<option value='"+item.id+"'>"+item.name+"</option>")
      })
    })
  },
  seleccionar_distrito:function () {
    $('#distrito_envio').empty();
    var region = this.$('#provincia_envio').val()
    var self = this;
    $.get('http://lovizdc.herokuapp.com/api/ubigeo/?region='+region).done(function (data) {
      $("#distrito_envio").append("<option>Por favor seleccione</option>")
      $.each(data,function(i,item){
        self.$("#distrito_envio").append("<option value='"+item.id+"'>"+item.name+"</option>");
      });
    })
  },
  enviar_formu:function () {
    var usuario = $.sessionStorage.get('usuario')
    var region = this.$('#departamento_envio').val()
    var total = $.sessionStorage.get('total_carro');
    if (total===null) {
      total = window.models.carro.toJSON().total
      $.sessionStorage.set('total_carro',total);
    };
    total = parseFloat(total);
    var gasto;

    if (usuario===null) {
      if (region==28595) {
        gasto = 3.5;
      }else{
        gasto = 13;
      }
      debugger;
      if (total>60) {
        debugger;
        gasto = 0
        window.models.carro.set('envio_gratis',true);
      };
    }
    total = total + gasto;
    total = parseFloat(total).toFixed(2);
    gasto = parseFloat(gasto).toFixed(2);
    window.models.carro.set({'total':total,'envio':gasto});
  },
  mostrarse:function() {
    var lineas = window.models.carro.toJSON().lineas
    if (lineas===0) {
      this.$el.hide();
    }else{
      this.$el.show()
    }
  }
});