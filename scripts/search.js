
var nrOfItems = 0;
var itemsClicked = new Array();
var obj;
function clicked(selected)
{
    if(selected.classList.contains('selected'))
    {
        selected.classList.remove('selected');
        var i = itemsClicked.indexOf(selected.getAttribute("id"));
        if(i != -1) {
            itemsClicked.splice(i, 1);
        }
        counter(false);
    }
    else
    {
        itemsClicked.push(selected.getAttribute("id"));
        selected.classList.add('selected');
        counter(true);
    }

}

function counter(selected) {
    if (selected) {
        nrOfItems++;
        document.getElementsByClassName('send')[0].classList.add('selected');
    }
    else {
        nrOfItems--;
    }
    if(nrOfItems == 0)
        document.getElementsByClassName('send')[0].classList.remove('selected');
    document.getElementsByClassName('send')[0].setAttribute('data-counter', nrOfItems);
}
function search() {
    var options = {
        "api_key": "8fff258bcc285379cbc71a394449c63d",
        "method": "flickr.photos.search",
        "format": "json",
        "nojsoncallback": "1",
        "text": document.getElementById("fname").value
    }
    clearCanvas();
    if(document.getElementById("fname").value == '')
    {
        document.getElementById("error").classList.remove("hidden");
    }
    else {
        document.getElementById("error").classList.add("hidden");
        makeFlickrRequest(options, function (data) {

            obj = JSON.parse(data);
            if(obj.photos.photo.length > 0) {
                var list = document.createElement("UL");

                for (var i = 0; i < obj.photos.photo.length; i++) {
                    var photo = obj.photos.photo[i];
                    var listItem = document.createElement("LI");
                    listItem.setAttribute('id', photo.id);
                    var photo_url = "http://farm" + photo.farm + ".static.flickr.com/" +
                        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "m.jpg";
                    listItem.onclick = function () {
                        clicked(this);
                    }
                    var img = document.createElement("IMG");
                    img.setAttribute("src", photo_url);
                    img.setAttribute("title", photo.title);
                    img.classList.add('img-class');
                    listItem.appendChild(img);
                    list.appendChild(listItem);
                }

                document.getElementById("pictures").appendChild(list);
                document.getElementById("selectdiv").classList.remove("hidden");
            }
            else
            {
                document.getElementById("pictures").innerHTML = "Inga bilder hittades";
            }
        });
    }
}

var makeFlickrRequest = function(options, cb) {

    var url, xhr, item, first;

    url = "https://api.flickr.com/services/rest/";
    first = true;

    for (item in options) {
        if (options.hasOwnProperty(item)) {
            url += (first ? "?" : "&") + item + "=" + options[item];
            first = false;
        }
    }
    xhr = new XMLHttpRequest();
    var response;
    xhr.onload = function() { cb(this.response); };
    xhr.open('get', url, true);
    xhr.send();

};

function create()
{
    if(nrOfItems == 0)
        return
    document.getElementById("album").classList.remove("hidden");
    document.getElementById("selectdiv").classList.add("hidden");
    document.getElementById("pictures").innerHTML='';
    var list = document.createElement("UL");
    for (var i = 0; i < obj.photos.photo.length; i++) {
        var photo = obj.photos.photo[i];
        for(item in itemsClicked)
        {
            if(itemsClicked[item] == photo.id)
            {
                var listItem = document.createElement("LI");
                var photo_url = "http://farm" + photo.farm + ".static.flickr.com/" +
                    photo.server + "/" + photo.id + "_" + photo.secret + "_";
                listItem.setAttribute("data-url", photo_url + "h.jpg");
                listItem.setAttribute("data-title", photo.title);
                listItem.onclick = function () {
                    openImg(this);
                }
                var img = document.createElement("IMG");
                img.setAttribute("src", photo_url + "m.jpg");
                img.classList.add('img-class');
                listItem.appendChild(img);
                list.appendChild(listItem);
                break;
            }
        }
    }
    document.getElementById("albumpictures").appendChild(list);
}

function openImg($this)
{
    var modal = document.getElementById('myModal');

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = $this.getAttribute("data-url");
    captionText.innerHTML = $this.getAttribute("data-title");

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
}

function clearCanvas()
{
    document.getElementById("pictures").innerHTML = "";
    nrOfItems = 0;
    itemsClicked = new Array();
    document.getElementsByClassName('send')[0].classList.remove('selected');
    document.getElementById('album').classList.add('hidden');
    document.getElementById("albumpictures").innerHTML = "";
}