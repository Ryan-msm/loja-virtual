(() => {
"use strict";
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const STORAGE = {products:"lqt_products_v1",cart:"lqt_cart_v1",orders:"lqt_orders_v1",compare:"lqt_compare_v1",coupon:"lqt_coupon_v1"};
const COUPON_CODE = "UNIVERSIDADE10";
const CATEGORIES = ["Memórias RAM","SSDs","Placas-mãe","Placas de vídeo","Fontes","Monitores","Teclados","Mouses","Processadores"];
const INITIAL_PRODUCTS = [["ram-kingston-fury-16-ddr4", "Kingston Fury Beast 16 GB DDR4", "Memórias RAM", "Kingston", 239.9, 12, "Memória DDR4 para computadores compatíveis, com perfil discreto e dissipador.", "16 GB, DDR4, 3200 MHz", "https://www.mercadolivre.com.br/"], ["ram-kingston-fury-32-ddr4", "Kingston Fury Beast 32 GB DDR4", "Memórias RAM", "Kingston", 429.9, 8, "Kit de memória para multitarefa e jogos em plataformas DDR4.", "32 GB, DDR4, 3200 MHz", "https://www.mercadolivre.com.br/"], ["ram-corsair-vengeance-16-ddr4", "Corsair Vengeance LPX 16 GB", "Memórias RAM", "Corsair", 259.9, 10, "Memória de perfil baixo para builds com suporte a DDR4.", "16 GB, DDR4, 3200 MHz", "https://www.pichau.com.br/"], ["ram-corsair-vengeance-32-ddr4", "Corsair Vengeance LPX 32 GB", "Memórias RAM", "Corsair", 449.9, 7, "Kit para aplicações exigentes e computadores DDR4.", "32 GB, DDR4, 3600 MHz", "https://www.pichau.com.br/"], ["ram-xpg-gammix-16-ddr4", "XPG Gammix D35 16 GB", "Memórias RAM", "ADATA XPG", 249.9, 9, "Módulo DDR4 com dissipador compacto.", "16 GB, DDR4, 3200 MHz", "https://shopee.com.br/"], ["ram-kingston-fury-16-ddr5", "Kingston Fury Beast 16 GB DDR5", "Memórias RAM", "Kingston", 319.9, 8, "Memória DDR5 para placas-mãe com suporte ao padrão.", "16 GB, DDR5, 5600 MHz", "https://www.mercadolivre.com.br/"], ["ram-kingston-fury-32-ddr5", "Kingston Fury Beast 32 GB DDR5", "Memórias RAM", "Kingston", 579.9, 6, "Kit DDR5 para plataformas modernas compatíveis.", "32 GB, DDR5, 6000 MHz", "https://www.pichau.com.br/"], ["ram-corsair-vengeance-32-ddr5", "Corsair Vengeance 32 GB DDR5", "Memórias RAM", "Corsair", 599.9, 5, "Memória DDR5 com perfil para desempenho e multitarefa.", "32 GB, DDR5, 6000 MHz", "https://www.pichau.com.br/"], ["ram-xpg-lancer-16-ddr5", "XPG Lancer 16 GB DDR5", "Memórias RAM", "ADATA XPG", 339.9, 7, "Módulo DDR5 com dissipador para computadores compatíveis.", "16 GB, DDR5, 5600 MHz", "https://shopee.com.br/"], ["ram-crucial-pro-32-ddr5", "Crucial Pro 32 GB DDR5", "Memórias RAM", "Crucial", 549.9, 6, "Kit DDR5 para produtividade, criação e jogos.", "32 GB, DDR5, 5600 MHz", "https://www.mercadolivre.com.br/"], ["ssd-kingston-a400-480", "Kingston A400 480 GB", "SSDs", "Kingston", 189.9, 14, "SSD SATA para dar mais agilidade a computadores compatíveis.", "480 GB, SATA III, 2.5 pol.", "https://www.mercadolivre.com.br/"], ["ssd-kingston-nv2-500", "Kingston NV2 500 GB", "SSDs", "Kingston", 239.9, 12, "SSD NVMe compacto para sistemas com slot M.2 compatível.", "500 GB, NVMe, M.2 2280", "https://www.pichau.com.br/"], ["ssd-kingston-nv3-1tb", "Kingston NV3 1 TB", "SSDs", "Kingston", 399.9, 9, "Armazenamento NVMe para aplicações e jogos.", "1 TB, NVMe, M.2 2280", "https://www.mercadolivre.com.br/"], ["ssd-wd-green-480", "WD Green 480 GB", "SSDs", "Western Digital", 199.9, 11, "SSD SATA para atualização de notebooks e desktops compatíveis.", "480 GB, SATA III, 2.5 pol.", "https://shopee.com.br/"], ["ssd-wd-blue-sn580-1tb", "WD Blue SN580 1 TB", "SSDs", "Western Digital", 449.9, 8, "SSD NVMe para inicialização e carregamento rápidos.", "1 TB, PCIe 4.0, M.2", "https://www.pichau.com.br/"], ["ssd-crucial-bx500-1tb", "Crucial BX500 1 TB", "SSDs", "Crucial", 359.9, 9, "SSD SATA de grande capacidade para uso cotidiano.", "1 TB, SATA III, 2.5 pol.", "https://www.mercadolivre.com.br/"], ["ssd-samsung-990-evo-1tb", "Samsung 990 EVO 1 TB", "SSDs", "Samsung", 699.9, 5, "SSD NVMe para sistemas compatíveis com PCIe.", "1 TB, NVMe, M.2", "https://www.pichau.com.br/"], ["ssd-adata-legend-710-512", "ADATA Legend 710 512 GB", "SSDs", "ADATA", 259.9, 8, "SSD M.2 para expansão de armazenamento em PCs compatíveis.", "512 GB, NVMe, M.2", "https://shopee.com.br/"], ["ssd-lexar-nm790-1tb", "Lexar NM790 1 TB", "SSDs", "Lexar", 579.9, 5, "SSD NVMe para uso intenso em plataformas compatíveis.", "1 TB, PCIe 4.0, M.2", "https://www.pichau.com.br/"], ["ssd-sandisk-plus-1tb", "SanDisk SSD Plus 1 TB", "SSDs", "SanDisk", 379.9, 7, "Armazenamento SATA para desktops e notebooks compatíveis.", "1 TB, SATA III, 2.5 pol.", "https://www.mercadolivre.com.br/"], ["mb-gigabyte-a520m-k", "Gigabyte A520M K V2", "Placas-mãe", "Gigabyte", 399.9, 7, "Placa-mãe AM4 de entrada para processadores Ryzen compatíveis.", "AM4, A520, DDR4, mATX", "https://www.pichau.com.br/"], ["mb-msi-a520m-a-pro", "MSI A520M-A PRO", "Placas-mãe", "MSI", 429.9, 6, "Placa-mãe compacta AM4 para builds de entrada.", "AM4, A520, DDR4, mATX", "https://www.mercadolivre.com.br/"], ["mb-asus-prime-b550m-a", "ASUS Prime B550M-A", "Placas-mãe", "ASUS", 699.9, 5, "Placa AM4 para processadores Ryzen compatíveis.", "AM4, B550, DDR4, mATX", "https://www.pichau.com.br/"], ["mb-gigabyte-b550m-aorus", "Gigabyte B550M Aorus Elite", "Placas-mãe", "Gigabyte", 749.9, 5, "Placa AM4 com recursos para computadores de desempenho.", "AM4, B550, DDR4, mATX", "https://www.pichau.com.br/"], ["mb-msi-b550m-pro-vdh", "MSI B550M PRO-VDH WiFi", "Placas-mãe", "MSI", 799.9, 4, "Placa AM4 com conectividade sem fio integrada.", "AM4, B550, DDR4, Wi-Fi", "https://www.mercadolivre.com.br/"], ["mb-asus-prime-b760m-a", "ASUS Prime B760M-A", "Placas-mãe", "ASUS", 999.9, 4, "Placa para processadores Intel compatíveis com soquete LGA1700.", "LGA1700, B760, DDR5, mATX", "https://www.pichau.com.br/"], ["mb-gigabyte-b760m-ds3h", "Gigabyte B760M DS3H DDR4", "Placas-mãe", "Gigabyte", 829.9, 4, "Placa-mãe Intel com suporte a memória DDR4.", "LGA1700, B760, DDR4, mATX", "https://www.pichau.com.br/"], ["mb-msi-pro-b650m-p", "MSI PRO B650M-P", "Placas-mãe", "MSI", 899.9, 4, "Placa AM5 para processadores Ryzen série compatível.", "AM5, B650, DDR5, mATX", "https://www.pichau.com.br/"], ["mb-asrock-b650m-hdv", "ASRock B650M-HDV/M.2", "Placas-mãe", "ASRock", 949.9, 3, "Placa AM5 para memória DDR5 e processadores compatíveis.", "AM5, B650, DDR5, mATX", "https://www.pichau.com.br/"], ["mb-asus-prime-a620m-k", "ASUS Prime A620M-K", "Placas-mãe", "ASUS", 699.9, 5, "Placa de entrada AM5 para builds compatíveis.", "AM5, A620, DDR5, mATX", "https://www.pichau.com.br/"], ["gpu-rx-6600", "ASRock Radeon RX 6600 8 GB", "Placas de vídeo", "ASRock", 1399.9, 4, "Placa de vídeo dedicada para jogos em 1080p, conforme o sistema.", "8 GB, GDDR6, PCIe", "https://www.mercadolivre.com.br/"], ["gpu-rx-7600", "ASRock Radeon RX 7600 8 GB", "Placas de vídeo", "ASRock", 1899.9, 3, "GPU dedicada para jogos e criação em plataformas compatíveis.", "8 GB, GDDR6, PCIe 4.0", "https://www.pichau.com.br/"], ["gpu-rtx-4060", "Gigabyte GeForce RTX 4060 8 GB", "Placas de vídeo", "Gigabyte", 2199.9, 4, "GPU NVIDIA para jogos e aplicações gráficas compatíveis.", "8 GB, GDDR6, PCIe", "https://www.mercadolivre.com.br/"], ["gpu-rtx-5060", "GeForce RTX 5060 8 GB", "Placas de vídeo", "NVIDIA", 2599.9, 3, "Referência de GPU de geração recente; confirme fabricante e modelo do anúncio.", "8 GB, GDDR, PCIe", "https://www.mercadolivre.com.br/"], ["gpu-rtx-3060", "GeForce RTX 3060 12 GB", "Placas de vídeo", "NVIDIA", 1999.9, 3, "GPU dedicada com 12 GB de memória de vídeo em modelos compatíveis.", "12 GB, GDDR6, PCIe", "https://shopee.com.br/"], ["gpu-rx-7600-xt", "Sapphire Radeon RX 7600 XT 16 GB", "Placas de vídeo", "Sapphire", 2399.9, 2, "GPU com memória ampla para jogos e tarefas gráficas compatíveis.", "16 GB, GDDR6, PCIe", "https://www.pichau.com.br/"], ["gpu-rtx-4070-super", "GeForce RTX 4070 SUPER 12 GB", "Placas de vídeo", "NVIDIA", 4299.9, 2, "GPU de desempenho elevado; consulte modelo e fabricante do anúncio.", "12 GB, GDDR6X, PCIe", "https://www.mercadolivre.com.br/"], ["gpu-rx-6650-xt", "XFX Radeon RX 6650 XT 8 GB", "Placas de vídeo", "XFX", 1699.9, 3, "GPU dedicada para jogos em resoluções comuns de computador.", "8 GB, GDDR6, PCIe", "https://shopee.com.br/"], ["gpu-rtx-3050", "GeForce RTX 3050 6 GB", "Placas de vídeo", "NVIDIA", 1299.9, 4, "GPU de entrada para computadores compatíveis.", "6 GB, GDDR6, PCIe", "https://www.pichau.com.br/"], ["gpu-arc-a750", "Intel Arc A750 8 GB", "Placas de vídeo", "Intel", 1599.9, 3, "GPU dedicada; verifique requisitos de sistema e suporte de software.", "8 GB, GDDR6, PCIe", "https://www.mercadolivre.com.br/"], ["psu-corsair-cv550", "Corsair CV550 550 W", "Fontes", "Corsair", 329.9, 8, "Fonte de alimentação para configurações compatíveis, conforme consumo total.", "550 W, 80 Plus Bronze", "https://www.pichau.com.br/"], ["psu-msi-mag-a650bn", "MSI MAG A650BN 650 W", "Fontes", "MSI", 379.9, 7, "Fonte para builds compatíveis; confira conectores e demanda energética.", "650 W, 80 Plus Bronze", "https://www.mercadolivre.com.br/"], ["psu-coolermaster-mwe-750", "Cooler Master MWE Gold 750 W", "Fontes", "Cooler Master", 599.9, 5, "Fonte com certificação Gold em modelos correspondentes.", "750 W, 80 Plus Gold", "https://www.pichau.com.br/"], ["psu-xpg-pylon-650", "XPG Pylon 650 W", "Fontes", "ADATA XPG", 399.9, 6, "Fonte para computadores de uso geral e jogos compatíveis.", "650 W, 80 Plus Bronze", "https://shopee.com.br/"], ["psu-corsair-rm850e", "Corsair RM850e 850 W", "Fontes", "Corsair", 899.9, 3, "Fonte de maior potência para builds que exigem capacidade adicional.", "850 W, 80 Plus Gold", "https://www.pichau.com.br/"], ["monitor-lg-24gs60f", "LG UltraGear 24GS60F-B 24 pol.", "Monitores", "LG", 799.9, 7, "Monitor gamer Full HD para computadores com saída de vídeo compatível.", "24 pol., Full HD, 180 Hz", "https://www.mercadolivre.com.br/"], ["monitor-lg-24mp400", "LG 24MP400 24 pol.", "Monitores", "LG", 549.9, 8, "Monitor Full HD para estudos, trabalho e uso cotidiano.", "24 pol., Full HD, 75 Hz", "https://www.pichau.com.br/"], ["monitor-samsung-t350", "Samsung T350 24 pol.", "Monitores", "Samsung", 599.9, 7, "Monitor Full HD para tarefas diárias e entretenimento.", "24 pol., Full HD, 75 Hz", "https://www.mercadolivre.com.br/"], ["monitor-aoc-hero-24g2", "AOC Hero 24G2 24 pol.", "Monitores", "AOC", 899.9, 5, "Monitor gamer Full HD; confirme a revisão e taxa do anúncio.", "24 pol., Full HD, alta taxa", "https://www.pichau.com.br/"], ["monitor-aoc-22b35", "AOC 22B35 22 pol.", "Monitores", "AOC", 429.9, 8, "Monitor compacto para estudo e escritório.", "22 pol., Full HD", "https://shopee.com.br/"], ["monitor-asus-tuf-vg249q1a", "ASUS TUF Gaming VG249Q1A", "Monitores", "ASUS", 999.9, 4, "Monitor gamer Full HD para setups compatíveis.", "23,8 pol., Full HD, 165 Hz", "https://www.pichau.com.br/"], ["monitor-gigabyte-g24f2", "Gigabyte G24F 2 24 pol.", "Monitores", "Gigabyte", 1099.9, 4, "Monitor gamer com taxa elevada em modelos correspondentes.", "24 pol., Full HD, 165 Hz", "https://www.mercadolivre.com.br/"], ["monitor-samsung-odyssey-g3", "Samsung Odyssey G3 24 pol.", "Monitores", "Samsung", 899.9, 5, "Monitor de jogos da linha Odyssey; confira a versão.", "24 pol., Full HD, alta taxa", "https://www.mercadolivre.com.br/"], ["monitor-dell-p2422h", "Dell P2422H 24 pol.", "Monitores", "Dell", 1099.9, 4, "Monitor de escritório com ergonomia para produtividade.", "24 pol., Full HD, IPS", "https://www.mercadolivre.com.br/"], ["monitor-philips-221v8", "Philips 221V8 22 pol.", "Monitores", "Philips", 449.9, 6, "Monitor Full HD para atividades acadêmicas e uso geral.", "22 pol., Full HD", "https://shopee.com.br/"], ["monitor-benq-mobiuz-ex240", "BenQ MOBIUZ EX240", "Monitores", "BenQ", 1299.9, 3, "Monitor gamer para entretenimento e uso multimídia.", "24 pol., Full HD, alta taxa", "https://www.pichau.com.br/"], ["monitor-acer-nitro-kg241y", "Acer Nitro KG241Y", "Monitores", "Acer", 849.9, 5, "Monitor gamer compacto; especificações variam conforme versão.", "23,8 pol., Full HD, alta taxa", "https://www.mercadolivre.com.br/"], ["monitor-redragon-gm24x5", "Redragon GM24X5 24 pol.", "Monitores", "Redragon", 699.9, 4, "Monitor para setup gamer; confirme revisão e taxa de atualização.", "24 pol., Full HD", "https://shopee.com.br/"], ["monitor-lg-29wq600", "LG UltraWide 29WQ600 29 pol.", "Monitores", "LG", 1399.9, 3, "Monitor ultrawide para produtividade e multitarefa.", "29 pol., UltraWide, IPS", "https://www.pichau.com.br/"], ["monitor-samsung-odyssey-g5", "Samsung Odyssey G5 27 pol.", "Monitores", "Samsung", 1599.9, 3, "Monitor de maior resolução em versões compatíveis.", "27 pol., QHD, alta taxa", "https://www.mercadolivre.com.br/"], ["keyboard-logitech-k120", "Logitech K120", "Teclados", "Logitech", 69.9, 15, "Teclado com fio para estudo e escritório.", "USB, ABNT2, membrana", "https://www.mercadolivre.com.br/"], ["keyboard-redragon-kumara", "Redragon Kumara K552", "Teclados", "Redragon", 189.9, 10, "Teclado mecânico compacto; confira layout e switches do anúncio.", "Mecânico, USB, ABNT2 em versões", "https://www.pichau.com.br/"], ["keyboard-hyperx-alloy-origins", "HyperX Alloy Origins Core", "Teclados", "HyperX", 399.9, 5, "Teclado mecânico compacto para setups de jogos.", "Mecânico, TKL, USB", "https://www.mercadolivre.com.br/"], ["keyboard-corsair-k55", "Corsair K55 RGB", "Teclados", "Corsair", 249.9, 6, "Teclado de membrana com iluminação em versões correspondentes.", "Membrana, RGB, USB", "https://www.pichau.com.br/"], ["keyboard-logitech-g213", "Logitech G213 Prodigy", "Teclados", "Logitech", 269.9, 6, "Teclado com iluminação para uso geral e jogos.", "USB, membrana, RGB", "https://www.mercadolivre.com.br/"], ["keyboard-ajazz-ak820", "Ajazz AK820", "Teclados", "Ajazz", 229.9, 5, "Teclado mecânico compacto; confira idioma e layout do anúncio.", "Mecânico, compacto, USB", "https://shopee.com.br/"], ["keyboard-rk-rk61", "Royal Kludge RK61", "Teclados", "Royal Kludge", 259.9, 5, "Teclado compacto com versões sem fio e com fio.", "60%, mecânico, versões BT/USB", "https://shopee.com.br/"], ["keyboard-machenike-k500", "Machenike K500", "Teclados", "Machenike", 179.9, 6, "Teclado compacto para setups de estudo e jogos.", "Mecânico, compacto", "https://shopee.com.br/"], ["keyboard-havit-kb487l", "Havit KB487L", "Teclados", "Havit", 159.9, 7, "Teclado para uso cotidiano e jogos casuais.", "USB, layout varia por versão", "https://www.mercadolivre.com.br/"], ["keyboard-logitech-mk270", "Logitech MK270", "Teclados", "Logitech", 169.9, 8, "Conjunto sem fio de teclado e mouse para produtividade.", "Sem fio, receptor USB", "https://www.pichau.com.br/"], ["mouse-logitech-g203", "Logitech G203 Lightsync", "Mouses", "Logitech", 139.9, 10, "Mouse com fio para uso cotidiano e jogos.", "Com fio, 8000 DPI máx. em versões", "https://www.mercadolivre.com.br/"], ["mouse-razer-deathadder-essential", "Razer DeathAdder Essential", "Mouses", "Razer", 129.9, 8, "Mouse ergonômico com fio para uso geral e jogos.", "Com fio, sensor óptico", "https://www.pichau.com.br/"], ["mouse-redragon-cobra", "Redragon Cobra M711", "Mouses", "Redragon", 99.9, 12, "Mouse com fio e iluminação em versões correspondentes.", "Com fio, RGB", "https://www.mercadolivre.com.br/"], ["mouse-logitech-g305", "Logitech G305 Lightspeed", "Mouses", "Logitech", 229.9, 7, "Mouse sem fio com receptor USB; utiliza pilha.", "Sem fio, receptor USB", "https://www.mercadolivre.com.br/"], ["mouse-logitech-m170", "Logitech M170", "Mouses", "Logitech", 69.9, 14, "Mouse sem fio simples para estudo e escritório.", "Sem fio, receptor USB", "https://www.pichau.com.br/"], ["mouse-hyperx-pulsefire-core", "HyperX Pulsefire Core", "Mouses", "HyperX", 119.9, 7, "Mouse com fio para computadores compatíveis.", "Com fio, sensor óptico", "https://www.pichau.com.br/"], ["mouse-razer-viper-mini", "Razer Viper Mini", "Mouses", "Razer", 159.9, 5, "Mouse compacto; confirme disponibilidade e revisão do produto.", "Com fio, compacto", "https://www.mercadolivre.com.br/"], ["mouse-ajazz-aj199", "Ajazz AJ199", "Mouses", "Ajazz", 189.9, 4, "Mouse leve com versões sem fio; confirme variante do anúncio.", "Sem fio em versões, sensor óptico", "https://shopee.com.br/"], ["mouse-delux-m800", "Delux M800", "Mouses", "Delux", 179.9, 5, "Mouse para setup; conectividade varia conforme versão.", "Versões com fio/sem fio", "https://shopee.com.br/"], ["mouse-corsair-harpoon", "Corsair Harpoon RGB Pro", "Mouses", "Corsair", 149.9, 6, "Mouse com fio para jogos e tarefas cotidianas.", "Com fio, RGB", "https://www.pichau.com.br/"], ["cpu-ryzen-5-5500", "AMD Ryzen 5 5500", "Processadores", "AMD", 599.9, 7, "Processador AM4; requer placa-mãe compatível e placa de vídeo dedicada para imagem.", "6 núcleos, 12 threads, AM4", "https://www.mercadolivre.com.br/"], ["cpu-ryzen-5-5600", "AMD Ryzen 5 5600", "Processadores", "AMD", 749.9, 6, "Processador AM4 para jogos e produtividade; sem vídeo integrado.", "6 núcleos, 12 threads, AM4", "https://www.pichau.com.br/"], ["cpu-ryzen-7-5700x", "AMD Ryzen 7 5700X", "Processadores", "AMD", 999.9, 4, "Processador AM4 com múltiplos núcleos para tarefas exigentes.", "8 núcleos, 16 threads, AM4", "https://www.mercadolivre.com.br/"], ["cpu-ryzen-5-5600g", "AMD Ryzen 5 5600G", "Processadores", "AMD", 799.9, 5, "Processador AM4 com gráficos integrados para sistemas compatíveis.", "6 núcleos, 12 threads, AM4, vídeo integrado", "https://www.pichau.com.br/"], ["cpu-ryzen-5-7600", "AMD Ryzen 5 7600", "Processadores", "AMD", 1299.9, 4, "Processador AM5; utiliza memória DDR5 e placa-mãe compatível.", "6 núcleos, 12 threads, AM5", "https://www.mercadolivre.com.br/"], ["cpu-ryzen-7-7700", "AMD Ryzen 7 7700", "Processadores", "AMD", 1799.9, 3, "Processador AM5 para produtividade e jogos.", "8 núcleos, 16 threads, AM5", "https://www.pichau.com.br/"], ["cpu-intel-i3-12100f", "Intel Core i3-12100F", "Processadores", "Intel", 499.9, 6, "Processador LGA1700; versão F requer placa de vídeo dedicada.", "4 núcleos, 8 threads, LGA1700", "https://www.pichau.com.br/"], ["cpu-intel-i5-12400f", "Intel Core i5-12400F", "Processadores", "Intel", 699.9, 6, "Processador LGA1700; versão F requer placa de vídeo dedicada.", "6 núcleos, 12 threads, LGA1700", "https://www.pichau.com.br/"], ["cpu-intel-i5-13400f", "Intel Core i5-13400F", "Processadores", "Intel", 1099.9, 4, "Processador Intel para placa-mãe compatível; versão F sem gráficos integrados.", "10 núcleos híbridos, LGA1700", "https://www.pichau.com.br/"], ["cpu-intel-i5-14400", "Intel Core i5-14400", "Processadores", "Intel", 1399.9, 3, "Processador Intel com gráficos integrados, sujeito à compatibilidade da placa-mãe.", "10 núcleos híbridos, LGA1700", "https://www.mercadolivre.com.br/"]].map(p => ({id:p[0],name:p[1],category:p[2],brand:p[3],price:p[4],stock:p[5],description:p[6],specs:p[7].split(", ").filter(Boolean),storeUrl:p[8],image:"",rating:4.5 + ((p[0].length % 5) / 10),reviews:18 + (p[0].length * 7 % 160)}));
let products = [];
let cart = {};
let orders = [];
let compareIds = [];
let appliedCoupon = false;
let activeCategory = "Todas";
let searchTerm = "";
let sortMode = "featured";
let adminLoggedIn = false;
let lastFocusedElement = null;

const money = value => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(value)||0);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const safeUrl = value => { try { const u = new URL(value); return ["https:","http:"].includes(u.protocol) ? u.href : ""; } catch { return ""; } };

function readJSON(key, fallback){try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw)}catch(error){console.warn("Falha ao ler dados locais:",error);return fallback}}
function saveJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(error){toast("Não foi possível salvar no navegador. Verifique o espaço disponível.", "error");return false}}
function structuredCloneSafe(value){return JSON.parse(JSON.stringify(value))}

