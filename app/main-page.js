/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
var createViewModel = require("./main-view-model").createViewModel;
var imagepickerModule = require("nativescript-imagepicker");

exports.onNavigatingTo = function(args) {
    var page = args.object;
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

                }).catch(function(error) {
                    console.log(error); // => Error: The image could not be created.
                });
            });
        }).catch(function(e) {
            console.log(e);
        });
}