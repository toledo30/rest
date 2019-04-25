let projectCache = 'restaurant-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(projectCache).then(function(cache) {
        return cache.addAll([
            './index.html',
            './restaurant.html',
            '/css/styles.css',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/img/',
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/6.jpg',
            '/img/7.jpg',
            '/img/8.jpg',
            '/img/9.jpg',
            '/img/10.jpg',
            '/data/restaurants.json'
        ]);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    
    const url = new URL(event.request.url);

if (url.pathname.startsWith('/restaurant.html')) {
      event.respondWith(
          caches.match('restaurant.html')
          .then(response => response || fetch(event.request))
      );
      return;
}
    event.respondWith(caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;  //found in cache
      } else {
        return fetch(event.request).then(function (response) {
            let responseClone = response.clone();
            caches.open('restaurant-v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/NoOfflineContent.html'); //no offline content availabele 
        });
      }
    }));
  });




