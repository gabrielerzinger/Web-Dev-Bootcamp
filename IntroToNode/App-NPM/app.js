var catme = require("cat-me")
var jok = require("knock-knock-jokes")
var fak = require("faker")
//ok, you basically require things and use 'em as functio

for(var i = 0; i < 10; ++i)
{
    console.log(fak.fake("{{commerce.productName}} --- {{commerce.price}} {{finance.currencySymbol}}"));
}

console.log("You can have it all, but you cant buy the love of a\n" + catme())