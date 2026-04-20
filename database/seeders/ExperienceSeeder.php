<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        // Netegem i reiniciem l'auto-increment per evitar conflictes
        // Netegem la taula
        DB::table('category_experience')->delete();
        DB::table('experiences')->delete();

        $statusPublicada = 'publicada'; // Assegurem que el valor coincideix amb el que s'utilitza a l'aplicació (en minúscules)

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
                'user_id' => 3,
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
                'title' => 'Trekking pel Montseny (Esborrany)',
                'body' => 'Encara estic preparant les fotos d\'aquesta ruta. Aviat actualitzaré el post!',
                'image_url' => null,
                'latitude' => 41.7833,
                'longitude' => 2.4000,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
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
                'user_id' => 3,
                'title' => 'Setmana a Islàndia (Esborrany)',
                'body' => 'Estic preparant el resum del viatge. Tenim més de 500 fotos per seleccionar!',
                'image_url' => null,
                'latitude' => 64.9631,
                'longitude' => -19.0208,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 2,
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
                'user_id' => 3,
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
            ['experience_id' => 9, 'categoria_id' => 1], //Toscana -> Aventures
            ['experience_id' => 9, 'categoria_id' => 8], // Toscana -> Relax
            ['experience_id' => 10, 'categoria_id' => 4], //Praga -> Històric
            ['experience_id' => 10, 'categoria_id' => 6], //Praga -> Cultura
            ['experience_id' => 11, 'categoria_id' => 1], //Doñana -> Aventures
            ['experience_id' => 11, 'categoria_id' => 2], //Doñana -> Muntanyisme
            ['experience_id' => 12, 'categoria_id' => 6], //Amsterdam -> Cultura
            ['experience_id' => 12, 'categoria_id' => 5], //Amsterdam -> Romàntic
        ]);
    }
}