function loadState(){
  const savedProducts=readJSON(STORAGE.products,null);
  products=Array.isArray(savedProducts)&&savedProducts.length?savedProducts:structuredCloneSafe(INITIAL_PRODUCTS);
  cart=readJSON(STORAGE.cart,{});
  orders=readJSON(STORAGE.orders,[]);
  compareIds=readJSON(STORAGE.compare,[]);
  appliedCoupon=localStorage.getItem(STORAGE.coupon)==="true";
  if(!Array.isArray(products))products=structuredCloneSafe(INITIAL_PRODUCTS);
  if(!Array.isArray(orders))orders=[];
  if(!Array.isArray(compareIds))compareIds=[];
  if(!cart||typeof cart!=="object"||Array.isArray(cart))cart={};
  cart=Object.fromEntries(Object.entries(cart).filter(([id,q])=>products.some(p=>p.id===id)&&Number.isInteger(q)&&q>0));
  compareIds=compareIds.filter(id=>products.some(p=>p.id===id)).slice(0,3);
  persistAll();
}

function persistAll(){saveJSON(STORAGE.products,products);saveJSON(STORAGE.cart,cart);saveJSON(STORAGE.orders,orders);saveJSON(STORAGE.compare,compareIds);try{localStorage.setItem(STORAGE.coupon,String(appliedCoupon))}catch{}}
function toast(message,type="success"){const el=document.createElement("div");el.className=`toast ${type}`;el.textContent=message;$("#toastRegion").append(el);setTimeout(()=>{el.style.opacity="0";el.style.transform="translateY(6px)";setTimeout(()=>el.remove(),250)},3500)}
function productById(id){return products.find(p=>p.id===id)}
function stockFor(id){return Math.max(0,Number(productById(id)?.stock)||0)}
function cartCount(){return Object.values(cart).reduce((sum,q)=>sum+q,0)}
function cartSubtotal(){return Object.entries(cart).reduce((sum,[id,q])=>sum+(Number(productById(id)?.price)||0)*q,0)}
function discountAmount(){return appliedCoupon?cartSubtotal()*.10:0}
function shippingAmount(){const subtotal=cartSubtotal()-discountAmount();return subtotal===0||subtotal>=250?0:14.90}
function cartTotal(){return Math.max(0,cartSubtotal()-discountAmount())+shippingAmount()}
function updateHeader(){ $("#cartCount").textContent=cartCount();$("#compareCount").textContent=compareIds.length;$("#cartTitleCount").textContent=`(${cartCount()})`; }
function categoryIcon(category){return ({"Memórias RAM":"▤","SSDs":"▰","Placas-mãe":"▦","Placas de vídeo":"▣","Fontes":"ϟ","Monitores":"▭","Teclados":"⌨","Mouses":"⌖","Processadores":"▦"})[category]||"▣"}
function imageUrl(product){return safeUrl(product.image)||`https://placehold.co/600x420/eaf0fb/31518d?text=${encodeURIComponent(product.brand||categoryIcon(product.category))}`}
function imageMarkup(product, className="product-image"){return `<img class="${className}" src="${escapeHTML(imageUrl(product))}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x420/eaf0fb/31518d?text=${encodeURIComponent(product.category)}'">`}

