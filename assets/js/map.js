// Las Palmas 104 — Cap Cana attractions map (MapLibre GL + OpenFreeMap, no API key)
// Adapted from the espadavilla.com Cap Cana map. Popup thumbnails are served from
// espadavilla.com. LOT coordinate is the surveyed pin for Las Palmas 104.
(function(){
  var LOT = [-68.41853240469841, 18.46082744092435];   // lng,lat — surveyed pin, Las Palmas 104
  var IMGBASE = 'https://www.espadavilla.com/images/map/';
  var COLORS = {golf:'#2f7d5b',beach:'#2b7ea1',marina:'#b08d3e',adventure:'#c2703d',hotel:'#7d6b9e',beyond:'#6b7280'};
  var NAMES  = {golf:'Golf',beach:'Beach',marina:'Marina',adventure:'Adventure',hotel:'Resort',beyond:'Beyond Cap Cana'};
  var POIS = [
    {id:'punta-espada',name:'Punta Espada Golf Club',cat:'golf',lat:18.4548625,lng:-68.4152344,img:'punta-espada.jpg',dist:'On your doorstep',desc:'Jack Nicklaus Signature, par 72 — ranked #1 course in the Caribbean & Mexico by GolfWeek, with 8 holes on the Caribbean Sea.'},
    {id:'las-iguanas',name:'Las Iguanas Golf Course',cat:'golf',lat:18.464039,lng:-68.413488,img:'las-iguanas.jpg',dist:'~3 min',desc:"Cap Cana's second Jack Nicklaus Signature course — 36 holes of Nicklaus golf without leaving the community."},
    {id:'juanillo-beach',name:'Juanillo Beach',cat:'beach',lat:18.4785564,lng:-68.3954106,img:'juanillo-beach.jpg',dist:'~8 min',desc:"Cap Cana's signature white-sand beach — calm turquoise water, palm groves and beach clubs."},
    {id:'caleton',name:'Caletón Beach Club',cat:'beach',lat:18.4513357,lng:-68.42249,img:'caleton-beach-club.jpg',dist:'~5 min',desc:'Intimate cove beach club by Eden Roc with pool, dining and daybeds.'},
    {id:'marina',name:'Cap Cana Marina',cat:'marina',lat:18.5020236,lng:-68.383115,img:'cap-cana-marina.jpg',dist:'~12 min',desc:'One of the Caribbean\u2019s premier marinas — yacht charters, deep-sea fishing, boutiques and waterfront dining.'},
    {id:'scape',name:'Scape Park · Hoyo Azul',cat:'adventure',lat:18.4840414,lng:-68.4406678,img:'scape-park.jpg',dist:'~7 min',desc:'Natural adventure park — the Hoyo Azul cenote, zip lines, caves and jungle trails.'},
    {id:'eldorado',name:'El Dorado Water Park',cat:'adventure',lat:18.4977401,lng:-68.4123189,img:'el-dorado-park.jpg',dist:'~12 min',desc:"Cap Cana's water park and crystal lagoon — slides, wave pool and an artificial beach."},
    {id:'equestrian',name:'Los Establos Equestrian Center',cat:'adventure',lat:18.4866606,lng:-68.4276993,img:'los-establos.jpg',dist:'~10 min',desc:'World-class stables — riding lessons, polo grounds and horseback excursions.'},
    {id:'tennis',name:'Rafa Nadal Tennis Centre',cat:'adventure',lat:18.4786731,lng:-68.4172589,img:'racquet-village.jpg',dist:'~6 min',desc:'Clay tennis and padel courts at the Racquet Village.'},
    {id:'stregis',name:'The St. Regis Cap Cana',cat:'hotel',lat:18.4560625,lng:-68.4153125,img:'st-regis.jpg',dist:'~3 min',desc:"Marriott's flagship luxury resort and branded residences, opened 2026."},
    {id:'edenroc',name:'Eden Roc Cap Cana',cat:'hotel',lat:18.4576053,lng:-68.4255599,img:'eden-roc.jpg',dist:'~5 min',desc:'Relais & Châteaux boutique resort with the Caletón cove and spa.'},
    {id:'hyattzilara',name:'Hyatt Zilara / Ziva',cat:'hotel',lat:18.4808053,lng:-68.3964576,img:'hyatt-zilara.jpg',dist:'~8 min',desc:'All-inclusive resorts on Juanillo Beach.'},
    {id:'puj',name:'Punta Cana Int\u2019l Airport (PUJ)',cat:'beyond',lat:18.5623134,lng:-68.3676862,img:'puj-airport.jpg',dist:'~20 min',desc:'One of the most-connected airports in the Caribbean, nonstop from many US & Canadian cities.'}
  ];

  var el = document.getElementById('ccmap');
  if(!el) return;
  if(!window.maplibregl){ el.innerHTML = '<p style="padding:40px;text-align:center;color:#666">Map could not load. See the attractions list above.</p>'; return; }

  var map = new maplibregl.Map({container:'ccmap',style:'https://tiles.openfreemap.org/styles/positron',center:LOT,zoom:13.0,attributionControl:false});
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-right');
  map.scrollZoom.disable();
  map.on('click',function(){ map.scrollZoom.enable(); });

  function popup(p){
    var img = p.img ? '<img src="'+IMGBASE+p.img+'" alt="'+p.name+'" style="width:100%;height:130px;object-fit:cover;display:block" loading="lazy" onerror="this.style.display=\'none\'">' : '';
    return img + '<div class="pb"><span class="pop-tag">'+NAMES[p.cat]+' · '+p.dist+'</span><h4>'+p.name+'</h4><p>'+p.desc+'</p></div>';
  }
  var markers = {};
  POIS.forEach(function(p){
    var m = document.createElement('div'); m.className='mk'; m.style.background=COLORS[p.cat]; m.setAttribute('aria-label',p.name);
    var pop = new maplibregl.Popup({offset:14}).setHTML(popup(p));
    markers[p.id] = new maplibregl.Marker({element:m}).setLngLat([p.lng,p.lat]).setPopup(pop).addTo(map);
    markers[p.id]._cat = p.cat;
  });

  // Lot hero marker
  var lotEl = document.createElement('div'); lotEl.className='mk-lot';
  new maplibregl.Marker({element:lotEl}).setLngLat(LOT).setPopup(
    new maplibregl.Popup({offset:20}).setHTML('<div class="pb"><span class="pop-tag">The Opportunity</span><h4>Las Palmas 104</h4><p>3,004 m² prime lot on Punta Espada with permanent, unobstructed 270° views — the parcel toward the road is Cap Cana-owned and non-buildable.</p></div>')
  ).addTo(map);

  document.querySelectorAll('.chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
      chip.classList.add('active');
      var cat = chip.getAttribute('data-cat');
      Object.keys(markers).forEach(function(id){
        var show = (cat==='all' || markers[id]._cat===cat);
        markers[id].getElement().style.display = show ? '' : 'none';
      });
    });
  });
})();
