// ===== Team Profile Data for all 48 Qualified Teams =====
const teamProfiles = {
    "France": {
        code: "fr", confederation: "europe", confName: "UEFA",
        colors: ["#002395", "#ed2939"],
        folder: "team profile/france",
        cover: "fifa-world-cup-2026-france-team-images.jpg.jpg",
        coach: "Didier Deschamps", coachNationality: "France", coachAge: 57, coachImage: "assets/coaches/didier_deschamps.jpg", coachBio: "The most successful French manager in history, Deschamps won the 2018 World Cup as a player in 1998 and as a manager in 2018. His pragmatic approach has made France perennial finalists.", fifaRank: 2, worldCupTitles: 2,
        bestFinish: "Winners (1998, 2018)",
        keyPlayers: [
            { name: "Kylian Mbappé", position: "Forward", number: 10, club: "Real Madrid", image: "assets/players/kylian_mbappe_france.jpg" },
            { name: "Antoine Griezmann", position: "Midfielder", number: 7, club: "Atlético Madrid", image: "assets/players/antoine_griezmann.jpg" },
            { name: "Aurélien Tchouaméni", position: "Midfielder", number: 18, club: "Real Madrid", image: "assets/players/aurelien_tchouameni.jpg" }
        ],
        facts: "France are the most consistent major tournament team of the modern era, reaching the final in 2018 and 2022. With Kylian Mbappe leading a lightning-fast counter-attack alongside Griezmann's creativity, Les Bleus have the squad depth to go all the way again. Deschamps' pragmatic style has proven to be the perfect World Cup formula."
    },
    "England": {
        code: "gb-eng", confederation: "europe", confName: "UEFA",
        colors: ["#fff", "#e3000b"],
        folder: "team profile/england",
        cover: "fifa-world-cup-2026-england-team-images.jpg.jpg",
        coach: "Thomas Tuchel", coachNationality: "Germany", coachAge: 52, coachImage: "assets/coaches/thomas_tuchel.jpg", coachBio: "Won the Champions League with Chelsea in 2021 and the Bundesliga with Bayern Munich. The tactical innovator brings German precision to an England squad desperate to end their 60-year wait.", fifaRank: 4, worldCupTitles: 1,
        bestFinish: "Winners (1966)",
        keyPlayers: [
            { name: "Harry Kane", position: "Striker", number: 9, club: "Bayern Munich", image: "assets/players/harry_kane.jpg" },
            { name: "Jude Bellingham", position: "Midfielder", number: 10, club: "Real Madrid", image: "assets/players/jude_bellingham.jpg" },
            { name: "Bukayo Saka", position: "Winger", number: 7, club: "Arsenal", image: "assets/players/bukayo_saka.jpg" }
        ],
        facts: "England haven't won a major tournament since 1966, but this golden generation - led by Bellingham, Saka and Kane - has come agonizingly close. Under Thomas Tuchel, they'll play with the tactical edge they've been missing. The Three Lions have the depth and talent to finally break their curse on North American soil."
    },
    "Germany": {
        code: "de", confederation: "europe", confName: "UEFA",
        colors: ["#000", "#dd0000"],
        folder: "team profile/germany",
        cover: "fifa-world-cup-2026-germany-team-images.jpg.jpg",
        coach: "Julian Nagelsmann", coachNationality: "Germany", coachAge: 38, coachImage: "assets/coaches/julian_nagelsmann.jpg", coachBio: "One of the youngest elite coaches in world football, Nagelsmann revitalized Germany after back-to-back group stage exits. His high-pressing, possession-based style perfectly suits Germany's talented attacking midfielders.", fifaRank: 10, worldCupTitles: 4,
        bestFinish: "Winners (1954, 1974, 1990, 2014)",
        keyPlayers: [
            { name: "Jamal Musiala", position: "Midfielder", number: 10, club: "Bayern Munich", image: "assets/players/jamal_musiala.jpg" },
            { name: "Florian Wirtz", position: "Attacker", number: 10, club: "Bayer Leverkusen", image: "assets/players/florian_wirtz.jpg" },
            { name: "Joshua Kimmich", position: "Midfielder", number: 6, club: "Bayern Munich", image: "assets/players/joshua_kimmich.jpg" }
        ],
        facts: "Germany's four World Cup titles are more than any European nation, but back-to-back group stage exits in 2018 and 2022 shook the foundation. Nagelsmann has rebuilt around the dazzling Musiala-Wirtz axis, bringing youthful energy and attacking flair. If the defense holds, Die Mannschaft could be dark horse contenders."
    },
    "Spain": {
        code: "es", confederation: "europe", confName: "UEFA",
        colors: ["#aa151b", "#f1bf00"],
        folder: "team profile/spain",
        cover: "fifa-world-cup-2026-spain-team-images.jpg.jpg",
        coach: "Luis de la Fuente", coachNationality: "Spain", coachAge: 64, coachImage: "assets/coaches/luis_de_la_fuente.jpg", coachBio: "Led Spain to Euro 2024 glory, continuing the nation's renaissance with a blend of tiki-taka heritage and direct attacking play. His youth development record at the Spanish federation produced talents like Yamal and Pedri.", fifaRank: 3, worldCupTitles: 1,
        bestFinish: "Winners (2010)",
        keyPlayers: [
            { name: "Rodri", position: "Midfielder", number: 16, club: "Man City", image: "assets/players/rodri.jpg" },
            { name: "Lamine Yamal", position: "Winger", number: 19, club: "Barcelona", image: "assets/players/lamine_yamal.jpg" },
            { name: "Pedri", position: "Midfielder", number: 8, club: "Barcelona", image: "assets/players/pedri.jpg" }
        ],
        facts: "Euro 2024 champions Spain are back to their dominant best with a new generation of superstars. Teenage sensation Lamine Yamal and midfield maestro Rodri anchor a side that blends tiki-taka heritage with direct attacking speed. La Roja proved in Germany that they can win tournaments again - they'll be feared in 2026."
    },
    "Portugal": {
        code: "pt", confederation: "europe", confName: "UEFA",
        colors: ["#006600", "#ff0000"],
        folder: "team profile/portugal",
        cover: "fifa-world-cup-2026-portugal-team-images.jpg.jpg",
        coach: "Roberto Martínez", coachNationality: "Spain", coachAge: 52, coachImage: "assets/coaches/roberto_martinez.jpg", coachBio: "Transformed Belgium from underachievers into world number one, reaching the 2018 World Cup semi-finals. The Spanish tactician's attacking philosophy and man-management skills have reinvigorated Portugal's golden generation.", fifaRank: 6, worldCupTitles: 0,
        bestFinish: "Third Place (1966)",
        keyPlayers: [
            { name: "Cristiano Ronaldo", position: "Forward", number: 7, club: "Al-Nassr", image: "assets/players/cristiano_ronaldo.jpg" },
            { name: "Bruno Fernandes", position: "Midfielder", number: 8, club: "Man United", image: "assets/players/bruno_fernandes.jpg" },
            { name: "Bernardo Silva", position: "Midfielder", number: 10, club: "Man City", image: "assets/players/bernardo_silva.jpg" }
        ],
        facts: "Portugal boast one of the deepest squads in world football with Bruno Fernandes, Bernardo Silva and a generational midfield. Cristiano Ronaldo, now 41, could make a record sixth World Cup appearance as a supersub. Their technical quality is undeniable - the question is whether they can finally translate it into a deep knockout run."
    },
    "Netherlands": {
        code: "nl", confederation: "europe", confName: "UEFA",
        colors: ["#ae1c28", "#fff"],
        folder: "team profile/netherlands",
        cover: "fifa-world-cup-2026-netherlands-team-images.jpg.jpg",
        coach: "Ronald Koeman", coachNationality: "Netherlands", coachAge: 63, coachImage: "assets/coaches/ronald_koeman.webp", coachBio: "The Barcelona legend returned to manage the Netherlands after their 2022 World Cup quarter-final run. His tactical flexibility and ability to integrate young talent with experienced stars makes the Oranje genuine contenders.", fifaRank: 7, worldCupTitles: 0,
        bestFinish: "Runners-up (1974, 1978, 2010)",
        keyPlayers: [
            { name: "Virgil van Dijk", position: "Defender", number: 4, club: "Liverpool", image: "assets/players/virgil_van_dijk.jpg" },
            { name: "Memphis Depay", position: "Forward", number: 10, club: "Atlético Madrid", image: "assets/players/memphis_depay.jpg" },
            { name: "Frenkie de Jong", position: "Midfielder", number: 21, club: "Barcelona", image: "assets/players/frankie_de_jong.jpg" }
        ],
        facts: "The Oranje have reached three World Cup finals (1974, 1978, 2010) without ever lifting the trophy - football's greatest heartbreak. Van Dijk marshals a solid defense while Frenkie de Jong controls the tempo from midfield. Koeman's tactical flexibility gives them a real shot at finally ending the curse."
    },
    "Belgium": {
        code: "be", confederation: "europe", confName: "UEFA",
        colors: ["#000", "#fdda24"],
        folder: "team profile/belgium",
        cover: "fifa-world-cup-2026-belgium-team-images.jpg.jpg",
        coach: "Domenico Tedesco", coachNationality: "Italy", coachAge: 40, coachImage: "assets/coaches/domenico_tedesco.webp", coachBio: "The Italian-born Belgian coach brought fresh energy to Belgium's aging golden generation with a high-pressing system. His youthful approach and tactical innovation have reinvigorated the Red Devils' campaign.", fifaRank: 5, worldCupTitles: 0,
        bestFinish: "Third Place (2018)",
        keyPlayers: [
            { name: "Kevin De Bruyne", position: "Midfielder", number: 17, club: "Man City", image: "assets/players/kevin_de_bruyne.jpg" },
            { name: "Romelu Lukaku", position: "Striker", number: 10, club: "Napoli", image: "assets/players/romelu_lukaku.jpg" },
            { name: "Jérémy Doku", position: "Winger", number: 11, club: "Man City", image: "assets/players/jeremy_doku.jpg" }
        ],
        facts: "Belgium's golden generation is aging out, but the core of De Bruyne, Lukaku and Doku still carries world-class quality. Tedesco has injected fresh energy into a squad that finished third in 2018. With Red Devils facing their final dance, expect an emotional push to finally deliver on their immense potential."
    },
    "Croatia": {
        code: "hr", confederation: "europe", confName: "UEFA",
        colors: ["#ff0000", "#fff"],
        folder: "team profile/croatia",
        cover: "fifa-world-cup-2026-croatia-team-images.jpg.jpg",
        coach: "Zlatko Dalić", coachNationality: "Croatia", coachAge: 59, coachImage: "assets/coaches/zlatko_dalic.webp", coachBio: "Masterminded Croatia's incredible run to the 2018 World Cup final and 2022 semi-final with a small nation of just 4 million people. His ability to get the absolute maximum from veteran midfielders like Modrić is unmatched.", fifaRank: 12, worldCupTitles: 0,
        bestFinish: "Runners-up (2018)",
        keyPlayers: [
            { name: "Luka Modrić", position: "Midfielder", number: 10, club: "Real Madrid", image: "assets/players/luka_modric.jpg" },
            { name: "Joško Gvardiol", position: "Defender", number: 4, club: "Man City", image: "assets/players/josko_gvardiol.jpg" },
            { name: "Mateo Kovačić", position: "Midfielder", number: 8, club: "Man City", image: "assets/players/mateo_kovacic.jpg" }
        ],
        facts: "Croatia are tournament royalty - reaching the 2018 final and 2022 semi-finals with a population of just 4 million. Luka Modric, now 40, may make one final World Cup bow before passing the torch to Gvardiol and Kovačić. Their midfield intelligence and big-game mentality make them dangerous for anyone."
    },
    "Switzerland": {
        code: "ch", confederation: "europe", confName: "UEFA",
        colors: ["#ff0000", "#fff"],
        folder: "team profile/switzerland",
        cover: "fifa-world-cup-2026-switzerland-team-images.jpg.jpg",
        coach: "Murat Yakın", coachNationality: "Switzerland", coachAge: 51, coachImage: "assets/coaches/murat_yakin.webp", coachBio: "The Swiss-Turkish coach has maintained Switzerland's remarkable consistency at major tournaments, reaching the knockout stage in every World Cup since 2006. His disciplined tactical approach makes the Swiss incredibly difficult to break down.", fifaRank: 15, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (1954)",
        keyPlayers: [
            { name: "Granit Xhaka", position: "Midfielder", number: 10, club: "Bayer Leverkusen", image: "assets/players/granit_xhaka.jpg" },
            { name: "Xherdan Shaqiri", position: "Winger", number: 23, club: "Chicago Fire", image: "assets/players/xherdan_shaqiri.jpg" },
            { name: "Manuel Neuer", position: "Goalkeeper", number: 1, club: "Bayern Munich", image: "assets/players/manuel_neuer.jpg" }
        ],
        facts: "Switzerland are the ultimate tournament gatekeepers - they've reached the knockout stage in every World Cup since 2006. Xhaka brings Arsenal-winning leadership while Shaqiri delivers magical moments when it matters most. Organized, disciplined and nearly impossible to break down, they're every favorite's nightmare matchup."
    },
    "Austria": {
        code: "at", confederation: "europe", confName: "UEFA",
        colors: ["#ed2939", "#fff"],
        folder: "team profile/austria",
        cover: "fifa-world-cup-2026-austria-team-images.jpg.jpg",
        coach: "Ralf Rangnick", coachNationality: "Germany", coachAge: 67, coachImage: "assets/coaches/ralf_rangnick.webp", coachBio: "The godfather of the German pressing revolution, Rangnick transformed Austria into one of Europe's most exciting teams. His high-intensity tactical system has produced some of the most entertaining football in Euro 2024 qualifying.", fifaRank: 22, worldCupTitles: 0,
        bestFinish: "Third Place (1954)",
        keyPlayers: [
            { name: "David Alaba", position: "Defender", number: 4, club: "Real Madrid", image: "assets/players/david_alaba.jpg" },
            { name: "Marko Arnautović", position: "Forward", number: 7, club: "Bologna", image: "assets/players/marko_arnautovic.jpg" },
            { name: "Marcel Sabitzer", position: "Midfielder", number: 20, club: "Dortmund", image: "assets/players/marcel_sabitzer.jpg" }
        ],
        facts: "Austria are the dark horse pick of the tournament under pressing guru Ralf Rangnick. Alaba returns from injury to anchor a side that played some of the most exciting football in Euro 2024 qualifying. Their high-intensity style and tactical discipline could shock the big teams."
    },
    "Scotland": {
        code: "gb-sct", confederation: "europe", confName: "UEFA",
        colors: ["#003078", "#fff"],
        folder: "team profile/scotland",
        cover: "fifa-world-cup-2026-scotland-team-images.jpg.jpg",
        coach: "Steve Clarke", coachNationality: "Scotland", coachAge: 62, coachImage: "assets/coaches/steve_clarke.webp", coachBio: "Led Scotland to their first World Cup since 1998, ending a 22-year wait with a passionate qualifying campaign. The former Chelsea and Liverpool assistant manager brings pragmatic British coaching at its finest.", fifaRank: 33, worldCupTitles: 0,
        bestFinish: "Group Stage (1958, 1974, 1978, 1982, 1986, 1998)",
        keyPlayers: [
            { name: "Andrew Robertson", position: "Defender", number: 3, club: "Liverpool", image: "assets/players/andrew_robertson.jpg" },
            { name: "Scott McTominay", position: "Midfielder", number: 4, club: "Napoli", image: "assets/players/scott_mctominay.jpg" },
            { name: "John McGinn", position: "Midfielder", number: 7, club: "Aston Villa", image: "assets/players/john_mcginn.jpg" }
        ],
        facts: "Scotland qualified through a thrilling campaign, riding the energy of Robertson's leadership and McTominay's goals from midfield. The Tartan Army are making their first World Cup since 1998 and will bring incredible noise. Physical, passionate and dangerous from set pieces, they could be this tournament's feel-good story."
    },
    "Norway": {
        code: "no", confederation: "europe", confName: "UEFA",
        colors: ["#ba0c2f", "#fff"],
        folder: "team profile/norway",
        cover: "fifa-world-cup-2026-norway-team-images.jpg.jpg",
        coach: "Ståle Solbakken", coachNationality: "Norway", coachAge: 58, coachImage: "assets/coaches/stale_solbakken.webp", coachBio: "The former Copenhagen boss finally delivered Norway's first World Cup since 1998 by building the team around Haaland and Ødegaard. His Scandinavian tactical discipline combined with attacking freedom produces results.", fifaRank: 25, worldCupTitles: 0,
        bestFinish: "Round of 16 (1998)",
        keyPlayers: [
            { name: "Erling Haaland", position: "Striker", number: 9, club: "Man City", image: "assets/players/erling_haaland.jpg" },
            { name: "Martin Ødegaard", position: "Midfielder", number: 10, club: "Arsenal", image: "assets/players/martin_odegaard.jpg" },
            { name: "Alexander Sørloth", position: "Forward", number: 11, club: "Atlético Madrid", image: "assets/players/alexander_sorloth.jpg" }
        ],
        facts: "Norway finally qualified for the World Cup with the two best players in the Premier League: Erling Haaland and Martin Odegaard. This is a nation that hasn't been at a World Cup since 1998, and the excitement is enormous. If Haaland stays fit, Norway could be the tournament's most dangerous dark horse."
    },
    "Sweden": {
        code: "se", confederation: "europe", confName: "UEFA",
        colors: ["#006aa7", "#fecc02"],
        folder: "team profile/sweden",
        cover: "fifa-world-cup-2026-sweden-team-images.jpg.jpg",
        coach: "Janne Andersson", coachNationality: "Sweden", coachAge: 64, coachImage: "assets/coaches/janne_andersson.webp", coachBio: "Known for his structured 4-4-2 system, Andersson led Sweden to the 2018 World Cup quarter-finals. His pragmatic approach maximizes Sweden's collective strength over individual brilliance.", fifaRank: 32, worldCupTitles: 0,
        bestFinish: "Runners-up (1958)",
        keyPlayers: [
            { name: "Alexander Isak", position: "Striker", number: 9, club: "Newcastle", image: "assets/players/alexander_isak.jpg" },
            { name: "Dejan Kulusevski", position: "Winger", number: 11, club: "Tottenham", image: "assets/players/dejan_kulusevski.jpg" },
            { name: "Emil Forsberg", position: "Midfielder", number: 10, club: "New York RB", image: "assets/players/emil_forsberg.jpg" }
        ],
        facts: "Sweden return to the World Cup with Alexander Isak emerging as one of Europe's deadliest strikers at Newcastle. Kulusevski provides flair from the wing while Forsberg brings tournament experience. The Blågult play organized, physical football that has historically troubled bigger nations."
    },
    "Czechia": {
        code: "cz", confederation: "europe", confName: "UEFA",
        colors: ["#11457e", "#fff"],
        folder: "team profile/czechia",
        cover: "fifa-world-cup-2026-Czechia-team-images.jpg.jpg",
        coach: "Ivan Hašek", coachNationality: "Czechia", coachAge: 62, coachImage: "assets/coaches/ivan_hasek.webp", coachBio: "The Czech football legend returned to revive the national team's fortunes after years of decline. His experience as both a player and manager brings credibility and tactical nous to a squad with rich heritage.", fifaRank: 30, worldCupTitles: 0,
        bestFinish: "Semi-Finals (1934, 1962)",
        keyPlayers: [
            { name: "Patrik Schick", position: "Striker", number: 10, club: "Bayer Leverkusen", image: "assets/players/patrik_schick.jpg" },
            { name: "Tomáš Souček", position: "Midfielder", number: 22, club: "West Ham", image: "assets/players/tomas_soucek.jpg" },
            { name: "Antonín Barák", position: "Midfielder", number: 8, club: "Fiorentina", image: "assets/players/antonin_barak.jpg" }
        ],
        facts: "Czechia carry the rich footballing heritage of Czechoslovakia's 1962 World Cup final appearance. Patrik Schick's Euro 2020 halfway-line goal showed this nation can produce moments of pure magic. Physical, set-piece dangerous and tactically organized, they could surprise teams that underestimate them."
    },
    "Bosnia and Herzegovina": {
        code: "ba", confederation: "europe", confName: "UEFA",
        colors: ["#002395", "#fdb913"],
        folder: "team profile/bosnia",
        cover: "fifa-world-cup-2026-Bosnia-and-Herzegovina-team-images.jpg.jpg",
        coach: "Sav Milošević", coachNationality: "Serbia", coachAge: 52, coachImage: "assets/coaches/sav_milosevic.webp", coachBio: "The former Aston Villa and Parma striker took charge of Bosnia during a turbulent period and delivered World Cup qualification. His passionate leadership and attacking mentality have reinvigorated the national team.", fifaRank: 55, worldCupTitles: 0,
        bestFinish: "Group Stage (2014)",
        keyPlayers: [
            { name: "Edin Džeko", position: "Forward", number: 11, club: "Fenerbahçe", image: "assets/players/edin_dzeko.jpg" },
            { name: "Miralem Pjanić", position: "Midfielder", number: 8, club: "Sharjah", image: "assets/players/miralem_pjanic.jpg" },
            { name: "Rade Krunić", position: "Midfielder", number: 15, club: "AC Milan", image: "assets/players/rade_krunic.jpg" }
        ],
        facts: "Bosnia's second-ever World Cup appearance is built around the legendary Edin Dzeko, who at 40 could be playing his final tournament. Pjanic still pulls the strings from midfield with world-class passing range. For a nation torn by conflict in recent decades, this team represents hope and unity through football."
    },
    "Türkiye": {
        code: "tr", confederation: "europe", confName: "UEFA",
        colors: ["#e30a17", "#fff"],
        folder: "team profile/turkey",
        cover: "fifa-world-cup-2026-turkey-team-images.jpg.jpg",
        coach: "Vincenzo Montella", coachNationality: "Italy", coachAge: 51, coachImage: "assets/coaches/vincenzo_montella.webp", coachBio: "The Italian coach guided Turkey to the Euro 2024 semi-finals, their best tournament performance since 2002. His attacking philosophy perfectly suits Turkey's explosive young talent including Arda Güler.", fifaRank: 26, worldCupTitles: 0,
        bestFinish: "Third Place (2002)",
        keyPlayers: [
            { name: "Arda Güler", position: "Midfielder", number: 10, club: "Real Madrid", image: "assets/players/arda_guler.jpg" },
            { name: "Hakan Çalhanoğlu", position: "Midfielder", number: 8, club: "Inter Milan", image: "assets/players/hakan_calhanoglu.jpg" },
            { name: "Kenan Yıldız", position: "Winger", number: 11, club: "Juventus", image: "assets/players/kenan_yildiz.jpg" }
        ],
        facts: "Turkey's new golden generation is led by Real Madrid wonderkid Arda Guler and Inter Milan's Hakan Calhanoglu. They finished third at Euro 2024, announcing themselves as a serious force. With explosive young talent across every position, the Crescent Stars could go deep on American soil."
    },
    "Brazil": {
        code: "br", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#009c3b", "#ffdf00"],
        folder: "team profile/brazil",
        cover: "fifa-world-cup-2026-brazil-team-images.jpg.jpg",
        coach: "Carlo Ancelotti", coachNationality: "Italy", coachAge: 66, coachImage: "assets/coaches/carlo_ancelotti.webp", coachBio: "The most decorated club manager in history with five Champions League titles, Ancelotti made history by winning La Liga in his first season at Real Madrid. His calm man-management and tactical genius now aim to restore Brazil to World Cup glory.", fifaRank: 5, worldCupTitles: 5,
        bestFinish: "Winners (1958, 1962, 1970, 1994, 2002)",
        keyPlayers: [
            { name: "Vinicius Jr.", position: "Winger", number: 7, club: "Real Madrid", image: "assets/players/vinicius_junior.jpg" },
            { name: "Rodrygo", position: "Forward", number: 10, club: "Real Madrid", image: "assets/players/rodrygo.jpg" },
            { name: "Endrick", position: "Forward", number: 9, club: "Real Madrid", image: "assets/players/endrick.jpg" }
        ],
        facts: "Brazil's record five World Cup titles make them the most decorated nation in history, but they haven't won since 2002. Carlo Ancelotti brings European tactical discipline to a squad brimming with Real Madrid flair through Vinicius Jr and Rodrygo. The Selecao's attacking firepower is unmatched, and 18-year-old Endrick could be the breakout star of the tournament."
    },
    "Argentina": {
        code: "ar", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#74acdf", "#f6b40e"],
        folder: "team profile/argentina",
        cover: "fifa-world-cup-2026-argentina-team-images.jpg.jpg",
        coach: "Lionel Scaloni", coachNationality: "Argentina", coachAge: 47, coachImage: "assets/coaches/lionel_scaloni.jpg", coachBio: "The unheralded assistant manager who became Argentina's World Cup-winning coach in 2022, ending a 36-year wait. His tactical flexibility and ability to build an unbreakable team spirit around Messi's genius was the key to their triumph.", fifaRank: 1, worldCupTitles: 3,
        bestFinish: "Winners (1978, 1986, 2022)",
        keyPlayers: [
            { name: "Lionel Messi", position: "Forward", number: 10, club: "Inter Miami", image: "assets/players/lionel_messi.jpg" },
            { name: "Julián Álvarez", position: "Forward", number: 9, club: "Atlético Madrid", image: "assets/players/julian_alvarez.jpg" },
            { name: "Enzo Fernández", position: "Midfielder", number: 11, club: "Chelsea", image: "assets/players/enzo_fernandez.jpg" }
        ],
        facts: "Argentina arrive as defending champions with Lionel Messi potentially playing his final World Cup at age 39. Scaloni's side won the 2022 title with heart, tactical flexibility and that unbreakable team spirit. With Alvarez, Enzo Fernandez and a squad built around collective sacrifice, La Albicelepe are desperate to make it three."
    },
    "Uruguay": {
        code: "uy", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#5b9fae", "#fff"],
        folder: "team profile/uruguay",
        cover: "fifa-world-cup-2026-uruguay-team-images.jpg.jpg",
        coach: "Marcelo Bielsa", coachNationality: "Argentina", coachAge: 70, coachImage: "assets/coaches/marcelo_bielsa.jpg", coachBio: "The legendary Argentine tactician's intense pressing and man-marking system has transformed Uruguay into one of South America's most formidable teams. The 70-year-old's obsessive attention to detail and attacking philosophy produce breathtaking football.", fifaRank: 11, worldCupTitles: 2,
        bestFinish: "Winners (1930, 1950)",
        keyPlayers: [
            { name: "Federico Valverde", position: "Midfielder", number: 15, club: "Real Madrid", image: "assets/players/federico_valverde.jpg" },
            { name: "Ronald Araújo", position: "Defender", number: 4, club: "Barcelona", image: "assets/players/ronald_araujo.jpg" },
            { name: "Darwin Núñez", position: "Forward", number: 9, club: "Liverpool", image: "assets/players/darwin_nunez.jpg" }
        ],
        facts: "Uruguay are two-time champions with a squad that blends Bielsa's intense pressing philosophy with genuine star power. Valverde is one of the world's most complete midfielders while Darwin Nunez brings explosive goal-scoring threat. La Celeste have the physical edge and tactical intensity to upset anyone on their day."
    },
    "Colombia": {
        code: "co", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#fcd116", "#003893"],
        folder: "team profile/colombia",
        cover: "fifa-world-cup-2026-colombia-team-images.jpg.jpg",
        coach: "Néstor Lorenzo", coachNationality: "Argentina", coachAge: 60, coachImage: "assets/coaches/nestor_lorenzo.jpg", coachBio: "The former Argentine footballer brought stability and tactical organization to a Colombia squad brimming with talent. His pragmatic South American style blends defensive solidity with creative attacking play.", fifaRank: 9, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (2014)",
        keyPlayers: [
            { name: "James Rodríguez", position: "Midfielder", number: 10, club: "León", image: "assets/players/james_rodriguez.jpg" },
            { name: "Luis Díaz", position: "Winger", number: 11, club: "Liverpool", image: "assets/players/luis_diaz.jpg" },
            { name: "Juan Cuadrado", position: "Midfielder", number: 7, club: "Internacional", image: "assets/players/juan_cuadrado.jpg" }
        ],
        facts: "Colombia are on a historic winning streak and enter the tournament as genuine dark horses. James Rodriguez returns for one last dance alongside Liverpool winger Luis Diaz, whose pace terrifies defenses. After their magical 2014 run to the quarter-finals, Los Cafeteros believe this could be their year to go even further."
    },
    "Ecuador": {
        code: "ec", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#fd0000", "#0033a0"],
        folder: "team profile/ecuador",
        cover: "fifa-world-cup-2026-ecuador-team-images.jpg.jpg",
        coach: "Sebastián Beccacece", coachNationality: "Argentina", coachAge: 55, coachImage: "assets/coaches/sebastian_beccacece.jpg", coachBio: "The Argentine coach earned Ecuador qualification through a disciplined defensive structure and clinical counter-attacking. His tactical organization has made La Tri difficult to beat while maximizing their attacking transitions.", fifaRank: 31, worldCupTitles: 0,
        bestFinish: "Round of 16 (2006)",
        keyPlayers: [
            { name: "Moisés Caicedo", position: "Midfielder", number: 20, club: "Chelsea", image: "assets/players/moises_caicedo.jpg" },
            { name: "Enner Valencia", position: "Forward", number: 13, club: "Internacional", image: "assets/players/enner_valencia.jpg" },
            { name: "Pervis Estupiñán", position: "Defender", number: 3, club: "Brighton", image: "assets/players/pervis_estupinan.jpg" }
        ],
        facts: "Ecuador's young core is built around Chelsea destroyer Moises Caicedo and the electric Pervis Estupinan at left-back. They shocked Argentina on the opening day of Qatar 2022 and fear nobody. Athletic, aggressive and well-drilled, La Tri could be the tournament's most exciting young team."
    },
    "Paraguay": {
        code: "py", confederation: "south-america", confName: "CONMEBOL",
        colors: ["#d52b1e", "#0038a8"],
        folder: "team profile/paraguay",
        cover: "fifa-world-cup-2026-paraguay-team-images.jpg.jpg",
        coach: "Gustavo Alfaro", coachNationality: "Argentina", coachAge: 63, coachImage: "assets/coaches/gustavo_alfaro.jpg", coachBio: "The experienced Argentine manager delivered Paraguay's World Cup qualification with a blend of South American grit and tactical intelligence. His ability to organize defensively while extracting creativity from Almirón was key.", fifaRank: 50, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (2010)",
        keyPlayers: [
            { name: "Miguel Almirón", position: "Midfielder", number: 10, club: "Newcastle", image: "assets/players/miguel_almiron.jpg" },
            { name: "Antonio Sanabria", position: "Forward", number: 9, club: "Torino", image: "assets/players/antonio_sanabria.jpg" },
            { name: "Mathías Villasanti", position: "Midfielder", number: 14, club: "Grêmio", image: "assets/players/mathias_villasanti.jpg" }
        ],
        facts: "Paraguay return to the World Cup after missing 2022, with Miguel Almirón pulling the strings from midfield. Known for their combative, never-say-die attitude, La Albirroja have a history of frustrating bigger nations. Compact, organized and dangerous on the counter, they're built for tournament football."
    },
    "Japan": {
        code: "jp", confederation: "asia", confName: "AFC",
        colors: ["#bc002d", "#fff"],
        folder: "team profile/japan",
        cover: "fifa-world-cup-2026-japan-team-images.jpg.jpg",
        coach: "Hajime Moriyasu", coachNationality: "Japan", coachAge: 57, coachImage: "assets/coaches/hajime_moriyasu.jpg", coachBio: "The former Japan international has developed the Blue Samurai into genuine World Cup contenders, beating Germany and Spain in 2022. His tactical flexibility and fearless approach against bigger nations defines Japan's modern identity.", fifaRank: 18, worldCupTitles: 0,
        bestFinish: "Round of 16 (2002, 2010, 2018, 2022)",
        keyPlayers: [
            { name: "Kaoru Mitoma", position: "Winger", number: 9, club: "Brighton", image: "assets/players/kaoru_mitoma.jpg" },
            { name: "Takefusa Kubo", position: "Winger", number: 11, club: "Real Sociedad", image: "assets/players/takefusa_kubo.jpg" },
            { name: "Wataru Endo", position: "Midfielder", number: 3, club: "Liverpool", image: "assets/players/wataru_endo.jpg" }
        ],
        facts: "Japan have beaten Germany and Spain in recent World Cups and are now genuine contenders to reach the quarter-finals for the first time. Mitoma's dribbling, Kubo's creativity and Endo's midfield steel give them a complete toolkit. Blue Samurai's tactical flexibility and fearless mentality make them the team nobody wants to face."
    },
    "South Korea": {
        code: "kr", confederation: "asia", confName: "AFC",
        colors: ["#003478", "#c60c30"],
        folder: "team profile/south korea",
        cover: "fifa-world-cup-2026-south-korea-team-images.jpg.jpg",
        coach: "Jürgen Klinsmann", coachNationality: "Germany", coachAge: 61, coachImage: "assets/coaches/jurgen_klinsmann.jpg", coachBio: "The 2006 World Cup-winning Germany coach and former Tottenham and USA manager brings international tournament pedigree to South Korea. His motivational skills and attacking philosophy suit the Taegeuk Warriors' fast, technical players.", fifaRank: 23, worldCupTitles: 0,
        bestFinish: "Fourth Place (2002)",
        keyPlayers: [
            { name: "Son Heung-min", position: "Forward", number: 7, club: "Tottenham", image: "assets/players/son_heung_min.jpg" },
            { name: "Lee Kang-in", position: "Midfielder", number: 18, club: "PSG", image: "assets/players/lee_kang_in.jpg" },
            { name: "Hwang Hee-chan", position: "Forward", number: 11, club: "Wolves", image: "assets/players/hwang_hee_chan.jpg" }
        ],
        facts: "South Korea's 2002 semi-final run remains Asia's greatest World Cup achievement, and this generation wants to write the next chapter. Son Heung-min is one of the Premier League's elite attackers, while Lee Kang-in adds Paris Saint-Germain quality. Fast, technical and dangerous in transition, the Taegeuk Warriors can beat anyone on their day."
    },
    "Australia": {
        code: "au", confederation: "asia", confName: "AFC",
        colors: ["#00843d", "#fff"],
        folder: "team profile/australia",
        cover: "fifa-world-cup-2026-australia-team-images.jpg.jpg",
        coach: "Tony Popovic", coachNationality: "Australia", coachAge: 52, coachImage: "assets/coaches/tony_popovic.jpg", coachBio: "The former Crystal Palace defender has built Australia's identity around defensive solidity, set pieces and physical presence. His no-nonsense approach maximizes the Socceroos' collective strength and tournament experience.", fifaRank: 24, worldCupTitles: 0,
        bestFinish: "Round of 16 (2006, 2022)",
        keyPlayers: [
            { name: "Mathew Leckie", position: "Forward", number: 7, club: "Melbourne City", image: "assets/players/mathew_leckie.jpg" },
            { name: "Jackson Irvine", position: "Midfielder", number: 22, club: "St. Pauli", image: "assets/players/jackson_irvine.jpg" },
            { name: "Harry Souttar", position: "Defender", number: 2, club: "Leicester", image: "assets/players/harry_souttar.jpg" }
        ],
        facts: "The Socceroos have qualified for six consecutive World Cups and reached the knockout stage in 2006 and 2022. Under Popovic, they play direct, physical football built around set pieces and defensive solidity. Leckie remains their talisman and Harry Souttar's aerial presence makes them dangerous from every dead ball."
    },
    "IR Iran": {
        code: "ir", confederation: "asia", confName: "AFC",
        colors: ["#239f40", "#da0000"],
        folder: "team profile/iran",
        cover: "fifa-world-cup-2026-iran-team-images.jpg.jpg",
        coach: "Amir Ghalenoei", coachNationality: "Iran", coachAge: 63, coachImage: "assets/coaches/amir_ghalenoei.jpg", coachBio: "One of Iran's most experienced coaches, Ghalenoei returned for a second stint to deliver World Cup qualification with tactical discipline. His pragmatic defensive approach has produced famous results against top nations.", fifaRank: 20, worldCupTitles: 0,
        bestFinish: "Group Stage (1978, 1998, 2006, 2014, 2018, 2022)",
        keyPlayers: [
            { name: "Mehdi Taremi", position: "Forward", number: 9, club: "Inter Milan", image: "assets/players/mehdi_taremi.jpg" },
            { name: "Sardar Azmoun", position: "Forward", number: 17, club: "Shabab Al Ahli", image: "assets/players/sardar_azmoun.jpg" },
            { name: "Alireza Jahanbakhsh", position: "Winger", number: 7, club: "Heerenveen", image: "assets/players/alireza_jahanbakhsh.jpg" }
        ],
        facts: "Iran have qualified for their seventh World Cup and always prove difficult to break down. Taremi's goalscoring instinct at Inter Milan gives them a genuine cutting edge they've often lacked. Team Melli's disciplined defensive structure and counter-attacking ability have produced famous results against Portugal and Argentina."
    },
    "Saudi Arabia": {
        code: "sa", confederation: "asia", confName: "AFC",
        colors: ["#006c35", "#fff"],
        folder: "team profile/saudi arabia",
        cover: "fifa-world-cup-2026-saudi-arabia-team-images.jpg.jpg",
        coach: "Roberto Mancini", coachNationality: "Italy", coachAge: 61, coachImage: "assets/coaches/roberto_mancini.webp", coachBio: "The Euro 2020-winning Italy coach brought prestige and tactical expertise to Saudi Arabia after a transformative spell in the Saudi Pro League. His attacking philosophy and European experience elevate the entire national team program.", fifaRank: 42, worldCupTitles: 0,
        bestFinish: "Round of 16 (1994)",
        keyPlayers: [
            { name: "Salem Al-Dawsari", position: "Midfielder", number: 10, club: "Al-Hilal", image: "assets/players/salem_al_dawsari.jpg" },
            { name: "Neymar", position: "Forward", number: 10, club: "Al-Hilal", image: "assets/players/neymar.jpg" },
            { name: "Salman Al-Faraj", position: "Midfielder", number: 7, club: "Al-Hilal", image: "assets/players/salman_al_faraj.jpg" }
        ],
        facts: "Saudi Arabia shocked the world by beating Argentina in Qatar 2022 - proof they can compete with anyone on the biggest stage. Under Roberto Mancini, they've signed some of football's biggest names to the Saudi Pro League, raising the level of the entire national team. Al-Dawsari's wonder goal in 2022 showed the flair this team possesses."
    },
    "Qatar": {
        code: "qa", confederation: "asia", confName: "AFC",
        colors: ["#8d1b3d", "#fff"],
        folder: "team profile/qatar",
        cover: "fifa-world-cup-2026-qatar-team-images.jpg.jpg",
        coach: "Bruno Pinheiro", coachNationality: "Portugal", coachAge: 47, coachImage: "assets/coaches/bruno_pinheiro.webp", coachBio: "The Portuguese coach guided Qatar to the 2023 Asian Cup title, transforming them from World Cup 2022 disappointment into Asian champions. His possession-based system and youth development has given Qatar genuine confidence.", fifaRank: 34, worldCupTitles: 0,
        bestFinish: "Group Stage (2022)",
        keyPlayers: [
            { name: "Akram Afif", position: "Forward", number: 11, club: "Al-Sadd", image: "assets/players/akram_afif.jpg" },
            { name: "Almoez Ali", position: "Forward", number: 19, club: "Al-Duhail", image: "assets/players/almoez_ali.jpg" },
            { name: "Hassan Al-Haydos", position: "Midfielder", number: 10, club: "Al-Sadd", image: "assets/players/hassan_al_haydos.jpg" }
        ],
        facts: "Qatar are the 2023 Asian Cup champions and arrive with genuine confidence after a disappointing home World Cup in 2022. Akram Afif won the Asian Cup Golden Ball and is one of Asia's most creative players. The Maroon Whites have matured significantly and are determined to prove 2022 was a learning experience, not their peak."
    },
    "Iraq": {
        code: "iq", confederation: "asia", confName: "AFC",
        colors: ["#ce1126", "#000"],
        folder: "team profile/iraq",
        cover: "fifa-world-cup-2026-iraq-team-images.jpg.jpg",
        coach: "Jesús Casas", coachNationality: "Spain", coachAge: 52, coachImage: "assets/coaches/jesus_casas.webp", coachBio: "The Spanish coach delivered Iraq's first World Cup since 1986, ending a 40-year wait with passionate qualification campaign. His tactical organization and ability to unite a nation through football made him a national hero.", fifaRank: 55, worldCupTitles: 0,
        bestFinish: "Group Stage (1986)",
        keyPlayers: [
            { name: "Aymen Hussein", position: "Forward", number: 9, club: "Al-Quwa Al-Jawiya", image: "assets/players/aymen_hussein.jpg" },
            { name: "Mohannad Ali", position: "Forward", number: 18, club: "Al-Shorta", image: "assets/players/mohannad_ali.jpg" },
            { name: "Ali Adnan", position: "Defender", number: 3, club: "Mes Kerman", image: "assets/players/ali_adnan.jpg" }
        ],
        facts: "Iraq's only previous World Cup was in 1986, making this qualification a moment of national celebration. Aymen Hussein is one of Asia's most prolific strikers and Ali Adnan provides European-level experience at left-back. Playing with pure emotion and pride, Iraq could be the tournament's most passionate representatives."
    },
    "Uzbekistan": {
        code: "uz", confederation: "asia", confName: "AFC",
        colors: ["#1eb53a", "#ce1126"],
        folder: "team profile/uzbekistan",
        cover: "fifa-world-cup-2026-uzbekistan-team-images.jpg.jpg",
        coach: "Srečko Katanec", coachNationality: "Slovenia", coachAge: 63, coachImage: "assets/coaches/srecko_katanec.webp", coachBio: "The Slovenian former international guided Uzbekistan to their first-ever World Cup, a historic achievement for Central Asian football. His European tactical experience combined with understanding of Asian football proved decisive.", fifaRank: 58, worldCupTitles: 0,
        bestFinish: "First World Cup",
        keyPlayers: [
            { name: "Eldor Shomurodov", position: "Forward", number: 9, club: "Cagliari", image: "assets/players/eldor_shomurodov.jpg" },
            { name: "Odiljon Hamrobekov", position: "Midfielder", number: 22, club: "FC Bunyodkor", image: "assets/players/odiljon_hamrobekov.jpg" },
            { name: "Jaloliddin Masharipov", position: "Winger", number: 7, club: "Pakhtakor", image: "assets/players/jaloliddin_masharipov.jpg" }
        ],
        facts: "Uzbekistan are making their first-ever World Cup appearance, a historic milestone for Central Asian football. Eldor Shomurodov at Cagliari provides Serie A quality while the squad is built on tireless energy and organization. Playing with nothing to lose, the White Wolves could surprise teams who underestimate their determination."
    },
    "Jordan": {
        code: "jo", confederation: "asia", confName: "AFC",
        colors: ["#ce1126", "#000"],
        folder: "team profile/jordan",
        cover: "fifa-world-cup-2026-jordan-team-images.jpg.jpg",
        coach: "Arnold Mechkatari", coachNationality: "Jordan", coachAge: 65, coachImage: "assets/coaches/arnold_mechkatari.webp", coachBio: "The experienced German-Jordanian coach delivered Jordan's first World Cup after their 2023 Asian Cup final run. His tactical discipline and ability to organize smaller nations against bigger opposition is well-documented.", fifaRank: 62, worldCupTitles: 0,
        bestFinish: "First World Cup",
        keyPlayers: [
            { name: "Musammar Al-Naimat", position: "Forward", number: 11, club: "Al-Ahli", image: "assets/players/musammar_al_naimat.jpg" },
            { name: "Yazan Al-Arab", position: "Defender", number: 3, club: "Al-Wehdat", image: "assets/players/yazan_al_arab.jpg" },
            { name: "Baha Abdel-Rahman", position: "Midfielder", number: 8, club: "Al-Faisaly", image: "assets/players/baha_abdel_rahman.jpg" }
        ],
        facts: "Jordan qualified for their first-ever World Cup after reaching the 2023 Asian Cup final, an incredible achievement for a nation of 11 million. Al-Naimat is a rising star in Asian football and Al-Arab anchors a well-organized defense. Under the guidance of veteran coach Mechkatari, the Reds will bring fearless energy to North America."
    },
    "Curaçao": {
        code: "cw", confederation: "asia", confName: "AFC",
        colors: ["#002b7f", "#ffd100"],
        folder: "team profile/curacao",
        cover: "fifa-world-cup-2026-curacao-team-images.jpg.jpg",
        coach: "Guus Hiddink", coachNationality: "Netherlands", coachAge: 79, coachImage: "assets/coaches/guus_hiddink.webp", coachBio: "The legendary Dutch coach, now 79, made history by guiding tiny Curaçao to their first-ever World Cup. His decades of international experience with Netherlands, South Korea, Australia and Russia proved invaluable.", fifaRank: 68, worldCupTitles: 0,
        bestFinish: "First World Cup",
        keyPlayers: [
            { name: "Vurnon Anita", position: "Midfielder", number: 8, club: "NEC", image: "assets/players/vurnon_anita.jpg" },
            { name: "Leandro Bacuna", position: "Midfielder", number: 6, club: "FC Groningen", image: "assets/players/leandro_bacuna.jpg" },
            { name: "Juninho Bacuna", position: "Midfielder", number: 10, club: "Royal Antwerp", image: "assets/players/juninho_bacuna.jpg" }
        ],
        facts: "Curacao are the smallest nation at the 2026 World Cup with just 150,000 people - yet they've booked their place on football's biggest stage. Legendary Dutch coach Guus Hiddink, now 79, is guiding them through their historic debut. The Bacuna brothers bring Eredivisie quality and the island's passion will be infectious."
    },
    "Morocco": {
        code: "ma", confederation: "africa", confName: "CAF",
        colors: ["#c1272d", "#006233"],
        folder: "team profile/morocco",
        cover: "fifa-world-cup-2026-morocco-team-images.jpg.jpg",
        coach: "Mohamed Ouahbi", coachNationality: "Morocco", coachAge: 48, coachImage: "assets/coaches/mohamed_ouahbi.webp", coachBio: "The Moroccan coach inherited the 2022 semi-final legacy and maintained Morocco's position as Africa's top-ranked team. His defensive organization and tactical discipline continued the Atlas Lions' remarkable upward trajectory.", fifaRank: 14, worldCupTitles: 0,
        bestFinish: "Fourth Place (2022)",
        keyPlayers: [
            { name: "Achraf Hakimi", position: "Defender", number: 2, club: "PSG", image: "assets/players/achraf_hakimi.jpg" },
            { name: "Yassine Bounou", position: "Goalkeeper", number: 1, club: "Al-Hilal", image: "assets/players/yassine_bounou.jpg" },
            { name: "Sofyan Amrabat", position: "Midfielder", number: 4, club: "Fenerbahçe", image: "assets/players/sofyan_amrabat.jpg" }
        ],
        facts: "Morocco made history in 2022 as the first African nation to reach a World Cup semi-final, beating Belgium, Spain and Portugal along the way. Hakimi's attacking runs from right-back and Bounou's goalkeeping heroics anchored a incredible defensive record. The Atlas Lions proved that African football belongs at the very top level."
    },
    "Senegal": {
        code: "sn", confederation: "africa", confName: "CAF",
        colors: ["#00853f", "#fdef42"],
        folder: "team profile/senegal",
        cover: "fifa-world-cup-2026-senegal-team-images.jpg.jpg",
        coach: "Aliou Cissé", coachNationality: "Senegal", coachAge: 50, coachImage: "assets/coaches/aliou_cisse.webp", coachBio: "The longest-serving African national team coach, Cissé has managed Senegal for over a decade with consistent results. His leadership through multiple World Cups and AFCON titles makes him the most experienced African coach.", fifaRank: 17, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (2002)",
        keyPlayers: [
            { name: "Sadio Mané", position: "Forward", number: 10, club: "Al-Nassr", image: "assets/players/sadio_mane.jpg" },
            { name: "Kalidou Koulibaly", position: "Defender", number: 3, club: "Al-Hilal", image: "assets/players/kalidou_koulibaly.jpg" },
            { name: "Ismaïla Sarr", position: "Winger", number: 7, club: "Marseille", image: "assets/players/ismaila_sarr.jpg" }
        ],
        facts: "Senegal are Africa's most consistent World Cup performers, reaching the quarter-finals in 2002 and knockout rounds in 2018 and 2022. Sadio Mane may be 34, but his pace and finishing remain world-class alongside Kalidou Koulibaly's defensive wall. The Lions of Teranga have the physical power and tournament experience to go deep."
    },
    "Tunisia": {
        code: "tn", confederation: "africa", confName: "CAF",
        colors: ["#ce1126", "#fff"],
        folder: "team profile/tunisia",
        cover: "fifa-world-cup-2026-tunisia-team-images.jpg.jpg",
        coach: "Jalel Kadri", coachNationality: "Tunisia", coachAge: 54, coachImage: "assets/coaches/jalel_kadri.webp", coachBio: "The Tunisian coach has maintained the Carthage Eagles' reputation as difficult tournament opponents with organized, disciplined football. His tactical structure maximizes Tunisia's collective strength over individual talent.", fifaRank: 35, worldCupTitles: 0,
        bestFinish: "Group Stage (1978, 1998, 2002, 2006, 2018, 2022)",
        keyPlayers: [
            { name: "Wahbi Khazri", position: "Forward", number: 10, club: "Montpellier", image: "assets/players/wahbi_khazri.jpg" },
            { name: "Ellyes Skhiri", position: "Midfielder", number: 13, club: "Eintracht Frankfurt", image: "assets/players/ellyes_skhiri.jpg" },
            { name: "Youssef Msakni", position: "Midfielder", number: 7, club: "Al-Arabi", image: "assets/players/youssef_msakni.jpg" }
        ],
        facts: "Tunisia have qualified for six World Cups but have never made it past the group stage - a record they're desperate to break. Khazri provides creative spark while Skhiri's Bundesliga engine room keeps the team ticking. The Carthage Eagles are compact, organized and capable of springing surprises against bigger opposition."
    },
    "Ghana": {
        code: "gh", confederation: "africa", confName: "CAF",
        colors: ["#006b3f", "#fcd116"],
        folder: "team profile/ghana",
        cover: "fifa-world-cup-2026-ghana-team-images.jpg.jpg",
        coach: "Chris Hughton", coachNationality: "Ghana", coachAge: 67, coachImage: "assets/coaches/chris_hughton.webp", coachBio: "The Irish-Ghanaian former Newcastle and Brighton manager brings Premier League experience to the Black Stars. His calm tactical approach and ability to develop young talent has reinvigorated Ghana's attacking potential.", fifaRank: 38, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (2010)",
        keyPlayers: [
            { name: "Mohammed Kudus", position: "Midfielder", number: 20, club: "West Ham", image: "assets/players/mohammed_kudus.jpg" },
            { name: "Thomas Partey", position: "Midfielder", number: 5, club: "Arsenal", image: "assets/players/thomas_partey.jpg" },
            { name: "Iñaki Williams", position: "Forward", number: 9, club: "Athletic Bilbao", image: "assets/players/inaki_williams.jpg" }
        ],
        facts: "Ghana reached the quarter-finals in 2010 and this generation led by Mohammed Kudus has the talent to match that achievement. Partey's midfield steel and Inaki Williams' tireless running give them a complete attacking arsenal. The Black Stars play with flair, passion and an unpredictable edge that makes them exciting to watch."
    },
    "Algeria": {
        code: "dz", confederation: "africa", confName: "CAF",
        colors: ["#006233", "#fff"],
        folder: "team profile/algeria",
        cover: "fifa-world-cup-2026-algeria-team-images.jpg.jpg",
        coach: "Vladimir Petković", coachNationality: "Switzerland", coachAge: 62, coachImage: "assets/coaches/vladimir_petkovic.webp", coachBio: "The Swiss-born coach led Algeria to the 2019 Africa Cup of Nations title and has maintained their competitive edge. His European tactical training combined with understanding of African football culture produces results.", fifaRank: 36, worldCupTitles: 0,
        bestFinish: "Group Stage (1982, 1986, 2010, 2014)",
        keyPlayers: [
            { name: "Riyad Mahrez", position: "Winger", number: 7, club: "Al-Ahli", image: "assets/players/riyad_mahrez.jpg" },
            { name: "Ismaël Bennacer", position: "Midfielder", number: 11, club: "AC Milan", image: "assets/players/ismael_bennacer.jpg" },
            { name: "Baghdad Bounedjah", position: "Forward", number: 9, club: "Al Sadd", image: "assets/players/baghdad_bounedjah.jpg" }
        ],
        facts: "Algeria won the 2019 Africa Cup of Nations under Petkovic and bring Mahrez's silky dribbling and Bennacer's AC Milan class to the tournament. Desert Foxes have a proud World Cup history, famously nearly beating Germany in 1982 with a legendary performance. Technical, creative and dangerous in the final third, they can light up any game."
    },
    "Egypt": {
        code: "eg", confederation: "africa", confName: "CAF",
        colors: ["#ce1126", "#fff"],
        folder: "team profile/egypt",
        cover: "fifa-world-cup-2026-egypt-team-images.jpg.jpg",
        coach: "Hossam Hassan", coachNationality: "Egypt", coachAge: 59, coachImage: "assets/coaches/hossam_hassan.jpg", coachBio: "The Egyptian football legend, one of Africa's greatest ever players, now manages the national team with the same fire and passion. His deep understanding of Egyptian football and motivational skills inspire the Pharaohs.", fifaRank: 28, worldCupTitles: 0,
        bestFinish: "Group Stage (1934, 1990, 2018)",
        keyPlayers: [
            { name: "Mohamed Salah", position: "Forward", number: 11, club: "Liverpool", image: "assets/players/mohamed_salah.jpg" },
            { name: "Trezeguet", position: "Winger", number: 7, club: "Al-Ahli Jeddah", image: "assets/players/trezeguet.jpg" },
            { name: "Omar Marmoush", position: "Forward", number: 9, club: "Man City", image: "assets/players/omar_marmoush.jpg" }
        ],
        facts: "Egypt are Africa's most successful nation with a record seven Cup of Nations titles, and Mohamed Salah remains one of the world's deadliest attackers. At 34, this could be Salah's last World Cup and he's desperate to go deep. With Omar Marmoush emerging at Manchester City, the Pharaohs have a potent attack that can trouble any defense."
    },
    "Côte d'Ivoire": {
        code: "ci", confederation: "africa", confName: "CAF",
        colors: ["#f77f00", "#009e60"],
        folder: "team profile/cote-divoire",
        cover: "fifa-world-cup-2026-ivory-coast-team-images.jpg.jpg",
        coach: "Emerse Faé", coachNationality: "Ivory Coast", coachAge: 42, coachImage: "assets/coaches/emerse_fae.webp", coachBio: "The former Ivorian midfielder won the 2023 AFCON as caretaker manager, becoming the first coach in history to win a tournament after being appointed mid-competition. His attacking philosophy and man-management skills have made the Elephants genuine contenders.", fifaRank: 27, worldCupTitles: 0,
        bestFinish: "Group Stage (2006, 2010, 2014)",
        keyPlayers: [
            { name: "Sébastien Haller", position: "Forward", number: 11, club: "Dortmund", image: "assets/players/sebastien_haller.jpg" },
            { name: "Frank Kessié", position: "Midfielder", number: 12, club: "Al-Ahli", image: "assets/players/frank_kessie.jpg" },
            { name: "Nicolas Pépé", position: "Winger", number: 7, club: "Trabzonspor", image: "assets/players/nicolas_pepe.jpg" }
        ],
        facts: "Ivory Coast won the 2024 Africa Cup of Nations on home soil in dramatic fashion, with Haller scoring the winning goal in the final. The Elephants' squad is packed with European league experience from Kessie, Pepe and Haller. Their AFCON triumph proved this team has the mental toughness to win knockout games when it matters most."
    },
    "Cabo Verde": {
        code: "cv", confederation: "africa", confName: "CAF",
        colors: ["#003893", "#fff"],
        folder: "team profile/cape-verde",
        cover: "fifa-world-cup-2026-cape-verde-team-images.jpg.jpg",
        coach: "Felisberto Cardoso", coachNationality: "Cabo Verde", coachAge: 55, coachImage: "assets/coaches/felisberto_cardoso.webp", coachBio: "Known as 'Beto', the Cape Verdean coach guided his nation to their first-ever World Cup, an extraordinary achievement for a nation of just 600,000 people. His tactical organization and ability to unite a diaspora squad was the key to history.", fifaRank: 60, worldCupTitles: 0,
        bestFinish: "First World Cup",
        keyPlayers: [
            { name: "Ryan Mendes", position: "Forward", number: 10, club: "Al-Wakrah", image: "assets/players/ryan_mendes.jpg" },
            { name: "Stopira", position: "Defender", number: 4, club: "Al-Tadamon", image: "assets/players/stopira.jpg" },
            { name: "Djaniny", position: "Forward", number: 9, club: "Al-Sadd", image: "assets/players/djaniny.jpg" }
        ],
        facts: "Cabo Verde are the smallest nation at the 2026 World Cup by population, with just 600,000 people on their Atlantic island home. This is their first-ever World Cup appearance and the entire nation will be celebrating. Ryan Mendes and Djaniny bring experience from Gulf leagues, but their real strength is collective heart and island pride."
    },
    "DR Congo": {
        code: "cd", confederation: "africa", confName: "CAF",
        colors: ["#007fff", "#f7d618"],
        folder: "team profile/congo",
        cover: "fifa-world-cup-2026-Congo-team-images.jpg.jpg",
        coach: "Dario Bonetti", coachNationality: "Italy", coachAge: 64, coachImage: "assets/coaches/dario_bonetti.webp", coachBio: "The experienced Italian coach delivered DR Congo's first World Cup since 1974, ending a 52-year wait. His European tactical expertise and defensive organization transformed the Leopards into a competitive force.", fifaRank: 40, worldCupTitles: 0,
        bestFinish: "Group Stage (1974)",
        keyPlayers: [
            { name: "Cédric Bakambu", position: "Forward", number: 9, club: "Al-Nassr", image: "assets/players/cedric_bakambu.jpg" },
            { name: "Charles Pickel", position: "Midfielder", number: 14, club: "Basel", image: "assets/players/charles_pickel.jpg" },
            { name: "Yoann Wissa", position: "Forward", number: 11, club: "Brentford", image: "assets/players/yoann_wissa.jpg" }
        ],
        facts: "DR Congo's only previous World Cup was in 1974, making this qualification a 52-year wait for the Leopards. Bakambu provides goal-scoring threat while Wissa brings Brentford's Premier League intensity. Passionate, physical and with nothing to lose, Congo could be the tournament's most emotionally charged team."
    },
    "South Africa": {
        code: "za", confederation: "africa", confName: "CAF",
        colors: ["#007a4d", "#000"],
        folder: "team profile/south africa",
        cover: "fifa-world-cup-2026-south-africa-team-images.jpg.jpg",
        coach: "Hugo Broos", coachNationality: "Belgium", coachAge: 73, coachImage: "assets/coaches/hugo_broos.webp", coachBio: "The Belgian coach who won the 2021 Africa Cup of Nations with Cameroon, now leads South Africa's resurgence. His experience with African football and tactical discipline has made Bafana Bafana competitive again.", fifaRank: 37, worldCupTitles: 0,
        bestFinish: "Group Stage (2010)",
        keyPlayers: [
            { name: "Percy Tau", position: "Forward", number: 11, club: "Al Ahly", image: "assets/players/percy_tau.jpg" },
            { name: "Ronwen Williams", position: "Goalkeeper", number: 1, club: "Mamelodi Sundowns", image: "assets/players/ronwen_williams.jpg" },
            { name: "Teboho Mokoena", position: "Midfielder", number: 8, club: "Mamelodi Sundowns", image: "assets/players/teboho_mokoena.jpg" }
        ],
        facts: "South Africa qualified as the host's neighbor and are back at the World Cup for the first time since they hosted in 2010. Bafana Bafana are led by goalkeeper Ronwen Williams, who became a penalty shootout hero at AFCON. Under Belgian coach Hugo Broos, they play organized, pressing football with genuine team spirit."
    },
    "USA": {
        code: "us", confederation: "concacaf", confName: "CONCACAF",
        colors: ["#3c3b6e", "#b22234"],
        folder: "team profile/usa",
        cover: "fifa-world-cup-2026-usa-team-images.jpg.jpg",
        coach: "Mauricio Pochettino", coachNationality: "Argentina", coachAge: 54, coachImage: "assets/coaches/mauricio_pochettino.webp", coachBio: "The former Tottenham, PSG and Chelsea manager brings elite European tactical expertise to the USMNT. His high-pressing system and experience developing young talent perfectly suits America's most talented generation.", fifaRank: 13, worldCupTitles: 0,
        bestFinish: "Third Place (1930)",
        keyPlayers: [
            { name: "Christian Pulisic", position: "Forward", number: 10, club: "AC Milan", image: "assets/players/christian_pulisic.jpg" },
            { name: "Weston McKennie", position: "Midfielder", number: 8, club: "Juventus", image: "assets/players/weston_mckenzie.jpg" },
            { name: "Tyler Adams", position: "Midfielder", number: 4, club: "Bournemouth", image: "assets/players/tyler_adams.jpg" }
        ],
        facts: "The United States host the World Cup for the first time since 1994 with their most talented generation ever. Pulisic leads a squad of Premier League and Serie A stars including McKennie and Adams, all in their prime years. Pochettino's appointment as coach signals serious intent - the Americans want to make a genuine title run, not just participate."
    },
    "Mexico": {
        code: "mx", confederation: "concacaf", confName: "CONCACAF",
        colors: ["#006847", "#ce1126"],
        folder: "team profile/mexico",
        cover: "fifa-world-cup-2026-mexico-team-images.jpg.jpg",
        coach: "Javier Aguirre", coachNationality: "Mexico", coachAge: 67, coachImage: "assets/coaches/javier_aguirre.webp", coachBio: "The experienced Mexican coach returned for a third World Cup cycle with El Tri, bringing tournament experience and tactical pragmatism. His ability to handle pressure and organize defensively suits Mexico's knockout-stage ambitions.", fifaRank: 16, worldCupTitles: 0,
        bestFinish: "Quarter-Finals (1970, 1986)",
        keyPlayers: [
            { name: "Hirving Lozano", position: "Winger", number: 11, club: "San Diego FC", image: "assets/players/hirving_lozano.jpg" },
            { name: "Edson Álvarez", position: "Midfielder", number: 4, club: "West Ham", image: "assets/players/edson_alvarez.jpg" },
            { name: "Raúl Jiménez", position: "Forward", number: 9, club: "Fulham", image: "assets/players/raul_jimenez.jpg" }
        ],
        facts: "Mexico are co-hosts and have reached the knockout stage in seven consecutive World Cups - a streak they're determined to maintain. The Azteca roar will be deafening as El Tri aim for a quarter-final breakthrough they've achieved only twice. Lozano's pace and Alvarez's midfield steel give Aguirre a squad built for the pressures of home tournament football."
    },
    "Canada": {
        code: "ca", confederation: "concacaf", confName: "CONCACAF",
        colors: ["#ff0000", "#fff"],
        folder: "team profile/canada",
        cover: "fifa-world-cup-2026-canada-team-images.jpg.jpg",
        coach: "Jesse Marsch", coachNationality: "USA", coachAge: 52, coachImage: "assets/coaches/jesse_marsch.webp", coachBio: "The American coach brought high-energy pressing football to Canada, revitalizing a squad around Davies and David. His European coaching experience with Leipzig and Salzburg provides tactical sophistication for the co-hosts.", fifaRank: 39, worldCupTitles: 0,
        bestFinish: "Group Stage (1986, 2022)",
        keyPlayers: [
            { name: "Alphonso Davies", position: "Defender", number: 12, club: "Real Madrid", image: "assets/players/alphonso_davies.jpg" },
            { name: "Jonathan David", position: "Forward", number: 9, club: "Barcelona", image: "assets/players/jonathan_david.jpg" },
            { name: "Tajon Buchanan", position: "Winger", number: 11, club: "Inter Milan", image: "assets/players/tajon_buchanan.jpg" }
        ],
        facts: "Canada qualified for only their third World Cup ever and are co-hosts alongside the USA and Mexico. Alphonso Davies is one of the fastest players in world football while Jonathan David provides lethal finishing. Jesse Marsch has built an energetic, attacking team that will ride a wave of national pride into their biggest tournament ever."
    },
    "Panama": {
        code: "pa", confederation: "concacaf", confName: "CONCACAF",
        colors: ["#d21034", "#003da5"],
        folder: "team profile/panama",
        cover: "fifa-world-cup-2026-panama-team-images.jpg.jpg",
        coach: "Thomas Christiansen", coachNationality: "Denmark", coachAge: 54, coachImage: "assets/coaches/thomas_christiansen.webp", coachBio: "The Danish-Spanish former Leeds manager delivered Panama's best-ever World Cup performance in 2018. His tactical organization and ability to maximize limited resources makes Panama competitive against bigger nations.", fifaRank: 33, worldCupTitles: 0,
        bestFinish: "Round of 16 (2018)",
        keyPlayers: [
            { name: "Michael Murillo", position: "Defender", number: 2, club: "Marseille", image: "assets/players/michael_murillo.jpg" },
            { name: "Cecilio Waterman", position: "Forward", number: 9, club: "Plaza Amador", image: "assets/players/cecilio_waterman.jpg" },
            { name: "Aníbal Godoy", position: "Midfielder", number: 6, club: "Saprissa", image: "assets/players/anibal_godoy.jpg" }
        ],
        facts: "Panama reached the Round of 16 in 2018 and proved they belong at the World Cup with organized, collective football. Murillo brings Marseille-quality defending while Godoy provides experienced midfield presence. La Marea Roja's team-first mentality and defensive discipline make them tough to break down for any opponent."
    },
    "Haiti": {
        code: "ht", confederation: "concacaf", confName: "CONCACAF",
        colors: ["#00209f", "#d21034"],
        folder: "team profile/haiti",
        cover: "fifa-world-cup-2026-haiti-team-images.jpg.jpg",
        coach: "Jean-Jacques Pierre", coachNationality: "Haiti", coachAge: 55, coachImage: "assets/coaches/jean_jacques_pierre.webp", coachBio: "The former Nantes defender guided Haiti to their first World Cup since 1974, ending a 52-year wait. His passion and understanding of Caribbean football culture inspired an emotional qualification campaign.", fifaRank: 80, worldCupTitles: 0,
        bestFinish: "Group Stage (1974)",
        keyPlayers: [
            { name: "Duckens Nazon", position: "Forward", number: 11, club: "Quevilly-Rouen", image: "assets/players/duckens_nazon.jpg" },
            { name: "Steevens Joseph", position: "Midfielder", number: 8, club: "USL Dunkerque", image: "assets/players/steevens_joseph.jpg" },
            { name: "Frantzly Pierrot", position: "Forward", number: 9, club: "Miami FC", image: "assets/players/frantzly_pierrot.jpg" }
        ],
        facts: "Haiti qualified for the World Cup for just the second time in history, first since 1974 - a 52-year wait. The Caribbean nation plays with raw emotion and attacking speed, led by Nazon's goalscoring and Pierrot's energy. For a country that has faced enormous challenges off the pitch, this team represents the unifying power of football."
    },
    "New Zealand": {
        code: "nz", confederation: "oceania", confName: "OFC",
        colors: ["#000", "#fff"],
        folder: "team profile/new zealand",
        cover: "fifa-world-cup-2026-new-zealand-team-images.jpg.jpg",
        coach: "Darren Bazeley", coachNationality: "New Zealand", coachAge: 53, coachImage: "assets/coaches/darren_bazeley.webp", coachBio: "The English-born New Zealand coach guided the All Whites through Oceania qualification. His structured approach and ability to develop the squad around Chris Wood's Premier League quality maintained New Zealand's competitiveness.", fifaRank: 65, worldCupTitles: 0,
        bestFinish: "Group Stage (1982, 2010)",
        keyPlayers: [
            { name: "Chris Wood", position: "Forward", number: 9, club: "Nottm Forest", image: "assets/players/chris_wood.jpg" },
            { name: "Libby Cacace", position: "Midfielder", number: 8, club: "Sint-Truiden", image: "assets/players/libby_cacace.jpg" },
            { name: "Marko Stamenic", position: "Midfielder", number: 14, club: "Nottingham Forest", image: "assets/players/marko_stamenic.jpg" }
        ],
        facts: "New Zealand are the lone representative of Oceania and their most famous World Cup moment was drawing 1-1 with Italy in 2010. Chris Wood is their talisman, having scored 20+ Premier League goals for Nottingham Forest. The All Whites play with Pacific Island spirit, physical presence and the underdog freedom that makes them dangerous in the group stage."
    }
};

