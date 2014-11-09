Loviz.Views.Formu_envio = Backbone.View.extend({
  template: swig.compile($("#informacion_de_carro_template").html()),
  events:{
    'change #departamento_envio':'seleccionar_provincia',
    'change #provincia_envio':'seleccionar_distrito',
    'change #distrito_envio':'seleccionar_calle',

  },
  initialize: function () {
    this.$el = $('#formu_envio');
    this.buscar_region();
    this.listenTo(window.models.carro, "change", this.mostrarse, this);
  },

  render: function () {
    var html = this.template(album);
    this.$el.html(html);
    this.mostrarse();
  },
  buscar_region:function () {
    var self = this;
    $.get('http://lovizdc.herokuapp.com/api/ubigeo/').done(function (data) {
      $.each(data,function(i,item){
        self.$("#departamento_envio").append("<option value='"+item.id+"'>"+item.name+"</option>")
      })
    })
  },
  seleccionar_provincia:function () {
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
    var region = this.$('#provincia_envio').val()
    var self = this;
    $.get('http://lovizdc.herokuapp.com/api/ubigeo/?region='+region).done(function (data) {
      $("#distrito_envio").append("<option>Por favor seleccione</option>")
      $.each(data,function(i,item){
        self.$("#distrito_envio").append("<option value='"+item.id+"'>"+item.name+"</option>");
      });
    })
  },
  seleccionar_calle:function () {
    this.$('#calle_envio').fadeIn('slow');
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