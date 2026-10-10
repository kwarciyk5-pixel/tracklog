var CACHE_NAME = 'yc-v2';
var ASSETS = ['./', './index.html', './manifest.json', './icons/icon.svg'];
self.addEventListener('install', function(e){ e.waitUntil(caches.open(CACHE_NAME).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function(r){ var cp = r.clone(); caches.open(CACHE_NAME).then(function(c){ c.put(e.request, cp); }); return r; }).catch(function(){ return caches.match(e.request); }));
});