function filteredProducts(){
  let list=products.filter(p=>(activeCategory==="Todas"||p.category===activeCategory)&&[p.name,p.brand,p.category,p.description,(p.specs||[]).join(" ")].join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
  if(sortMode==="price-asc")list.sort((a,b)=>a.price-b.price);
  else if(sortMode==="price-desc")list.sort((a,b)=>b.price-a.price);
  else if(sortMode==="name-asc")list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  else list.sort((a,b)=>INITIAL_PRODUCTS.findIndex(x=>x.id===a.id)-INITIAL_PRODUCTS.findIndex(x=>x.id===b.id));
  return list;
}

function renderProducts(){
  const list=filteredProducts();$("#resultCount").textContent=`${list.length} ${list.length===1?"produto encontrado":"produtos encontrados"}`;
  $("#activeFilterLine").textContent=`${activeCategory==="Todas"?"Todas as categorias":activeCategory}${searchTerm?` • Busca: “${searchTerm}”`:""}`;
  $("#productGrid").innerHTML=list.map(p=>{
    const inCart=cart[p.id]||0;const available=stockFor(p.id);
    return `<article class="product-card"><div class="product-image-wrap">${imageMarkup(p)}<span class="product-badge">${escapeHTML(p.category)}</span><label class="compare-check"><input type="checkbox" data-compare="${escapeHTML(p.id)}" ${compareIds.includes(p.id)?"checked":""}> Comparar</label></div><div class="product-info"><span class="product-category">${escapeHTML(p.brand||p.category)}</span><h3 class="product-name">${escapeHTML(p.name)}</h3><p class="product-description">${escapeHTML(p.description)}</p><div class="product-specs">${(p.specs||[]).slice(0,3).map(s=>`<span class="spec-pill">${escapeHTML(s)}</span>`).join("")}</div><div class="product-rating"><span class="stars">★★★★★</span><span>${Number(p.rating||4.7).toFixed(1)} (${Number(p.reviews||0)})</span></div><div class="product-price">${money(p.price)}</div><div class="product-stock ${available<4?"low":""}">${available?`${available} unidade(s) no estoque demonstrativo`:"Indisponível no estoque"}</div><div class="product-card-actions"><button class="icon-action" type="button" data-details="${escapeHTML(p.id)}" aria-label="Ver detalhes de ${escapeHTML(p.name)}">↗</button><button class="add-button" type="button" data-add="${escapeHTML(p.id)}" ${available<=inCart?"disabled":""}>${available<=inCart?"Estoque limite":inCart?`Adicionar mais (${inCart})`:"Adicionar ao carrinho"}</button></div></div></article>`;
  }).join("");
  $("#emptyState").classList.toggle("hidden",list.length>0);$("#productGrid").classList.toggle("hidden",list.length===0);
  $$(".nav-category").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
  $$(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
}

function setCategory(category){activeCategory=category;renderProducts();$("#catalogo").scrollIntoView({behavior:"smooth",block:"start"})}

function addToCart(id){
  const p=productById(id);if(!p)return toast("Produto não encontrado. Atualize o catálogo.","error");
  const current=cart[id]||0;if(current+1>stockFor(id))return toast(`Estoque insuficiente para ${p.name}. Disponível: ${stockFor(id)}.`, "error");
  cart[id]=current+1;persistAll();renderProducts();renderCart();updateHeader();toast(`${p.name} foi adicionado ao carrinho.`,"success");
}

function changeQuantity(id,delta){
  const current=cart[id]||0;if(!current)return;
  const next=current+delta;
  if(next<=0){delete cart[id]}else if(next>stockFor(id)){toast(`Estoque máximo disponível: ${stockFor(id)} unidade(s).`,"error");return}else cart[id]=next;
  persistAll();renderProducts();renderCart();updateHeader();
}

function removeFromCart(id){delete cart[id];persistAll();renderProducts();renderCart();updateHeader();toast("Produto removido do carrinho.")}

function renderCart(){
  const entries=Object.entries(cart).filter(([id,q])=>productById(id)&&q>0);
  $("#cartItems").innerHTML=entries.length?entries.map(([id,q])=>{const p=productById(id);return `<div class="cart-line"><img src="${escapeHTML(imageUrl(p))}" alt="" onerror="this.src='https://placehold.co/100x100/eaf0fb/31518d?text=Item'"><div><h3>${escapeHTML(p.name)}</h3><div class="line-price">${money(p.price*q)}</div><div class="quantity-control"><button type="button" data-qty="${escapeHTML(id)}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${q}</span><button type="button" data-qty="${escapeHTML(id)}" data-delta="1" aria-label="Aumentar quantidade" ${q>=stockFor(id)?"disabled":""}>+</button></div></div><button type="button" class="remove-item" data-remove="${escapeHTML(id)}" aria-label="Remover ${escapeHTML(p.name)}">×</button></div>`}).join(""):`<div class="cart-empty"><span>🛒</span><h3>Seu carrinho está vazio</h3><p>Adicione um produto para começar seu pedido.</p><button class="button primary" type="button" id="cartBrowse">Explorar produtos</button></div>`;
  $("#couponInput").value=appliedCoupon?COUPON_CODE:$("#couponInput").value;
  $("#couponMessage").textContent=appliedCoupon?"Cupom aplicado: 10% de desconto.":"";$("#couponMessage").className="field-message"+(appliedCoupon?" success":"");
  $("#cartSummary").innerHTML=`<div class="summary-row"><span>Subtotal</span><strong>${money(cartSubtotal())}</strong></div><div class="summary-row"><span>Desconto ${appliedCoupon?"(10%)":""}</span><strong>${appliedCoupon?"− ":""}${money(discountAmount())}</strong></div><div class="summary-row"><span>Frete demonstrativo</span><strong>${shippingAmount()===0?(cartSubtotal()?"Grátis":money(0)):money(shippingAmount())}</strong></div><div class="summary-row total"><span>Total</span><strong>${money(cartTotal())}</strong></div>`;
  $("#checkoutStart").disabled=!entries.length;updateHeader();
}

function applyCoupon(){
  const input=$("#couponInput").value.trim().toUpperCase();
  if(input===COUPON_CODE){
    if(cartSubtotal()<=0){appliedCoupon=false;$("#couponMessage").textContent="Adicione produtos antes de aplicar o cupom.";$("#couponMessage").className="field-message error";return}
    appliedCoupon=true;persistAll();renderCart();$("#couponMessage").textContent="Cupom aplicado! Você ganhou 10% de desconto.";$("#couponMessage").className="field-message success";toast("Cupom UNIVERSIDADE10 aplicado!");
  } else {
    appliedCoupon=false;persistAll();$("#couponMessage").textContent="Cupom inválido. Confira se digitou UNIVERSIDADE10.";$("#couponMessage").className="field-message error";renderCart();
  }
}

function openOverlay(element){
  lastFocusedElement=document.activeElement;$("#overlay").hidden=false;element.hidden=false;document.body.style.overflow="hidden";
  const focusable=element.querySelector("button,input,select,textarea");if(focusable)focusable.focus();
}

function closeAll(){
  ["cartDrawer","productModal","compareModal","checkoutModal","successModal","adminModal"].forEach(id=>$("#"+id).hidden=true);
  $("#overlay").hidden=true;document.body.style.overflow="";if(lastFocusedElement&&typeof lastFocusedElement.focus==="function")lastFocusedElement.focus();
}

function openCart(){renderCart();openOverlay($("#cartDrawer"))}

function showProductDetails(id){
  const p=productById(id);if(!p)return;
  $("#productModalContent").innerHTML=`<div class="product-detail"><div class="detail-image">${imageMarkup(p,"")}</div><div class="detail-content"><span class="product-category">${escapeHTML(p.category)} • ${escapeHTML(p.brand)}</span><h3 id="productModalTitle">${escapeHTML(p.name)}</h3><div class="product-rating"><span class="stars">★★★★★</span><span>${Number(p.rating||4.7).toFixed(1)} (${Number(p.reviews||0)} avaliações demonstrativas)</span></div><p>${escapeHTML(p.description)}</p><div class="detail-specs">${(p.specs||[]).map(s=>`<span class="spec-pill">${escapeHTML(s)}</span>`).join("")}</div><div class="detail-price">${money(p.price)}</div><div class="detail-stock">${stockFor(id)} unidade(s) no estoque demonstrativo</div><p><strong>Compatibilidade:</strong> confira soquete, padrão de memória, dimensões, conectores e consumo antes de montar um computador.</p><div class="detail-actions"><button class="button primary" data-add="${escapeHTML(p.id)}" ${stockFor(id)<=0?"disabled":""}>Adicionar ao carrinho</button><button class="button outline" data-compare="${escapeHTML(p.id)}">＋ Comparar</button>${safeUrl(p.storeUrl)?`<a class="button outline" href="${escapeHTML(safeUrl(p.storeUrl))}" target="_blank" rel="noopener noreferrer">Consultar loja ↗</a>`:""}</div></div></div>`;
  openOverlay($("#productModal"));
}

function toggleCompare(id,checked){
  if(checked){if(compareIds.includes(id))return;if(compareIds.length>=3){toast("Você pode comparar até 3 produtos por vez.","error");renderProducts();return}compareIds.push(id)}
  else compareIds=compareIds.filter(x=>x!==id);
  persistAll();updateHeader();renderProducts();
}

// ==========================================================================
// MÓDULO DE ACESSIBILIDADE E INTERAÇÃO
// ==========================================================================
let currentFontScale = 1;

function initAccessibilityTools() {
  const btnInc = $("#btnIncreaseText");
  if (btnInc) {
    btnInc.addEventListener("click", () => {
      if (currentFontScale < 1.35) {
        currentFontScale += 0.1;
        document.documentElement.style.setProperty("--font-scale", currentFontScale);
        toast("Tamanho do texto aumentado.");
      }
    });
  }

  const btnDec = $("#btnDecreaseText");
  if (btnDec) {
    btnDec.addEventListener("click", () => {
      if (currentFontScale > 0.85) {
        currentFontScale -= 0.1;
        document.documentElement.style.setProperty("--font-scale", currentFontScale);
        toast("Tamanho do texto diminuído.");
      }
    });
  }

  const btnRes = $("#btnResetText");
  if (btnRes) {
    btnRes.addEventListener("click", () => {
      currentFontScale = 1;
      document.documentElement.style.setProperty("--font-scale", 1);
      toast("Tamanho do texto restaurado.");
    });
  }

  const btnContrast = $("#btnHighContrast");
  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      const active = document.body.classList.toggle("high-contrast");
      btnContrast.setAttribute("aria-pressed", active);
      toast(active ? "Modo de Alto Contraste ativado." : "Modo de Alto Contraste desativado.");
    });
  }

  const btnColorblind = $("#btnColorblind");
  if (btnColorblind) {
    btnColorblind.addEventListener("click", () => {
      const active = document.body.classList.toggle("colorblind-mode");
      btnColorblind.setAttribute("aria-pressed", active);
      toast(active ? "Paleta para daltônicos ativada." : "Paleta padrão restaurada.");
    });
  }
}

