/**
 * Created by MAXIMILIANO.CABA on 01/02/2017.
 */

var client = ZAFClient.init();

client.on('app.registered', function () {

    client.metadata().then(function (metadata) {

        var url = metadata.settings.UrlPaguina;
        var viewData = {"url": url};
        var templateUrl = "../hbs/nav-bar.hbs";
        switchView(templateUrl, viewData);

    });

});


function switchView(templateUrl, viewData) {
    var target = $("#view_container");
    $(target).empty().html("<img class='spinner' src='https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif' />");
    $.ajax(templateUrl).done(function (data) {
        var template = Handlebars.compile(data);
        var html_data = template(viewData);
        $(target).empty().html(html_data);
    });
};





