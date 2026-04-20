<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('category_experience')->delete();
        DB::table('experiences')->delete();

        $statusPublicada = 'publicada';

        // Mapa de categories per fer el codi més llegible
        $categoryMap = [
            'aventura' => 1,
            'muntanya' => 2,
            'familiar' => 3,
            'historic' => 4,
            'romantic' => 5,
            'cultura' => 6,
            'gastronomia' => 7,
            'relax' => 8,
            'platja' => 9,
        ];

        $experiences = [
            [
                'user_id' => 2,
                'title' => 'Ruta pels Pirineus: Vall de Núria',
                'body' => "Una escapada inoblidable. Aquest cap de setmana hem fet una ruta impressionant per la Vall de Núria, agafant
                    el cremallera des de Ribes de Freser. Les vistes han estat espectaculars i el clima, perfecte. Si hi voleu anar, us
                    recomano portar bon calçat i aigua.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/vall-de-nuria_arvzuf.avif',
                'latitude' => 42.3961,
                'longitude' => 2.1534,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'user_id' => 1,
                'title' => 'Cap de setmana romàntic a Roma',
                'body' => "La Ciutat Eterna. No hi ha res com passejar de nit pel centre de Roma. Vam visitar el Coliseu i
                    vam tirar una moneda a la Fontana di Trevi. Un viatge 10/10.\n\n" .
                    "Roma no es va fer en un dia, però es pot estimar en un segon.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/roma_spoanz.avif',
                'latitude' => 41.8902,
                'longitude' => 12.4922,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 2,
                'title' => 'Descobrint Lisboa a peu',
                'body' => "La Ciutat dels Set Turons. Lisboa és una ciutat que s'ha de caminar sense pressa. Vam pujar al 
                    mirador de Santa Luzia al capvespre i la vista sobre el Tejo va ser increïble. Els elèctrics històrics són 
                    una experiència única i el pastís de nata de Belém és obligatori. Imprescindible portar calçat còmode per als 
                    empedrats.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/lisboa_bmipbj.avif',
                'latitude' => 38.7169,
                'longitude' => -9.1399,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(4),
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'user_id' => 3,
                'title' => 'Una setmana al nord de Marroc',
                'body' => "Xaouen, la Ciutat Blava.Les medines blaves de Xaouen són com cap altre lloc del món. Ens vam perdre 
                pels seus carrers estrets i vam trobar racons màgics a cada cantonada. El soc és un caos meravellós ple de colors 
                i olors, i recomanem allotjar-se en un riad local. Viatjar és l'única cosa que compres que et fa més ric.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/marroc_k8gkvk.avif',
                'latitude' => 35.1688,
                'longitude' => -5.2636,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now()->subDays(6),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'user_id' => 3,
                'title' => 'Tokyo: entre tradició i modernitat',
                'body' => "El Japó que no oblides. Arribar a Tokyo és com aterrar en un altre planeta. Vam visitar el 
                temple de Senso-ji a l'alba, abans que arribessin els turistes. El transport públic és impecable i
                puntual, i el menjar al mercat de Tsukiji és una experiència única. Totalment recomanable per a viatgers curiosos.\n\n" .
                "El Japó no és un destí, és una sensació.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/tokio_gzexqx.avif',
                'latitude' => 35.7148,
                'longitude' => 139.7967,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(8),
                'created_at' => Carbon::now()->subDays(9),
                'updated_at' => Carbon::now()->subDays(8),
            ],
            [
                'user_id' => 2,
                'title' => 'Escapada a la Costa Brava',
                'body' => "Cales i Tramuntana. La Costa Brava a principis de temporada és un altre món: sense masses, amb 
                    l'aigua cristal·lina i els camins de ronda per a nosaltres sols. La cala de Tamariu és la més tranquil·la, 
                    i el suro i la gastronomia local són imprescindibles. Recomanem anar en temporada baixa per gaudir-ho de veritat.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/brava_qsrkju.avif',
                'latitude' => 41.9109,
                'longitude' => 3.2159,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(10),
                'created_at' => Carbon::now()->subDays(11),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'user_id' => 2,
                'title' => 'Trekking pel Montseny (Esborrany)',
                'body' => "Estic preparant les fotos i el track de la ruta.\n\nPublicaré la versió final aviat.",
                'image_url' => null,
                'latitude' => 41.7833,
                'longitude' => 2.4000,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 3,
                'title' => 'Setmana a Islàndia (Esborrany)',
                'body' => "Amb més de 500 fotos per triar.\n\nPublicaré glaceres, cascades i rutes en 4x4.",
                'image_url' => null,
                'latitude' => 64.9631,
                'longitude' => -19.0208,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 1,
                'title' => 'Ruta per la Toscana en cotxe',
                'body' => "Entre vinyes i ciprers. La Toscana és d'aquells llocs que semblen una pintura a l'oli. Vam recórrer
                    els pobles medievals de Siena, San Gimignano i Montepulciano en tres dies, per carreteres secundàries espectaculars 
                    entre vinyes i un bon chianti local a cada àpat. Recomanem llogar cotxe i allotjar-se en un agriturismo. \n\n".
                    "La Toscana et roba el cor sense demanar permís.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/toscana_bausht.avif',
                'latitude' => 43.3186,
                'longitude' => 11.3307,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(12),
                'created_at' => Carbon::now()->subDays(13),
                'updated_at' => Carbon::now()->subDays(12),
            ],
            [
                'user_id' => 3,
                'title' => 'Tres dies a Praga',
                'body' => "La Ciutat de les Cent Torres. Praga és una de les ciutats més ben conservades d'Europa. El barri 
                    jueu, el castell i el pont de Carles van ser els nostres favorits. Millor evitar el centre en cap de setmana, 
                    però la cervesa txeca és la millor del món i és baratíssima. Un viatge molt recomanable i assequible.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/praga_bpodpn.avif',
                'latitude' => 50.0755,
                'longitude' => 14.4378,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(14),
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(14),
            ],
            [
                'user_id' => 2,
                'title' => 'Aventura al Parc Nacional de Doñana',
                'body' => "Natura salvatge al sud d'Espanya. Doñana és un dels espais naturals més importants d'Europa i és 
                    a tocar de casa. Vam fer una excursió guiada en tot terreny per veure linx ibèric i àguila imperial: cal 
                    reservar amb antelació. L'alba al parc, amb la boira sobre les marismes, és inoblidable. Perfecte per a amants de la fauna i el birdwatching.\n\n".
                    "La naturalesa no necessita nosaltres, nosaltres la necessitem a ella.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/donana_ui2uvj.avif',
                'latitude' => 36.9981,
                'longitude' => -6.3362,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(16),
                'created_at' => Carbon::now()->subDays(17),
                'updated_at' => Carbon::now()->subDays(16), //
            ],
            [
                'user_id' => 1,
                'title' => 'Cap de setmana a Amsterdam',
                'body' => "Canals, bicicletes i museus. Amsterdam és una ciutat que es viu millor en bicicleta: llogar-ne una és la 
                    millor decisió. El mercat d'Albert Cuyp és ideal per esmorzar i cada canal amaga un racó encantador. 
                    Una ciutat que no defrauda.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/amsterdam.jpg_lh1nz4.avif',
                'latitude' => 52.3676,
                'longitude' => 4.9041,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(18),
                'created_at' => Carbon::now()->subDays(19),
                'updated_at' => Carbon::now()->subDays(18),
            ],
            [
                'user_id' => 2,
                'title' => 'Meravelles de Dubrovnik',
                'body' => "**La Perla de l'Adriàtic.** Dubrovnik és una de les ciutats medievals més ben conservades del Mediterrani. 
                    Vam recórrer les muralles al capvespre amb vistes al mar cristal·lí i als teulats de terracota. _**Dubrovnik no és una postal, és una experiència que et canvia.**_ 
                    Recomanem visitar-la fora de temporada per evitar les masses.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/dubrovnik_jwb2ar.avif",
                'latitude' => 42.6507,
                'longitude' => 18.0944,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(20),
                'created_at' => Carbon::now()->subDays(21),
                'updated_at' => Carbon::now()->subDays(20),
            ],
            [
                'user_id' => 3,
                'title' => 'Set dies per les Illes Canàries',
                'body' => "Volcans, platges i cel estrellat.
                    Lanzarote és un paisatge marcià: els camps de lava negra del Parc Nacional de Timanfaya et deixen 
                    sense paraules. Vam fer snorkel a les piscines naturals i vam observar les estrelles des del mirador 
                    del Haría, lliures de contaminació llumínica. Un destí sorprenent que va molt més enllà de les platges.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/canarias-lanzarote_qnyft2.avif",
                'latitude' => 29.0469,
                'longitude' => -13.5899,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(22),
                'created_at' => Carbon::now()->subDays(23),
                'updated_at' => Carbon::now()->subDays(22),
            ],
            [
                'user_id' => 2,
                'title' => 'Cap de setmana a Viena',
                'body' => "**La Capital de la Música.** Viena és una ciutat que respira cultura per tots els seus 
                    racons. Vam visitar el Palau de Schönbrunn, vam assistir a un concert al Musikverein i vam esmorzar 
                    com a vienesos en un kaffehaus centenari. _**Viena no s'entén, es viu amb calma i amb un cafè amb nata a la mà.**_ 
                    Imprescindible per a amants de l'art i la història.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703803/viena_nrznx8.avif",
                'latitude' => 48.2082,
                'longitude' => 16.3738,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(24),
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now()->subDays(24),
            ],
            [
                'user_id' => 3,
                'title' => 'Ruta pel sud de Grècia (Esborrany)',
                'body' => 'Estic editant les fotos del Peloponès i Nafplio. Serà un post llarg, val la pena esperar!',
                'image_url' => null,
                'latitude' => 37.5675,
                'longitude' => 22.8019,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'user_id' => 1,
                'title' => 'Aventura al Pirineu Aragonès',
                'body' => "Pics, llacs i silenci. El Parc Nacional d'Ordesa i Monte Perdido és un dels racons més 
                    espectaculars de la Península. Vam fer la ruta del Cañón de Añisclo en dos dies i vam dormir en un 
                    refugi de muntanya envoltat d'estrelles. Imprescindible portar mapes en paper i avisar de la ruta 
                    abans de sortir. Una experiència que recomano a qualsevol amant de la muntanya.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/PirineoAragones_jxlirv.avif",
                'latitude' => 42.6386,
                'longitude' => -0.0617,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(26),
                'created_at' => Carbon::now()->subDays(27),
                'updated_at' => Carbon::now()->subDays(26),
            ],
            [
                'user_id' => 2,
                'title' => 'Deu dies pel Vietnam',
                'body' => "Del Nord al Sud en tren i moto. El Vietnam és un país que et sorprèn a cada quilòmetre: des 
                    de les terrasses d'arròs de Sapa fins a les llums de lanternes de Hội An. Vam recórrer la costa en moto 
                    i vam menjar als mercats locals per menys d'un euro. _**El Vietnam et desperta els sentits i no te'ls 
                    torna mai més.**_ Un país imprescindible per a viatgers adventurers.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703803/vietnam_fqyer0.avif",
                'latitude' => 16.0544,
                'longitude' => 108.2022,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(28),
                'created_at' => Carbon::now()->subDays(29),
                'updated_at' => Carbon::now()->subDays(28),
            ],
            [
                'user_id' => 3,
                'title' => 'Tres dies a Edimburg',
                'body' => "Castells, whisky i llegenda. Edimburg és una de les capitals europees amb més caràcter. Vam pujar al castell 
                    que domina la ciutat, vam passejat pel barri de Grassmarket i vam fer una ruta per les destil·leries de les Highlands en 
                    un dia. La boira escocesa li dóna un aire misteriós únic. Molt recomanable visitar-la durant el Festival Fringe a l'agost.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/edimburgo_ikdirg.avif",
                'latitude' => 55.9533,
                'longitude' => -3.1883,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(30),
                'created_at' => Carbon::now()->subDays(31),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'user_id' => 2,
                'title' => 'Descobrint el Marroc Interior (Esborrany)',
                'body' => 'Tinc pendent organitzar totes les notes del viatge per Fes i el desert d\'Erg Chebbi. Aviat!',
                'image_url' => null,
                'latitude' => 31.6295,
                'longitude' => -7.9811,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'user_id' => 2,
                'title' => 'Cap de setmana al País Basc',
                'body' => "Pintxos, surf i cultura. Sant Sebastià és una de les ciutats amb millor gastronomia del món, i ho sap. 
                    Vam fer la ruta dels pintxos pel barri de la Part Vella, vam visitar el Museu Guggenheim a Bilbao i vam acabar el 
                    dia veient el surf a la platja de la Zurriola. Una escapada perfecta i molt fàcil d'organitzar des de Catalunya.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/pais-vasco_rgx1al.avif",
                'latitude' => 43.3183,
                'longitude' => -1.9812,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(34),
                'created_at' => Carbon::now()->subDays(35),
                'updated_at' => Carbon::now()->subDays(34),
            ],
            [
                'user_id' => 3,
                'title' => 'Quatre dies a Budapest',
                'body' => "La Reina del Danubi. Budapest és una de les capitals europees més belles i més asequibles. Vam banyar-nos 
                    als banys termals Széchenyi, vam creuar el pont de les Cadenes al capvespre i vam sopar a un dels ruin bars del barri 
                    jueu. Una combinació perfecta d'història, arquitectura i vida nocturna que no decep.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703805/budapest_uifnjt.avif",
                'latitude' => 47.4979,
                'longitude' => 19.0402,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(38),
                'created_at' => Carbon::now()->subDays(39),
                'updated_at' => Carbon::now()->subDays(38),
            ],
            [
                'user_id' => 1,
                'title' => 'Escapada a la Provença Francesa',
                'body' => "**Lavanda, mercats i llum del sud.** La Provença a l'estiu és un somni de color malva i ocre. Vam recórrer els camps de lavanda de Valensole, vam visitar el mercat de Aix-en-Provence i vam acabar el dia amb un rosé local a l'ombra d'un plàtan centenari. _**La Provença no s'explica, es respira.**_ Perfecte per a una escapada tranquil·la i sensorial.",
                'image_url' => "https://res.cloudinary.com/dadhzxpnj/image/upload/v1776703804/proven%C3%A7aFrancesa_n37gr0.avif",
                'latitude' => 43.8927,
                'longitude' => 5.9370,
                'status' => $statusPublicada,
                'published_at' => Carbon::now()->subDays(42),
                'created_at' => Carbon::now()->subDays(43),
                'updated_at' => Carbon::now()->subDays(42),
            ],
        ];

        DB::table('experiences')->insert($experiences);

        // Relacionem les experiències amb les categories a la taula pivot category_experience
        // Assumint que: 1=Aventures, 2=Muntanyisme, 3=Familiar, 4=Històric, 5=Romàntic, 6=Cultura, 7=Gastronomia, 8=Relax, 9=Platja
        DB::table('category_experience')->insert([
            ['experience_id' => 1, 'category_id' => 2], // Vall de Núria -> Muntanyisme
            ['experience_id' => 1, 'category_id' => 1], // Vall de Núria -> Aventures
            ['experience_id' => 2, 'category_id' => 5], // Roma -> Romàntic
            ['experience_id' => 2, 'category_id' => 8], // Roma -> Relax
            ['experience_id' => 4, 'category_id' => 7], // Lisboa -> Gastronomia
            ['experience_id' => 4, 'category_id' => 4], // Lisboa -> Històric
            ['experience_id' => 5, 'category_id' => 1], // Marroc -> Aventures
            ['experience_id' => 6, 'category_id' => 1], // Tokyo -> Aventures
            ['experience_id' => 6, 'category_id' => 6], // Tokyo -> Cultura
            ['experience_id' => 7, 'categoria_id' => 9], //Costa Brava -> Platja
            ['experience_id' => 7, 'categoria_id' => 7], //Costa Brava -> Gastronomia
            ['experience_id' => 7, 'categoria_id' => 8], //Costa Brava -> Relax
            ['experience_id' => 9, 'categoria_id' => 1], //Toscana -> Aventures
            ['experience_id' => 9, 'categoria_id' => 8], // Toscana -> Relax
            ['experience_id' => 10, 'categoria_id' => 4], //Praga -> Històric
            ['experience_id' => 10, 'categoria_id' => 6], //Praga -> Cultura
            ['experience_id' => 11, 'categoria_id' => 1], //Doñana -> Aventures
            ['experience_id' => 11, 'categoria_id' => 2], //Doñana -> Muntanyisme
            ['experience_id' => 12, 'categoria_id' => 6], //Amsterdam -> Cultura
            ['experience_id' => 12, 'categoria_id' => 5], //Amsterdam -> Romàntic
            ['experience_id' => 13, 'category_id' => 4], // Dubrovnik -> Històric
            ['experience_id' => 13, 'category_id' => 5], // Dubrovnik -> Romàntic
            ['experience_id' => 14, 'category_id' => 1], // Canàries -> Aventures
            ['experience_id' => 14, 'category_id' => 9], // Canàries -> Platja
            ['experience_id' => 15, 'category_id' => 6], // Viena -> Cultura
            ['experience_id' => 15, 'category_id' => 5], // Viena -> Romàntic
            // Grècia (esborrany - sense categories per ara)
            ['experience_id' => 17, 'category_id' => 2], // Pirineu -> Muntanyisme
            ['experience_id' => 17, 'category_id' => 1], // Pirineu -> Aventures
            ['experience_id' => 18, 'category_id' => 1], // Vietnam -> Aventures
            ['experience_id' => 18, 'category_id' => 6], // Vietnam -> Cultura
            ['experience_id' => 19, 'category_id' => 4], // Edimburg -> Històric
            ['experience_id' => 19, 'category_id' => 7], // Edimburg -> Gastronomia
            // Marroc Interior (esborrany - sense categories per ara)
            ['experience_id' => 21, 'category_id' => 7], // País Basc -> Gastronomia
            ['experience_id' => 21, 'category_id' => 6], // País Basc -> Cultura
            ['experience_id' => 22, 'category_id' => 4], // Budapest -> Històric
            ['experience_id' => 22, 'category_id' => 8], // Budapest -> Relax
            ['experience_id' => 23, 'category_id' => 8], // Provença -> Relax
            ['experience_id' => 23, 'category_id' => 7], // Provença -> Gastronomia
        ]);

    }
}
