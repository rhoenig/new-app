var app = {

    findByName: function() {
        console.log('findByName');
        var self = this;
		this.store.findByName($('.search-key').val(), function(employees) {
			$('.employee-list').html(self.employeeLiTpl(employees));
		});
    },

    initialize: function() {
		var self = this;
        this.store = new MemoryStore(function() {
			self.showAlert('Store Initialized', 'Info');
			self.renderHomeView();
		});
		this.homeTpl = Handlebars.compile($("#home-tpl").html());
		this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
	
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	
	renderHomeView: function() {
		$('body').html(this.homeTpl());
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},


};

app.initialize();