// Map team names to their profile folder paths (accounts for folder name typos)
const teamFolderMap = {
    "France": "france",
    "England": "england",
    "Germany": "germany",
    "Spain": "spain",
    "Portugal": "portugal",
    "Netherlands": "netherlands",
    "Belgium": "belguim",
    "Croatia": "croatia",
    "Switzerland": "switzerland",
    "Austria": "austria",
    "Scotland": "scotland",
    "Norway": "norway",
    "Sweden": "sweden",
    "Czechia": "czechia",
    "Bosnia and Herzegovina": "bosnia",
    "Türkiye": "turkey",
    "Brazil": "brazil",
    "Argentina": "agentin",
    "Uruguay": "uruguay",
    "Colombia": "colombia",
    "Ecuador": "ecuador",
    "Paraguay": "paraguay",
    "Japan": "japan",
    "South Korea": "south korea",
    "Australia": "australia",
    "IR Iran": "iran",
    "Saudi Arabia": "saudi arabia",
    "Qatar": "qatar",
    "Iraq": "iraq",
    "Uzbekistan": "uzbekistan",
    "Jordan": "jordan",
    "Curaçao": "curaco",
    "Morocco": "morroco",
    "Senegal": "senegal",
    "Tunisia": "tunisia",
    "Ghana": "ghana",
    "Algeria": "algeria",
    "Egypt": "egypt",
    "Côte d'Ivoire": "ivory cost",
    "Cabo Verde": "cape-verde",
    "DR Congo": "congo",
    "South Africa": "south africa",
    "USA": "usa",
    "Mexico": "mexico",
    "Canada": "canada",
    "Panama": "panama",
    "Haiti": "haiti",
    "New Zealand": "new zealand"
};