function renderCompare() {
  const list = compareIds.map(productById).filter(Boolean);
  if (!list.length) {
    $("#compareContent").innerHTML = `<div class="compare-empty"><p>Você ainda não selecionou produtos para comparar.</p><p>Marque a opção “Comparar” nos cards de até três produtos.</p><button class="button outline" type="button" data-close>Voltar ao catálogo</button></div>`;
    return;
  }
  const attributes = [
    { label: "Categoria", get: p => p.category },
    { label: "Marca", get: p => p.brand || "—" },
    { label: "Preço", get: p => money(p.price) },
    { label: "Estoque", get: p => `${stockFor(p.id)} disp.` },
    { label: "Especificações", get: p => (p.specs || []).join(" • ") },
    { label: "Avaliação", get: p => `★ ${Number(p.rating || 4.7).toFixed(1)} (${p.reviews || 0})` }
  ];
  $("#compareContent").innerHTML = `<div class="compare-content"><table class="compare-table"><thead><tr><th>Especificação</th>${list.map(p => `<th><div class="compare-product-title">${imageMarkup(p)}<div>${escapeHTML(p.name)}</div></div></th>`).join("")}</tr></thead><tbody>${attributes.map(attr => `<tr><td><strong>${attr.label}</strong></td>${list.map(p => `<td>${escapeHTML(attr.get(p))}</td>`).join("")}</tr>`).join("")}<tr><td><strong>Ação</strong></td>${list.map(p => `<td><button class="button primary" data-add="${escapeHTML(p.id)}" ${stockFor(p.id) <= 0 ? "disabled" : ""}>Adicionar</button></td>`).join("")}</tr></tbody></table></div>`;
}

