Loviz.Views.CarroInfo = Backbone.View.extend({
  template: swig.compile($("#informacion_de_carro_template").html()),

  initialize: function () {
    this.$el = $('#carro_info');
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var modelo = this.model.toJSON()
    if (modelo.total) {
      modelo.total = modelo.total.toFixed(2);
      modelo.subtotal = modelo.subtotal.toFixed(2);  
    };    
    var html = this.template(modelo);
    this.$el.html(html);
    if (modelo.lineas===0) {
      this.$el.hide();
    };
  },
});