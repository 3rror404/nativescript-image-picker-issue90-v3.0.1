var Observable = require("data/observable").Observable;
var imagepickerModule = require("nativescript-imagepicker");

var page;
var pageData;

exports.onLoaded = function(args) {
    page = args.object;

    if (!page.bindingContext) {
        pageData = new Observable();
        page.bindingContext = pageData;
    }
}

exports.tapPickImage = function(args) {

    var context = imagepickerModule.create();

    context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then(function(selection) {
            console.log("Selection done:");

            selection.forEach(function(selected) {
                console.log(" - " + selected.uri);

                selected.getImage().then(function(imagesource) {
                    console.log('selected.getImage() - success');

                    pageData.set('message', 'Sucess!');

                }).catch(function(error) {
                    console.log(error); // => Error: The image could not be created.
                    pageData.set('message', error);
                });
            });
        }).catch(function(e) {
            console.log(e);
        });
}