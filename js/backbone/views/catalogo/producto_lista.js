Loviz.Views.ProductoLista = Backbone.View.extend({
    tagName: 'article',
    className: 'producto',
    events: {
        'click':'navegar_producto',
        'click .add-to-cart button':'quicktime_producto',
    },
    template: swig.compile($("#productos_lista_template").html()),
    
    initialize: function () {
        this.quick =false;
        this.listenTo(this.model, "change", this.render, this);
    },
    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
    quicktime_producto:function  () {
        console.log(this.quick + ' abrir quick');
        this.quick=true;
    },
    navegar_producto : function () {
        if (this.quick = false) {
            window.routers.catalogo.navigate('/producto/'+this.model.toJSON().slug, {trigger:true});
        };
        this.quick = false
    },
});