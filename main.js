const leerData = fetch(
    'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
).then((resp) => resp.json()).then(mostrarData);

function mostrarData(array)
{
    console.log(array);
}