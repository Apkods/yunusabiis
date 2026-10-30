
// ===== YARDIMCI FONKSİYONLAR VE VERİLER =====
const $ = (s) => document.querySelector(s),
  fm = (n) => n.toLocaleString("tr-TR") + " ₺";
const COLL = ["Zeugma", "Antep Klasik", "Nomad", "Pamuk Modern"],
  STY = ["Klasik", "Modern", "Kilim", "Vintage"],
  SZ = [
    ["80×150", 0.45],
    ["120×180", 0.75],
    ["160×230", 1],
    ["200×290", 1.55],
  ];

// Halı renk paletleri (Urban Slate tonları)
const PAL = [
  ["#6B7C98", "#2f3747", "#E9E6E7", "#AB978C"],
  ["#5E5653", "#2b2726", "#AB978C", "#E9E6E7"],
  ["#AB978C", "#5E5653", "#E9E6E7", "#6B7C98"],
  ["#7B7F8A", "#363942", "#E9E6E7", "#AB978C"],
  ["#E9E6E7", "#7B7F8A", "#5E5653", "#6B7C98"],
  ["#4b5870", "#232a38", "#AB978C", "#E9E6E7"],
  ["#8b7a72", "#3f3633", "#E9E6E7", "#6B7C98"],
  ["#9aa5b8", "#4b5870", "#5E5653", "#E9E6E7"],
];

// Ürün listesi: ad - koleksiyon - tarz - fiyat - palet - etiketler
const P = [
  ["Zeugma Medalyon", 0, 0, 4890, 0, "be"],
  ["Nar Çiçeği", 1, 0, 3290, 7, "b"],
  ["Gece Mavisi", 0, 0, 5450, 1, "es"],
  ["Kum Geometrik", 3, 1, 2790, 2, "n"],
  ["Zeytin Blok", 3, 1, 3150, 3, "ns"],
  ["Bakır Kilim", 2, 2, 2190, 4, "b"],
  ["Toprak Kilim", 2, 2, 2390, 0, "n"],
  ["Bahar Dalı", 1, 3, 2990, 6, "s"],
  ["Eski Kırmızı", 0, 3, 6200, 4, "e"],
  ["Sis Gri", 3, 1, 3590, 5, "bs"],
  ["Hardal Yolu", 2, 2, 2490, 6, "s"],
  ["Kervan", 1, 0, 4190, 3, "ne"],
];
const ty = (s) => [0, 1, 2, 0][s],
  T = (t) => P.map((_, i) => i).filter((i) => P[i][5].includes(t)),
  pz = (i, s) => Math.round((P[i][3] * SZ[s][1]) / 10) * 10,
  old = (n) => Math.round(n / 0.85 / 10) * 10;

// Logo (SVG olarak çiziliyor)
const logo = (c) =>
  `<svg class="lg ${c || ""}" viewBox="0 0 340 64" aria-label="Demo Şirket"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path class="d" pathLength="1" d="M32 4 60 32 32 60 4 32Z"/><path class="d" pathLength="1" stroke="#AB978C" d="M32 15 49 32 32 49 15 32Z"/><path class="d" pathLength="1" stroke="#AB978C" d="M32 26 38 32 32 38 26 32Z"/></g><text class="t" x="76" y="35" font-family="Cormorant Garamond,Georgia,serif" font-size="30" font-weight="600" fill="currentColor" letter-spacing="1.5">DEMO ŞİRKET</text><text class="t" x="77" y="53" font-size="9.5" letter-spacing="4.2" fill="#AB978C" font-family="Inter,sans-serif">GAZİANTEP HALI</text></svg>`;

