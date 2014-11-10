Loviz.Views.Catalogo_filtro = Backbone.View.extend({
	el:$('#filtros_productos'),

  	template: swig.compile($("#producto_filtros_template").html()),
    events : {
        'click .filter-field' : 'mostrar_field',
    },

	initialize : function () {
		var self = this;
        this.num=0
    	this.render();

    	window.routers.base.on("route", function(route, params) {
    		if (route==='tiendaCatalogo') {
                self.aparecer();
    		}else{
    			self.$el.hide();
                self.resetearCss(0);
    		};
    	});
	},
	render: function () {
	    var html = this.template();
	    this.$el.html(html);
	},
    aparecer: function () {
        this.$el.slideDown('slow');
        this.$('.seccion-orientacion').slideDown('slow').delay(4000).slideUp('fast');
    },
    mostrar_field:function (e) {
        this.num++
        if (this.num===1) {
            $(e.currentTarget).toggleClass('selecionado');
        }else{
            if (this.seccion!==e.currentTarget.id) {
                this.$('.filter-field').removeClass('selecionado');
                this.resetearCss(e)
            }
            $(e.currentTarget).toggleClass('selecionado');
        }
        this.seccion=e.currentTarget.id
        this.efecto_mostrar(e);
    },
    efecto_mostrar:function (e) {
        var div = $(e.currentTarget);
        var divid = '#'+this.seccion;

        if (this.seccion==='type-selection') {
            if (div.hasClass('selecionado')) {
                $('#type-selection .selected').slideUp(100);
                $('#type-selection .text-over').fadeIn(100).animate({
                    'left':'15%',
                },500);
                $('#type-selection .widget-selector').addClass('estando');
                $('#type-selection .todos-filtros').slideDown('slow');
            }else{
                $('#type-selection .selected').fadeIn(500);
                $('#type-selection .text-over').fadeOut(100).css('left','10px');
                $('#type-selection .widget-selector').removeClass('estando');
                $('#type-selection .todos-filtros').slideUp('slow');

            }
        }else{
            if (div.hasClass('selecionado')) {
                $(divid+' .selected').hide(500);
                $(divid+' .title').show().animate({
                    'left':'40%',
                    'text-aling':'center',
                });
                $(divid+' .widget-selector').addClass('estando');
            }else{
                $(divid+' .selected').show();
                $(divid+' .title').animate({
                    'left':'25px',
                    'text-aling':'left',
                },500).delay(500).show();
                $(divid+' .widget-selector').removeClass('estando');
            }
        }
    },
    resetearCss:function (e) {
        if (e===0) {
            $('.filter-field').removeClass('selecionado');
        };
        var div = '#'+this.seccion;
        $(div+' .widget-selector').removeClass('estando');
        $(div+' .selected').show();
        $(div+' .text-over').hide().css('left','');
        $(div+' .title').css('left','');
    },
    aparecer_filtro:function (e) {
        var div = '#'+this.seccion;
        $(div+' .todos-filtros').slideDown('slow');
    }
});
