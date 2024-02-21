# web-scraper-nodejs
How to use:

1. Send a `GET` request to ```/scrape```
2. The body of the requets contains two data: url and elements
3. url is just a simple url like ```https://test.com/product/ideapad-ip1-cb-lenovo-laptop/```
4. The elements is a json of the selectors and the name of that selector like 
```{"title": "h1.product_title.entry-title", "price": ".price-atc-stock-wrapper .amount"}```
5. you will recieve a json response with the keys of the elements and the values of the selectors. Example:
```
"[{\"title\":\"لپ تاپ 15.6 اینچی لنوو IdeaPad مدل IP1-CBلپ تاپ 15.6 اینچی لنوو IdeaPad مدل IP1-CB\"},{\"price\":\"9,499,000 تومان9,593,990 تومان\"}]"
```