// Halı deseni üreten fonksiyon (SVG)
const rug = (pi, t, k) => {
  const [a, b, c, d] = PAL[pi];
  let s = `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="280" fill="${b}"/><path stroke="#E9E6E7" stroke-width="1.4" d="${Array.from({ length: 30 }, (_, j) => `M${14 + j * 6} 0v10M${14 + j * 6} 270v10`).join("")}"/><rect x="9" y="9" width="182" height="262" fill="${a}" stroke="${d}" stroke-width="3"/><rect x="21" y="21" width="158" height="238" fill="none" stroke="${c}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  if (t == 0) {
    for (let i = 0; i < 5; i++) {
      const r = 62 - i * 11;
      s += `<polygon points="100,${140 - r * 1.3} ${100 + r},140 100,${140 + r * 1.3} ${100 - r},140" fill="${[c, a, d, a, c][i]}" stroke="${b}"/>`;
    }
    for (let i = 0; i < 5; i++)
      [31, 169].forEach(
        (x) =>
          (s += `<rect x="${x - 4}" y="${42 + i * 49}" width="8" height="8" transform="rotate(45 ${x} ${46 + i * 49})" fill="${c}"/>`),
      );
  } else if (t == 1) {
    for (let r = 0; r < 6; r++)
      for (let q = 0; q < 4; q++) {
        const v = (r * 7 + q * 13 + k * 5) % 5;
        if (v < 3)
          s += `<rect x="${29 + q * 36}" y="${30 + r * 37}" width="30" height="32" fill="${v ? c : d}" opacity="${v == 2 ? 0.55 : 0.95}"/>`;
      }
  } else
    for (let i = 0; i < 9; i++) {
      const y = 32 + i * 24;
      let p = "";
      for (let x = 0; x <= 8; x++) p += `${30 + x * 17.5},${y + (x % 2) * 14} `;
      s += `<polyline points="${p}" fill="none" stroke="${i % 2 ? c : d}" stroke-width="5"/>`;
    }
  return s + "</svg>";
};

// Ürün kartı
const card = (i) => {
  const p = P[i];
  return `<a class="cd" href="#urun-${i}"><span class="bd">%15</span><div class="im">${rug(p[4], ty(p[2]), i)}</div><div class="nm">${p[0]}</div><div class="pr">${fm(p[3])}<s>${fm(old(p[3]))}</s></div></a>`;
};

// Menü ve bölüm içerikleri
const CD = [
    "Antik mozaiklerden doğan medalyon desenler. Salonunuza yüzyılların zarafetini taşır.",
    "Antep’in kökleşmiş el sanatı. Nar çiçeği ve dal motifleriyle sıcacık bir ev hissi verir.",
    "Göçebe kilim geleneğinden gelen cesur çizgiler. Sade odalara karakter katar.",
    "Yumuşak dokulu sade renkler. Modern evlerin sessiz lüksü bu koleksiyonda.",
  ],
  SD = [
    "Zamansız medalyonlar. Her kuşağın sevdiği desenler.",
    "Temiz çizgiler ve dengeli renkler. Bugünün evlerine göre.",
    "Dokuması en zor desenlerden biri. Her sırada bir hikâye saklı.",
    "Yıllanmış hissi veren yumuşak tonlar. Karakterli ve sıcak.",
  ];
const ID = P.map((_, j) => j);
const MN = [
  [
    "Koleksiyona Göre Halılarımız",
    COLL.map((n, i) => [n, "liste-c" + i, CD[i], ID.filter((j) => P[j][1] == i).slice(0, 3)]),
  ],
  [
    "Tarza Göre Halılarımız",
    STY.map((n, i) => [n, "liste-s" + i, SD[i], ID.filter((j) => P[j][2] == i).slice(0, 3)]),
  ],
  [
    "Çok Satanlar",
    T("b").map((i) => [
      P[i][0],
      "urun-" + i,
      `${COLL[P[i][1]]} koleksiyonunun en çok sevilen parçası. Bu hafta yüzlerce evin yeni halısı oldu.`,
      [i, ...ID.filter((j) => j != i && P[j][1] == P[i][1])].slice(0, 3),
    ]),
  ],
  [
    "Toptan Satın Alım",
    [
      [
        "Toptan fiyat listesi",
        "liste-toptan",
        "Fabrika çıkışlı özel fiyatlar. Otel ofis ve mağaza projeleriniz için.",
        [0, 2, 5],
      ],
      [
        "Özel ölçü ve renk",
        "liste-toptan",
        "Mekanınıza göre dokunan halılar. Ölçüyü ve rengi siz belirlersiniz.",
        [3, 4, 6],
      ],
      [
        "Teklif iste",
        "liste-toptan",
        "Formu doldurun. Aynı gün içinde size özel bir teklifle dönelim.",
        [1, 7, 9],
      ],
    ],
  ],
];
const SEC = [
  [
    "Çok Satanlar",
    "Yıllardır en çok sizin seçtiğiniz halılar burada. Her biri yüzlerce evde sınanmış ve sevilmiş. Siz de bu güvenilir klasiklerden birini seçin ve evinize sıcaklık katın.",
    "b",
    "cok",
  ],
  [
    "Yeni Gelenler",
    "Bu sezon tezgâhtan yeni inen tasarımlar. Ustalarımız haftalarca emek verdi. Modern salonlara uyum sağlayan bu desenleri herkesten önce siz keşfedin.",
    "n",
    "yeni",
  ],
  [
    "Size Özel",
    "Zevkinize göre seçtiğimiz bu halılar sadece sizin için burada. Renkleri ve dokuları birbiriyle konuşur. Evinizde sizi yansıtan bir köşe yaratmanın tam zamanı.",
    "s",
    "ozel",
  ],
  [
    "En Seçkin Halılar",
    "En uzun sürede dokunan en ince işçilikli parçalar. Koleksiyon değeri taşır ve nesilden nesile geçer. Evinizin en özel köşesi bu halıları hak ediyor.",
    "e",
    "seckin",
  ],
];
const LK = {
  cok: ["Çok Satanlar", "b"],
  yeni: ["Yeni Gelenler", "n"],
  ozel: ["Size Özel", "s"],
  seckin: ["En Seçkin Halılar", "e"],
};
const FAQ = [
  [
    "Halılarınız nerede üretiliyor",
    "Tüm halılarımız Gaziantep’teki kendi fabrikamızda dokunur. Yerli yün ve pamuk iplik kullanırız. Her halı sevkiyattan önce ustalarımızın gözünden geçer.",
  ],
  [
    "Kargo ne kadar sürer",
    "Stoktaki ürünler 2 ile 4 iş gününde kapınıza gelir. Özel ölçü siparişler 2 ile 3 hafta sürer. Kargo ücretsiz ve sigortalıdır.",
  ],
  [
    "İade ve değişim mümkün mü",
    "Teslimattan sonra 14 gün içinde kullanılmamış halıyı ücretsiz iade edebilirsiniz. Halıyı kapınızdan biz alırız.",
  ],
  [
    "Özel ölçü ve renk üretiyor musunuz",
    "Evet üretiyoruz. Ölçüyü ve rengi siz söyleyin. Size özel teklif hazırlayıp üretim sürecini adım adım paylaşalım.",
  ],
  [
    "Toptan alımda minimum adet nedir",
    "Toptan siparişlerde minimum 10 adet ya da 50 metrekare uygulanır. Teklif formundan bize ulaşabilirsiniz.",
  ],
  [
    "Halımı nasıl temizlemeliyim",
    "Haftada bir elektrikli süpürge yeterlidir. Leke olursa nemli bezle hafifçe silin. Yıkamak için bize danışın.",
  ],
  [
    "Bu site gerçek satış yapıyor mu",
    "Hayır. Bu site bir tasarım demosudur. Ödeme alınmaz ve sipariş oluşturulmaz.",
  ],
];
let cart = [],
  ps = { i: -1, s: 2, q: 1 },
  tt;

// ===== SAYFALAR =====
const sh = (k, t, l) =>
  `<div class="kick" style="color:var(--acc);text-align:center">${k}</div><h2 class="hd2">${t}</h2><p class="lead">${l}</p>`;
const faqs = (a) =>
  a.map((f) => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("");
const box = (a, c) =>
  `<div class="${c}">${a.map((x) => `<div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</div>`;
function home() {
  return (
    `<section class="hero"><div class="hbg"></div><div class="w"><div><div class="kick">Gaziantep’ten sevgiyle</div><h1>Tüm ürünlerde<br><em>%15 indirim</em></h1><p>Evinizin ilk adımı bir halıyla başlar. Kendi fabrikamızda dokuduğumuz her halıyı bu sezon %15 indirimle sunuyoruz. Çünkü evinizin en güzel haline layıksınız.</p><a class="btn" href="#liste-tum">Koleksiyonu keşfet</a></div><div class="fl">${[0, 2, 5].map(card).join("")}</div></div></section>
<div class="tr"><div class="w">${[
      ["Fabrika çıkışlı fiyat", "Aracı yok. Üreticiden size doğrudan."],
      ["Ücretsiz kargo", "81 ile sigortalı ve özenli teslimat."],
      ["14 gün iade", "Beğenmezseniz halıyı kapınızdan alırız."],
      ["Özel ölçü", "Mekanınıza göre sizin için dokuruz."],
    ]
      .map((x) => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`)
      .join("")}</div></div>
<section class="sec">${sh("Koleksiyonlarımız", "Evinizin ruhunu seçin", "Dört koleksiyon dört farklı hikâye. Hangisi sizin evinize hitap ediyor. Birine dokunun ve içinde kaybolun.")}<div class="cl">${COLL.map(
      (n, i) => {
        const j = P.findIndex((p) => p[1] == i);
        return `<a href="#liste-c${i}"><div class="im">${rug(P[j][4], ty(P[j][2]), j)}</div><h3>${n}</h3><p>${CD[i]}</p></a>`;
      },
    ).join("")}</div></section>` +
    SEC.map(
      (x, i) =>
        `<section class="sec ${i % 2 ? "" : "alt"}"><div class="sc ${i % 2 ? "r" : ""}"><div class="tx"><div class="n">0${i + 1}</div><h2>${x[0]}</h2><p>${x[1]}</p><a class="l" href="#liste-${x[3]}">Tümünü gör →</a></div><div class="pg">${T(x[2]).map(card).join("")}</div></div></section>`,
    ).join("") +
    `<section class="sec">${sh("Üretim", "Bir halı nasıl doğar", "Siparişinizin yolculuğu aylar öncesinden başlar. Her adımda sizin için titizlenen ellere bir göz atın.")}<div class="pc">${[
      [
        "01",
        "İplik seçimi",
        "En kaliteli yerli yün ve pamuk elle seçilir. Dokunuşu yumuşak ve dayanıklı olsun diye.",
      ],
      ["02", "Desen tasarımı", "Ustalarımız deseni kâğıda çizer. Her motifin bir anlamı vardır."],
      ["03", "Dokuma", "Tezgâhta haftalarca düğüm atılır. Her düğüm elle ve özenle."],
      ["04", "Son kontrol", "Halı yıkanır taranır ve ölçülür. Ancak kusursuzsa size gönderilir."],
    ]
      .map((x) => `<div><b>${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p></div>`)
      .join("")}</div></section>
<section class="bn ph"><div class="kick" style="color:#fff;opacity:.8">Toptan satın alım</div><h2>Mekanınıza özel üretim</h2><p>Otel ofis restoran ya da mağaza projeleriniz için fabrikadan doğrudan fiyat alın. Ölçüyü rengi ve deseni birlikte belirleyelim. Size özel bir teklif hazırlayalım.</p><a class="btn" href="#liste-toptan">Teklif isteyin</a></section>
<section class="sec">${sh("Müşterilerimiz", "Evlerine konuk olduğumuz insanlar", "Halılarımız binlerce evde yaşıyor. Hikâyemizi onların sözlerinden dinleyin.")}<div class="tm">${[
      ["Salonumun havası değişti. Misafirlerim önce halıya bakıyor.", "Elif K. Ankara"],
      ["Ölçüyü kendi odama göre dokudular. Hiç beklemediğim bir özen gördüm.", "Murat A. İzmir"],
      [
        "Kargo özenliydi ve halı fotoğraftan bile güzel. Kesinlikle tavsiye ederim.",
        "Zeynep T. İstanbul",
      ],
    ]
      .map((x) => `<div><p>${x[0]}</p><b>${x[1]}</b></div>`)
      .join("")}</div></section>
<section class="story"><div class="w"><div><div class="kick">Fabrikamız</div><h2>Tezgâhtan evinize aracısız.</h2><p>Gaziantep’in dokuma geleneğini modern tasarımla buluşturuyoruz. Her halı kendi atölyemizde dokunur ve doğrudan size gönderilir. Siz sadece güzel bir eve odaklanın.</p><br><a class="btn" href="#hakkimizda">Hikâyemizi okuyun</a></div><div class="st"><div><b>40+</b>yıllık tecrübe</div><div><b>120</b>usta dokumacı</div><div><b>3</b>kuşak üretici</div><div><b>81</b>ile teslimat</div></div></div></section>
<section class="sec"><div class="faq"><h2>Sıkça Sorulan Sorular</h2>${faqs(FAQ.slice(0, 4))}<p style="text-align:center;margin-top:24px"><a class="l" href="#yardim">Tüm yardım konuları →</a></p></div></section>
<section class="sec alt"><div class="nl"><h2 class="hd2">Yeni desenlerden ilk siz haberdar olun</h2><p class="lead" style="margin-bottom:20px">Yeni koleksiyonlar ve size özel indirimler eposta kutunuza ilk sizin için gelsin.</p><div><input placeholder="Eposta adresiniz"><button class="btn" onclick="toast('Demo site. Abonelik oluşturulmaz.')">Demo abone ol</button></div></div></section>`
  );
}
const pgh = (k, t, l, b) =>
  `<section class="pgh"><div class="w"><div class="kick">${k}</div><h1>${t}</h1><p>${l}</p></div></section>${b}`;
const about = () =>
  pgh(
    "Hakkımızda",
    "Üç kuşaktır aynı tezgâhta",
    "Demo Şirket Gaziantep’in kalbinde doğdu. Dedemizin tek tezgâhlı atölyesi bugün yüz yirmi ustanın çalıştığı bir fabrikaya dönüştü. Değişmeyen tek şey var. Her halıyı hâlâ bir sanat eseri gibi dokuyoruz.",
    `<section class="sec">${sh("Değerlerimiz", "Bizi biz yapan dört söz", "Halıya bakışımız bu dört sözle özetlenir. Sizin için de aynısını vadediyoruz.")}${box(
      [
        ["Emek", "Her düğüm elle atılır. Acele etmeyiz çünkü iyi şey zaman ister."],
        [
          "Doğal iplik",
          "Yerli yün ve pamuk kullanırız. Ailenizin sağlığı için en saf olanı seçeriz.",
        ],
        ["Dürüst fiyat", "Aracı yok. Fabrikadan doğrudan size hak ettiğiniz fiyatı sunarız."],
        [
          "Size özen",
          "Siz bizim için bir sipariş numarası değilsiniz. Evimize gelen bir misafirsiniz.",
        ],
      ],
      "g4",
    )}</section><section class="sec alt">${sh("Yolculuğumuz", "Küçük atölyeden büyük fabrikaya", "Yıllar içinde büyüdük ama özümüzü hiç değiştirmedik.")}<div class="tl">${[
      ["1985", "Dedemiz Gaziantep çarşısında tek tezgâhla ilk halısını dokudu."],
      ["2001", "Atölye büyüdü. Kendi fabrikamız kuruldu ve yirmi usta işbaşı yaptı."],
      ["2015", "Halılarımız dünyanın onlarca ülkesine ulaşmaya başladı."],
      ["2026", "Kapımız size açıldı. Artık fabrikamız bir tık uzağınızda."],
    ]
      .map((x) => `<div><b>${x[0]}</b><p>${x[1]}</p></div>`)
      .join(
        "",
      )}</div></section><section class="bn"><h2>Fabrikamızı ziyaret edin</h2><p>Tezgâhların başında dokuma sürecini yakından izleyin. Size bir fincan Antep kahvesi ikram edelim.</p><a class="btn" href="#iletisim">Bize ulaşın</a></section>`,
  );
const contact = () =>
  pgh(
    "İletişim",
    "Sizi dinlemek istiyoruz",
    "Bir sorunuz mu var. Özel bir ölçü mü düşünüyorsunuz. Ya da sadece merhaba mı demek istiyorsunuz. Her mesajı bizzat biz okur ve aynı gün yanıtlarız.",
    `<section class="sec">${box(
      [
        ["Adres", "Şehitkamil Organize Sanayi Bölgesi 12. Cadde No 7 Gaziantep"],
        ["Telefon", "+90 342 000 00 00"],
        ["Eposta", "info@demosirket.com"],
        ["Çalışma saatleri", "Pazartesi ile Cumartesi 09.00 ile 18.00 arası"],
      ],
      "g4",
    )}<div class="two" style="margin-top:50px"><div><h2 style="font-size:50px;margin-bottom:8px">Bize yazın</h2><p class="mut">Formu doldurun. Size en kısa sürede dönelim.</p><input placeholder="Adınız"><input placeholder="Eposta adresiniz"><input placeholder="Konu"><textarea placeholder="Mesajınız"></textarea><button class="btn" onclick="toast('Demo site. Mesaj gönderilmez.')">Demo gönder</button></div><div class="sum"><h3 style="font-size:37.5px">Showroom ve fabrika</h3><p class="mut">Halıları dokunarak seçmek ister misiniz. Gaziantep’teki showroomumuza bekleriz.</p><p>Her ziyaretçiye bir uzman eşlik eder. Evinizin fotoğrafını getirirseniz size en uygun deseni birlikte buluruz.</p><br><button class="btn o" onclick="fab('wa')">WhatsApp ile yazın</button></div></div></section>`,
  );
const help = () =>
  pgh(
    "Yardım ve Destek",
    "Size nasıl yardımcı olabiliriz",
    "Aradığınız cevap burada olabilir. Bulamazsanız destek ekibimiz bir mesaj uzağınızda.",
    `<section class="sec">${sh("Konular", "Sık başvurulan başlıklar", "Altı başlıkta en çok merak edilenleri topladık.")}${box(
      [
        [
          "Sipariş ve ödeme",
          "Siparişiniz onaylanınca size haber veririz. Ödeme seçenekleri satın alma sayfasında yer alır.",
        ],
        [
          "Kargo ve teslimat",
          "Tüm halılar sigortalı gönderilir. Stoktaki ürünler 2 ile 4 iş gününde elinizde.",
        ],
        ["İade ve değişim", "14 gün içinde ücretsiz iade hakkınız var. Halıyı kapınızdan alırız."],
        [
          "Halı bakımı",
          "Haftalık süpürme ve nemli bezle leke silme yeterlidir. Derin temizlik için bize danışın.",
        ],
        ["Özel ölçü", "Odanıza göre halı dokuyoruz. Ölçüyü söyleyin rengi birlikte seçelim."],
        [
          "Toptan satış",
          "Otel ofis ve mağaza projelerine özel fiyat veriyoruz. Teklif formunu doldurmanız yeterli.",
        ],
      ],
      "g3",
    )}</section><section class="sec alt"><div class="faq"><h2>Sıkça Sorulan Sorular</h2>${faqs(FAQ)}</div></section><section class="bn"><h2>Hâlâ yardıma mı ihtiyacınız var</h2><p>Destek ekibimiz hafta içi her gün size yardımcı olmaktan mutluluk duyar. Bize hemen ulaşın.</p><a class="btn" href="#iletisim">İletişime geçin</a></section>`,
  );

// Liste sayfası
function list(k) {
  let t = "Tüm Halılar",
    ids = P.map((_, i) => i);
  if (/^c\d$/.test(k)) {
    t = COLL[k[1]] + " Koleksiyonu";
    ids = ids.filter((i) => P[i][1] == k[1]);
  } else if (/^s\d$/.test(k)) {
    t = STY[k[1]] + " Halılar";
    ids = ids.filter((i) => P[i][2] == k[1]);
  } else if (LK[k]) {
    t = LK[k][0];
    ids = T(LK[k][1]);
  } else if (k == "toptan") t = "Toptan Satın Alım";
  return `<section class="sec"><div class="w"><div class="kick" style="color:var(--acc)">${ids.length} ürün</div><h1 style="font-size:67.5px;margin-bottom:24px">${t}</h1>${k == "toptan" ? `<div class="sum" style="margin-bottom:34px"><h3 style="font-size:32.5px">Fabrika fiyatıyla toptan alım</h3><p class="mut">Otel ofis ve mağazalar için minimum 10 adet siparişte özel fiyat. Ölçüyü rengi ve deseni birlikte belirleyelim.</p><input placeholder="Firma adı"><input placeholder="Telefon"><button class="btn" onclick="toast('Demo site. Teklif talebi gönderilmez.')">Demo teklif iste</button></div>` : ""}<div class="pg ls">${ids.map(card).join("")}</div></div></section>`;
}

// Ürün sayfası
function prod(i) {
  if (!P[i]) return home();
  if (ps.i != i) ps = { i, s: 2, q: 1 };
  const p = P[i],
    n = pz(i, ps.s),
    rel = P.map((_, j) => j)
      .filter((j) => j != i && P[j][1] == p[1])
      .slice(0, 4);
  return `<section class="sec"><div class="pv"><div class="im">${rug(p[4], ty(p[2]), i)}</div><div><div class="kick" style="color:var(--acc)">${COLL[p[1]]} ${STY[p[2]]}</div><h1>${p[0]}</h1><div class="pp">${fm(n)} <s>${fm(old(n))}</s></div><p class="mut">Gaziantep’te kendi atölyemizde sizin için dokundu. Yoğun havı ayağınıza yumuşak bir dokunuş sunar. Leke tutmayan yapısıyla yıllarca ilk günkü gibi kalır. Kampanya boyunca %15 indirimle sizin.</p><b>Ölçü</b><div class="szs">${SZ.map((z, j) => `<button class="${j == ps.s ? "on" : ""}" onclick="pick(${j})">${z[0]} cm</button>`).join("")}</div><div class="qt"><button onclick="qty(-1)">−</button><b>${ps.q}</b><button onclick="qty(1)">+</button></div><div class="acts"><button class="btn o" onclick="add(${i})">Sepete ekle</button><button class="btn" onclick="add(${i},1)">Hemen al</button></div><ul class="sp"><li>Yün ve pamuk karışımı doğal iplik</li><li>Gaziantep’te elde dokundu</li><li>Ücretsiz kargo ve 14 gün iade</li><li>Beğenmezseniz halıyı kapınızdan alırız</li></ul></div></div>${rel.length ? `<div class="w" style="margin-top:70px"><h2 style="font-size:45px;margin-bottom:20px">Aynı koleksiyondan</h2><div class="pg ls">${rel.map(card).join("")}</div></div>` : ""}</section>`;
}

// Satın alma sayfası (DEMO SATIN ALMA butonu burada)
const tot = () => cart.reduce((a, c) => a + pz(c.i, c.s) * c.q, 0);
function pay() {
  return `<section class="sec"><div class="pv" style="grid-template-columns:1fr 1fr"><div><h1>Satın Alma</h1><p class="mut">Teslimat bilgilerinizi girin. Bu bir demodur ve bilgileriniz kaydedilmez.</p><input placeholder="Ad soyad"><input placeholder="Telefon"><input placeholder="Adres"><input placeholder="Şehir"></div><div class="sum"><h3 style="font-size:32.5px">Sipariş özeti</h3>${cart.length ? cart.map((c) => `<div class="r"><span>${P[c.i][0]} ${SZ[c.s][0]} x ${c.q}</span><b>${fm(pz(c.i, c.s) * c.q)}</b></div>`).join("") + `<div class="r"><b>Toplam</b><b>${fm(tot())}</b></div><button class="btn big" onclick="toast('Bu bir demo sitedir. Ödeme alınmaz ve sipariş oluşturulmaz.')">DEMO SATIN ALMA</button>` : `<p class="mut" style="margin-top:12px">Sepetiniz boş. <a class="l" href="#liste-tum">Halılara göz atın</a></p>`}</div></div></section>`;
}
function show(v, top) {
  $("#m").innerHTML = v;
  if (top !== 0) scrollTo(0, 0);
}

// Sayfa yönlendirme (adres çubuğundaki # kısmına göre)
function route() {
  const h = location.hash.slice(1);
  document.querySelectorAll("nav li").forEach((l) => l.classList.remove("open"));
  drawer(0);
  if (h.startsWith("urun-")) show(prod(+h.slice(5)));
  else if (h.startsWith("liste-")) show(list(h.slice(6)));
  else if (h == "odeme") show(pay());
  else if (h == "hakkimizda") show(about());
  else if (h == "iletisim") show(contact());
  else if (h == "yardim") show(help());
  else show(home());
}
function pick(s) {
  ps.s = s;
  show(prod(ps.i), 0);
}
function qty(d) {
  ps.q = Math.max(1, ps.q + d);
  show(prod(ps.i), 0);
}

// Sepet işlemleri
function add(i, go) {
  const k = cart.find((c) => c.i == i && c.s == ps.s);
  k ? (k.q += ps.q) : cart.push({ i, s: ps.s, q: ps.q });
  upd();
  go ? (location.hash = "odeme") : (drawer(1), toast("Sepete eklendi"));
}
function upd() {
  $("#cn").textContent = cart.reduce((a, c) => a + c.q, 0);
  $("#dl").innerHTML = cart.length
    ? cart
        .map(
          (c, j) =>
            `<div class="ln"><div class="im">${rug(P[c.i][4], ty(P[c.i][2]), c.i)}</div><div><b>${P[c.i][0]}</b><br>${SZ[c.s][0]} cm ${c.q} adet<br>${fm(pz(c.i, c.s) * c.q)}</div><button onclick="cart.splice(${j},1);upd()" aria-label="Sil">×</button></div>`,
        )
        .join("")
    : `<p class="mut" style="margin-top:20px">Sepetiniz henüz boş.</p>`;
  $("#df").innerHTML = cart.length
    ? `<div class="r" style="display:flex;justify-content:space-between;margin-bottom:12px"><b>Toplam</b><b>${fm(tot())}</b></div><a class="btn big" style="display:block;margin:0" href="#odeme">Sepeti onayla</a>`
    : "";
}
function drawer(o) {
  $("#dr").classList.toggle("on", !!o);
  $("#sh").classList.toggle("on", !!o);
}
function toast(t) {
  const e = $("#ts");
  e.textContent = t;
  e.classList.add("on");
  clearTimeout(tt);
  tt = setTimeout(() => e.classList.remove("on"), 2800);
}
function demo() {
  toast("Demo site. Sosyal medya sayfası yok.");
  return false;
}
function ovX() {
  $("#ov").classList.remove("on");
}

// Arama ve kayıt penceresi
function ovS() {
  $("#ovc").innerHTML =
    `<h3>Halı ara</h3><input id="q" placeholder="Örn. kilim Zeugma mavi" oninput="sr(this.value)"><div id="rs"></div>`;
  $("#ov").classList.add("on");
  $("#q").focus();
  sr("");
}
function sr(v) {
  v = v.toLocaleLowerCase("tr");
  const r = P.map((_, i) => i)
    .filter((i) => (P[i][0] + COLL[P[i][1]] + STY[P[i][2]]).toLocaleLowerCase("tr").includes(v))
    .slice(0, 6);
  $("#rs").innerHTML = r.length
    ? r
        .map(
          (i) =>
            `<a class="rs" href="#urun-${i}" onclick="ovX()"><div class="im">${rug(P[i][4], ty(P[i][2]), i)}</div><span>${P[i][0]}<br><small>${COLL[P[i][1]]}</small></span><b class="pr">${fm(P[i][3])}</b></a>`,
        )
        .join("")
    : `<p class="mut">Sonuç bulunamadı.</p>`;
}
function ovR() {
  $("#ovc").innerHTML =
    `<h3>Kayıt ol</h3><input placeholder="Ad soyad"><input placeholder="Eposta"><input type="password" placeholder="Şifre"><button class="btn" onclick="ovX();toast('Demo site. Kayıt oluşturulmaz.')">Demo kayıt ol</button>`;
  $("#ov").classList.add("on");
}

// Üst menü açma kapama
function tg(b) {
  const l = b.parentNode,
    o = l.classList.contains("open");
  document.querySelectorAll("nav li").forEach((x) => x.classList.remove("open"));
  if (!o) l.classList.add("open");
}
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav"))
    document.querySelectorAll("nav li").forEach((l) => l.classList.remove("open"));
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    ovX();
    drawer(0);
  }
});
$("#mn").innerHTML = MN.map(
  (m) =>
    `<li><button class="b" onclick="tg(this)">${m[0]}</button><div class="mega"><div class="lt">${m[1].map((x, j) => `<a class="it ${j ? "" : "on"}" data-j="${j}" href="#${x[1]}" onmouseenter="hv(this)" onfocus="hv(this)">${x[0]}<i>→</i></a>`).join("")}</div><div class="rt">${m[1].map((x, j) => `<div class="pn ${j ? "" : "on"}" data-j="${j}"><h5>${x[0]}</h5><p>${x[2]}</p><div class="mp">${x[3].map((i) => `<a class="mc" href="#urun-${i}"><div class="im">${rug(P[i][4], ty(P[i][2]), i)}</div><span>${P[i][0]}</span><b>${fm(P[i][3])}</b></a>`).join("")}</div><a class="l" href="#${x[1]}">Hepsini gör →</a></div>`).join("")}</div></div></li>`,
).join("");
$("#lgo").innerHTML = logo();
$("#sp").innerHTML = logo("an");
setTimeout(() => $("#sp").classList.add("off"), 3000);
function hv(e) {
  const j = e.dataset.j;
  e.closest(".mega")
    .querySelectorAll("[data-j]")
    .forEach((x) => x.classList.toggle("on", x.dataset.j == j));
}

// WhatsApp ve Trendyol DEMO kutusu
function fab(k) {
  const f = $("#fp");
  if (!k) {
    f.classList.remove("on");
    return;
  }
  $("#ft").textContent = "DEMO";
  f.classList.add("on");
}
addEventListener("hashchange", route);
route();
upd();
