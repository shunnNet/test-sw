const version = 'v1'
const baseUrl = '/test-sw'
const filenames = ['/', '/style.css', '/app.js'].map((url) => baseUrl + url)

self.addEventListener('install', function (event) {
  console.log('install')
  event.waitUntil(addCaches(version, filenames))
})
self.addEventListener('activate', function (event) {
  console.log('activate')
  event.waitUntil(deleteOldCaches(version))
})

self.addEventListener('fetch', function (event) {
  console.log('fetch')
  event.respondWith(getFile(event))
})

async function addCaches(version, filenames) {
  const cache = await caches.open(version)
  await cache.addAll(filenames)
}

async function getFile(event) {
  const response = await caches.match(event.request)
  return response || fetch(event.request)
}

async function deleteOldCaches(version) {
  const keyList = await caches.keys()
  const deletePromises = keyList.map(
    (key) => key !== version && caches.delete(key)
  )
  return Promise.all(deletePromises)
}
