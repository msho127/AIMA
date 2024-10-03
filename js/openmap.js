const redIcon = L.icon({
  iconUrl: "https://esm.sh/leaflet@1.9.2/dist/images/marker-icon.png",
  iconRetinaUrl: "https://esm.sh/leaflet@1.9.2/dist/images/marker-icon-2x.png",
  shadowUrl: "https://esm.sh/leaflet@1.9.2/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
  className: "icon", // <= ここでクラス名を指定
});

var map = L.map('mapid', {
  center: [34.70641688633627, 135.50355779616925],
  zoom: 18,
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});

tileLayer.addTo(map);

var popup = L.popup();

function addMarkerWithPopup(latitude, longitude, name, address, imageSrc) {
  L.marker([latitude, longitude], { icon: redIcon }).addTo(map).on('click', function (e) {
    popup
      .setLatLng(e.latlng)
      .setContent("<img src='" + imageSrc + "' width='300' height='200'><p id='pId'><span>" + name + "</span><br>" + address + "</p><div class='detailedWrap'><a href='detailed.html' id='detailedIdWrap' class='detailedBtn'>店情報を見る</a><button class='addBtn' onclick='locationXY(" + latitude + ", " + longitude + ", \"" + name + "\" , \"" + address + "\" , \"" + imageSrc + "\")'>追加</button></div>")
      .openOn(map);
  });
}

var eccCom2Coordinates = [34.70641688633627, 135.50355779616925];
var eccCom4Coordinates = [34.70675091142761, 135.50323763405487];
var eccInt5Coordinates = [34.705922889319616, 135.50318891255765];
var eccHairCoordinates = [34.70706239810063, 135.50312302200334];

var umedaSkyCoordinates = [34.70597351785494, 135.4896168709362];
var osakaStationCoordinates = [34.702572962735374, 135.49598760264027];


addMarkerWithPopup(...eccCom2Coordinates, 'BOULANGERIE', '〒530-0015 大阪府大阪市北区中崎西１丁目４−１２', 'img/temp1.jpg');
addMarkerWithPopup(...eccCom4Coordinates, '京南屋(たつみや)', '〒530-0015 大阪府大阪市北区中崎西２丁目３−３５', 'img/temp2.jpg');
addMarkerWithPopup(...eccInt5Coordinates, 'ふじでん', '〒530-0015 大阪府大阪市北区中崎西２丁目３−１', 'img/temp3.jpg');
addMarkerWithPopup(...eccHairCoordinates, 'RIVARNO', '〒530-0015 大阪府大阪市北区中崎西２丁目６−１１', 'img/temp4.jpg');

addMarkerWithPopup(...umedaSkyCoordinates, '梅田スカイビル', '〒531-6023 大阪府大阪市北区大淀中１丁目１−８８', 'img/Usky.jpg');
addMarkerWithPopup(...osakaStationCoordinates, 'JR大阪駅', '大阪府大阪市北区梅田３丁目１−１', 'img/OSAKAs.jpg');

function locationXY(latitude, longitude, name , address, imageSrc) {
  var taskName = name;
  var taskAddress = address;
  var taskImg = imageSrc;

  ls.push([latitude, longitude, name , address, imageSrc]);

  var taskList = document.getElementById("taskList");
  if(taskList.querySelector("li.spotGeolocation")){
    var newTaskName = document.createElement("li");
    newTaskName.className = "spotList";
    taskList.appendChild(newTaskName);

    var newTaskImg = document.createElement("div");
    newTaskImg.className = "spotImg";
    newTaskImg.innerHTML = "<img src='" + imageSrc + "' width='80' height='60'>";
    newTaskName.appendChild(newTaskImg);

    var newTaskContent = document.createElement("div");
    newTaskContent.className = "spotContent";
    newTaskName.appendChild(newTaskContent);

    var newTaskNameText = document.createElement("p");
    newTaskNameText.className = "spotName";
    newTaskNameText.textContent = taskName;
    newTaskContent.appendChild(newTaskNameText);

    var newTaskAddress = document.createElement("p");
    newTaskAddress.className = "spotAddress";
    newTaskAddress.textContent = taskAddress;
    newTaskContent.appendChild(newTaskAddress);
  }else{
    alert("現在地を先に取得してください。")
  }
}

var ls = [];


// ルート作成
const button =document.getElementById("rootBtnId")

function root() {
  if (ls.length >= 1 && ls.length <= 10) {
    var waypointsArray = [L.latLng(currentLocationLat, currentLocationLng)];

    for (var i = 0; i < ls.length; i++) {
      waypointsArray.push(L.latLng(...ls[i]));
    }

    L.Routing.control({
      waypoints: waypointsArray,
      routeWhileDragging: true
    }).addTo(map);
    document.getElementById("rootBtnId").innerText = "ルート作成完了";
  } else {
    alert("現在地を取得して、スポットを選択してください。")
  }
}

// 現在地取得
function current() {
  navigator.geolocation.getCurrentPosition(current2);
}

var isFirstInvocation = true;

function current2(position) {
  if (!isFirstInvocation) {
    // Skip execution on the second invocation
    return;
  }

  currentLocationLat = position.coords.latitude + "\n";
  currentLocationLng = position.coords.longitude + "\n";

  console.log(currentLocationLat);
  console.log(currentLocationLng);

  var taskName = "現在地";

  var taskList = document.getElementById("taskList");
  var newTaskName = document.createElement("li");
  newTaskName.className = "spotGeolocation";
  newTaskName.textContent = taskName;
  taskList.appendChild(newTaskName);

  addMarkerWithPopup2(currentLocationLat, currentLocationLng);

  document.getElementById("currentBtnId").classList.add("currentImg2");

  // Update the flag after the first invocation
  isFirstInvocation = false;
}
function addMarkerWithPopup2(latitude, longitude, name, address, imageSrc) {
  L.marker([latitude, longitude]).addTo(map).on('click', function (e) {
  });
}


document.addEventListener('DOMContentLoaded', function () {
  var reductionBtn = document.querySelector('.reductionBtn');
  var reductionWrap = document.querySelector('.reductionWrap');

  if (reductionBtn && reductionWrap) {
      var isReduced = false;

      reductionBtn.addEventListener('click', function () {
          // 現在の高さを取得
          var currentHeight = reductionWrap.offsetHeight;

          // 切り替えるための目標の高さ
          var targetHeight = isReduced ? 30 : 300; // 30pxに変更

          // アニメーションのステップ数
          var steps = 30;

          // アニメーションの時間（ミリ秒）
          var animationDuration = 0.1;

          // 1ステップごとの高さの変化量
          var stepHeight = (targetHeight - currentHeight) / steps;

          // アニメーション処理
          var currentStep = 0;
          var interval = setInterval(function () {
              if (currentStep < steps) {
                  currentHeight += stepHeight;
                  reductionWrap.style.height = currentHeight + 'px';
                  currentStep++;
              } else {
                  clearInterval(interval);
                  // 縮小/元に戻す状態を更新
                  isReduced = !isReduced;
              }
          }, animationDuration / steps);
      });
  }
});