function openCompare() {
  renderCompare();
  openOverlay($("#compareModal"));
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form) return;

  const formData = new FormData(form);
  const name = formData.get("customerName")?.trim();
  const email = formData.get("customerEmail")?.trim();
  const address = formData.get("customerAddress")?.trim();

  let hasError = false;
  const setError = (nameAttr, msg) => {
    const el = form.querySelector(`[data-error="${nameAttr}"]`);
    if (el) el.textContent = msg;
    hasError = true;
  };

  $$("#checkoutForm .field-error").forEach(el => el.textContent = "");
  const globalErrorEl = $("#checkoutGlobalError");
  if (globalErrorEl) globalErrorEl.textContent = "";

  if (!name || name.length < 3) setError("customerName", "Informe seu nome completo (mínimo 3 caracteres).");
  if (!email || !email.includes("@") || !email.includes(".")) setError("customerEmail", "Informe um e-mail válido.");
  if (!address || address.length < 5) setError("customerAddress", "Informe o endereço de entrega completo.");

  if (hasError) {
    if (globalErrorEl) globalErrorEl.textContent = "Por favor, corrija os campos destacados acima.";
    return;
  }

  const currentEntries = Object.entries(cart).filter(([id, q]) => productById(id) && q > 0);
  if (!currentEntries.length) {
    toast("O seu carrinho está vazio!", "error");
    return;
  }

  const orderId = "LQT-" + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString("pt-BR"),
    customer: { name, email, phone: formData.get("customerPhone") || "", address, cep: formData.get("customerCep") || "" },
    payment: formData.get("paymentMethod") || "PIX simulado",
    items: structuredCloneSafe(cart),
    subtotal: cartSubtotal(),
    discount: discountAmount(),
    shipping: shippingAmount(),
    total: cartTotal()
  };

  orders.unshift(newOrder);
  cart = {};
  appliedCoupon = false;
  persistAll();
  updateHeader();
  closeAll();

  const successContentEl = $("#successContent");
  if (successContentEl) {
    successContentEl.innerHTML = `
      <div class="success-icon">✓</div>
      <h2>Pedido simulado com sucesso!</h2>
      <div>
        <p>Obrigado por testar a demonstração acadêmica, <strong>${escapeHTML(name)}</strong>.</p>
        <div class="order-number">Número do pedido: ${orderId}</div>
        <div class="success-summary">
          <h3>Resumo da entrega simulada</h3>
          <p><strong>Endereço:</strong> ${escapeHTML(address)}</p>
          <p><strong>Pagamento:</strong> ${escapeHTML(newOrder.payment)}</p>
          <p><strong>Total simulado:</strong> ${money(newOrder.total)}</p>
        </div>
        <p class="muted">Este pedido foi gerado apenas para fins de apresentação e testes de usabilidade.</p>
        <div class="success-actions">
          <button class="button primary" type="button" data-close>Concluir teste</button>
        </div>
      </div>
    `;
  }

  openOverlay($("#successModal"));
  toast("Pedido simulado gerado com sucesso!", "success");
}

