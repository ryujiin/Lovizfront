Loviz.Views.CarroInfo = Backbone.View.extend({
  template: swig.compile($("#informacion_de_carro_template").html()),

  initialize: function () {
    this.$el = $('#carro_info');
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var modelo = this.model.toJSON() 
    var html = this.template(modelo);
    this.$el.html(html);
    if (modelo.lineas===0) {
      this.$el.hide();
    }else{
      this.$el.show();
    }
  },
});