<html lang="en">
<head>
    <title>S&ouml;k Flickr</title>
    <link rel="stylesheet" href="./css/search.css">
    <script type="text/javascript" src="./scripts/search.js"></script>
</head>

<body>
<!-- The Modal -->
<div id="myModal" class="modal">
    <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
    <img class="modal-content" id="img01">
    <div id="caption"></div>
</div>

<div class="div-class">
    S&ouml;k bild p&aring; Flickr: <input id="fname" type="text" size="20">
    <button id="search" onclick="search()" class="search">S&ouml;k</button>
    <p id="error" class="error hidden">Ange ett attribut!</p>
</div>
<div id="selectdiv" class="clearfix hidden div-class">
    <h1>V&aumlj bilder</h1>
    <button class="send " data-counter="0" onclick="create()">Skapa fotoalbum</button>
</div>
<div id="pictures">

</div>
<div id="album" class="clearfix hidden div-class">
    <h1>Ditt fotoalbum</h1>
</div>
<div id="albumpictures" class="div-class">

</div>

</body>

</html>