function renderAdminProducts() {
  $("#adminProducts").innerHTML = `<table class="admin-table"><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead><tbody>${products.map(p => `<tr><td><strong>${escapeHTML(p.name)}</strong><br><small class="muted">${escapeHTML(p.brand)}</small></td><td>${escapeHTML(p.category)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button type="button" data-admin-edit="${escapeHTML(p.id)}">Editar</button><button type="button" data-admin-delete="${escapeHTML(p.id)}">Excluir</button></td></tr>`).join("")}</tbody></table>`;
}

function renderAdminOrders() {
  $("#adminOrders").innerHTML = orders.length ? `<table class="admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Total</th><th>Pagamento</th></tr></thead><tbody>${orders.map(o => `<tr><td><strong>${escapeHTML(o.id)}</strong></td><td>${escapeHTML(o.customer?.name)}<br><small class="muted">${escapeHTML(o.customer?.email)}</small></td><td>${escapeHTML(o.date)}</td><td><strong>${money(o.total)}</strong></td><td>${escapeHTML(o.payment)}</td></tr>`).join("")}</tbody></table>` : `<p class="muted" style="padding:20px;text-align:center;">Nenhum pedido simulado registrado nesta sessão.</p>`;
}

function initAdminCategories() {
  $("#editCategory").innerHTML = CATEGORIES.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = $("#adminPassword").value.trim();
  if (pass === "admin123") {
    adminLoggedIn = true;
    $("#adminLogin").hidden = true;
    $("#adminDashboard").hidden = false;
    renderAdminProducts();
    renderAdminOrders();
    toast("Painel administrativo acessado com sucesso.");
  } else {
    $("#adminLoginError").textContent = "Senha incorreta. Utilize: admin123";
  }
}

function saveProductFromForm(e) {
  e.preventDefault();
  const id = $("#editProductId").value.trim();
  const name = $("#editName").value.trim();
  const category = $("#editCategory").value;
  const price = parseFloat($("#editPrice").value);
  const stock = parseInt($("#editStock").value, 10);
  const description = $("#editDescription").value.trim();
  const brand = $("#editBrand").value.trim();
  const image = $("#editImage").value.trim();
  const specs = $("#editSpecs").value.split(",").map(s => s.trim()).filter(Boolean);
  const storeUrl = $("#editStoreUrl").value.trim();

  if (!name || isNaN(price) || isNaN(stock)) {
    $("#productFormError").textContent = "Preencha os campos obrigatórios corretamente.";
    return;
  }

  if (id) {
    const p = productById(id);
    if (p) {
      p.name = name; p.category = category; p.price = price; p.stock = stock;
      p.description = description; p.brand = brand; p.image = image; p.specs = specs; p.storeUrl = storeUrl;
    }
    toast("Produto atualizado com sucesso!");
  } else {
    const newId = "custom-" + Math.random().toString(36).substring(2, 9);
    products.unshift({ id: newId, name, category, price, stock, description, brand, image, specs, storeUrl, rating: 5.0, reviews: 1 });
    toast("Produto cadastrado com sucesso!");
  }

  persistAll();
  renderProducts();
  renderAdminProducts();
  $("#productForm").reset();
  $("#editProductId").value = "";
  $$(".admin-tab")[0].click();
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initAccessibilityTools();
  initAdminCategories();
  renderProducts();
  updateHeader();

  document.body.addEventListener("click", e => {
    const btnAdd = e.target.closest("[data-add]");
    if (btnAdd) { addToCart(btnAdd.dataset.add); return; }

    const btnDetails = e.target.closest("[data-details]");
    if (btnDetails) { showProductDetails(btnDetails.dataset.details); return; }

    const btnQty = e.target.closest("[data-qty]");
    if (btnQty) { changeQuantity(btnQty.dataset.qty, parseInt(btnQty.dataset.delta, 10)); return; }

    const btnRemove = e.target.closest("[data-remove]");
    if (btnRemove) { removeFromCart(btnRemove.dataset.remove); return; }

    const closeTarget = e.target.closest("[data-close], #overlay");
    if (closeTarget && (e.target === closeTarget || closeTarget.hasAttribute("data-close"))) { closeAll(); return; }

    const navCat = e.target.closest(".nav-category, .filter-chip");
    if (navCat) { setCategory(navCat.dataset.category); return; }

    const adminTab = e.target.closest(".admin-tab");
    if (adminTab) {
      $$(".admin-tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      adminTab.classList.add("active");
      adminTab.setAttribute("aria-selected", "true");
      const target = adminTab.dataset.adminTab;
      $("#adminProducts").hidden = target !== "products";
      $("#adminOrders").hidden = target !== "orders";
      $("#adminEditor").hidden = target !== "editor";
      return;
    }

    const editAdmin = e.target.closest("[data-admin-edit]");
    if (editAdmin) {
      const p = productById(editAdmin.dataset.adminEdit);
      if (p) {
        $("#editProductId").value = p.id;
        $("#editName").value = p.name;
        $("#editCategory").value = p.category;
        $("#editPrice").value = p.price;
        $("#editStock").value = p.stock;
        $("#editBrand").value = p.brand || "";
        $("#editImage").value = p.image || "";
        $("#editDescription").value = p.description || "";
        $("#editSpecs").value = (p.specs || []).join(", ");
        $("#editStoreUrl").value = p.storeUrl || "";
        $$(".admin-tab")[2].click();
      }
      return;
    }

    const deleteAdmin = e.target.closest("[data-admin-delete]");
    if (deleteAdmin) {
      if (confirm("Deseja realmente remover este produto do catálogo demonstrativo?")) {
        products = products.filter(x => x.id !== deleteAdmin.dataset.adminDelete);
        persistAll();
        renderProducts();
        renderAdminProducts();
        toast("Produto removido.");
      }
      return;
    }
  });

  document.body.addEventListener("change", e => {
    const chk = e.target.closest("[data-compare]");
    if (chk) { toggleCompare(chk.dataset.compare, chk.checked); }
  });

  $("#cartOpen").addEventListener("click", openCart);
  $("#compareOpen").addEventListener("click", openCompare);
  $("#compareOpenBottom").addEventListener("click", openCompare);
  $("#heroCompare").addEventListener("click", openCompare);
  $("#shopNow").addEventListener("click", () => $("#catalogo").scrollIntoView({ behavior: "smooth" }));
  $("#adminOpen").addEventListener("click", () => {
    $("#adminPassword").value = "";
    $("#adminLoginError").textContent = "";
    if (adminLoggedIn) {
      $("#adminLogin").hidden = true;
      $("#adminDashboard").hidden = false;
      renderAdminProducts();
      renderAdminOrders();
    } else {
      $("#adminLogin").hidden = false;
      $("#adminDashboard").hidden = true;
    }
    openOverlay($("#adminModal"));
  });
  $("#footerAdmin").addEventListener("click", () => $("#adminOpen").click());

  $("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    searchTerm = $("#searchInput").value.trim();
    renderProducts();
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
  });
  $("#searchInput").addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    renderProducts();
  });
  $("#sortSelect").addEventListener("change", e => {
    sortMode = e.target.value;
    renderProducts();
  });

  $("#applyCoupon").addEventListener("click", applyCoupon);
  $("#checkoutStart").addEventListener("click", () => {
    closeAll();
    $("#checkoutReview").innerHTML = `<h3>Resumo do pedido</h3><div class="review-row"><span>Itens (${cartCount()})</span><strong>${money(cartSubtotal())}</strong></div><div class="review-row"><span>Desconto</span><strong>${money(discountAmount())}</strong></div><div class="review-row"><span>Frete</span><strong>${shippingAmount() === 0 ? "Grátis" : money(shippingAmount())}</strong></div><div class="review-row total"><span>Total simulado</span><strong>${money(cartTotal())}</strong></div>`;
    openOverlay($("#checkoutModal"));
  });
  $("#backToCart").addEventListener("click", () => { closeAll(); openCart(); });
  $("#checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  $("#adminLoginForm").addEventListener("submit", handleAdminLogin);
  $("#productForm").addEventListener("submit", saveProductFromForm);
  $("#cancelProductEdit").addEventListener("click", () => {
    $("#productForm").reset();
    $("#editProductId").value = "";
  });
  $("#resetDemo").addEventListener("click", () => {
    if (confirm("Deseja restaurar todos os dados e produtos originais da demonstração?")) {
      localStorage.clear();
      loadState();
      renderProducts();
      renderAdminProducts();
      closeAll();
      toast("Dados demonstrativos restaurados com sucesso!");
    }
  });
  $("#adminLogout").addEventListener("click", () => {
    adminLoggedIn = false;
    closeAll();
    toast("Sessão administrativa encerrada.");
  });

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
})();
