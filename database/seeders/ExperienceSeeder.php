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
        $now = Carbon::now();

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

        $baseExperiences = [
            [
                'user_id' => 2,
                'title' => 'Ruta pels Pirineus: Vall de Núria',
                'body' => "**Una escapada inoblidable**.\n\nAquest cap de setmana hem fet una ruta impressionant per la Vall de Núria.\n\n- Vistes espectaculars\n- Clima perfecte\n\nRecomano portar bon calçat i aigua.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/vall-de-nuria_arvzuf.avif',
                'latitude' => 42.3961,
                'longitude' => 2.1534,
                'status' => $statusPublicada,
                'days_ago' => 2,
                'categories' => ['muntanya', 'aventura'],
            ],
            [
                'user_id' => 3,
                'title' => 'Cap de setmana romàntic a Roma',
                'body' => "**La Ciutat Eterna**\n\nNo hi ha res com passejar de nit pel centre de Roma.\n\n_**Roma no es va fer en un dia, però es pot estimar en un segon.**_",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/roma_spoanz.avif',
                'latitude' => 41.8902,
                'longitude' => 12.4922,
                'status' => $statusPublicada,
                'days_ago' => 3,
                'categories' => ['romantic', 'historic'],
            ],
            [
                'user_id' => 2,
                'title' => 'Descobrint Lisboa a peu',
                'body' => "**La Ciutat dels Set Turons**\n\nLisboa és una ciutat que s'ha de caminar sense pressa.\n\n- Miradors espectaculars\n- Gastronomia brutal",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/lisboa_bmipbj.avif',
                'latitude' => 38.7169,
                'longitude' => -9.1399,
                'status' => $statusPublicada,
                'days_ago' => 4,
                'categories' => ['gastronomia', 'historic', 'cultura'],
            ],
            [
                'user_id' => 3,
                'title' => 'Tokyo: entre tradició i modernitat',
                'body' => "**El Japó que no oblides**\n\nTemple de Senso-ji a l'alba, menjar al mercat i barris plens de vida.\n\n- Transport impecable\n- Cultura a cada cantonada",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093833/tokio_gzexqx.avif',
                'latitude' => 35.7148,
                'longitude' => 139.7967,
                'status' => $statusPublicada,
                'days_ago' => 5,
                'categories' => ['cultura', 'aventura'],
            ],
            [
                'user_id' => 2,
                'title' => 'Escapada a la Costa Brava',
                'body' => "**Cales i Tramuntana**\n\nCamins de ronda, mar transparent i menjar local.\n\nIdeal en temporada baixa.",
                'image_url' => 'https://res.cloudinary.com/dadhzxpnj/image/upload/q_auto/f_auto/v1776093834/brava_qsrkju.avif',
                'latitude' => 41.9109,
                'longitude' => 3.2159,
                'status' => $statusPublicada,
                'days_ago' => 6,
                'categories' => ['platja', 'gastronomia', 'relax'],
            ],
            [
                'user_id' => 2,
                'title' => 'Trekking pel Montseny (Esborrany)',
                'body' => "Estic preparant les fotos i el track de la ruta.\n\nPublicaré la versió final aviat.",
                'image_url' => null,
                'latitude' => 41.7833,
                'longitude' => 2.4000,
                'status' => 'esborrany',
                'days_ago' => 1,
                'categories' => ['muntanya'],
            ],
            [
                'user_id' => 3,
                'title' => 'Setmana a Islàndia (Esborrany)',
                'body' => "Amb més de 500 fotos per triar.\n\nPublicaré glaceres, cascades i rutes en 4x4.",
                'image_url' => null,
                'latitude' => 64.9631,
                'longitude' => -19.0208,
                'status' => 'esborrany',
                'days_ago' => 1,
                'categories' => ['aventura', 'muntanya'],
            ],
        ];

        // Entrades extra per tenir força contingut a scroll infinit
        $extraTemplates = [
            ['title' => 'Roadtrip per Andalusia', 'body' => 'Granada, Còrdova i Sevilla en una setmana. Història, tapes i capvespres memorables.', 'lat' => 37.3891, 'lng' => -5.9845, 'img' => 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop', 'categories' => ['historic', 'cultura', 'gastronomia']],
            ['title' => 'Berlín alternatiu en 48 hores', 'body' => 'Art urbà, cafès i museus. Una ciutat plena d’energia i contrastos.', 'lat' => 52.5200, 'lng' => 13.4050, 'img' => 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1200&auto=format&fit=crop', 'categories' => ['cultura', 'historic']],
            ['title' => 'Menorca en kayak', 'body' => 'Cales amagades, aigües transparents i jornades llargues al mar.', 'lat' => 39.9496, 'lng' => 4.1106, 'img' => 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1200&auto=format&fit=crop', 'categories' => ['aventura', 'platja', 'relax']],
            ['title' => 'Senderisme als Alps francesos', 'body' => 'Ruta exigent amb refugis i panoràmiques increïbles.', 'lat' => 45.9237, 'lng' => 6.8694, 'img' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop', 'categories' => ['muntanya', 'aventura']],
            ['title' => 'Budapest termal i cultural', 'body' => 'Banys termals, arquitectura imperial i bona gastronomia.', 'lat' => 47.4979, 'lng' => 19.0402, 'img' => 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=1200&auto=format&fit=crop', 'categories' => ['relax', 'cultura', 'historic']],
            ['title' => 'Escapada familiar a PortAventura', 'body' => 'Atraccions, espectacles i molta diversió per a tothom.', 'lat' => 41.0878, 'lng' => 1.1570, 'img' => 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1200&auto=format&fit=crop', 'categories' => ['familiar', 'aventura']],
            ['title' => 'Nàpols i la Costa Amalfitana', 'body' => 'Pizza autèntica, carreteres costaneres i pobles de postal.', 'lat' => 40.8518, 'lng' => 14.2681, 'img' => 'https://images.unsplash.com/photo-1533633220915-609f661a6a2d?q=80&w=1200&auto=format&fit=crop', 'categories' => ['gastronomia', 'romantic', 'platja']],
            ['title' => 'Camí de Sant Jaume (etapa curta)', 'body' => 'Una etapa de 22 km plena de natura i calma.', 'lat' => 42.8782, 'lng' => -8.5448, 'img' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop', 'categories' => ['aventura', 'muntanya', 'historic']],
            ['title' => 'València gastronòmica', 'body' => 'Orxata, paella i mercats locals en un cap de setmana.', 'lat' => 39.4699, 'lng' => -0.3763, 'img' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1200&auto=format&fit=crop', 'categories' => ['gastronomia', 'cultura']],
            ['title' => 'Praga nadalenca', 'body' => 'Mercats de Nadal, pont de Carles i ambient màgic.', 'lat' => 50.0755, 'lng' => 14.4378, 'img' => 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop', 'categories' => ['romantic', 'historic', 'cultura']],
            ['title' => 'Mallorca tranquil·la fora de temporada', 'body' => 'Pobles tranquils, cales buides i bon clima.', 'lat' => 39.6953, 'lng' => 3.0176, 'img' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', 'categories' => ['platja', 'relax']],
            ['title' => 'Brussel·les i Bruges en tren', 'body' => 'Xocolata, cervesa i arquitectura preciosa.', 'lat' => 50.8503, 'lng' => 4.3517, 'img' => 'https://images.unsplash.com/photo-1549899593-f73fb10fd1d4?q=80&w=1200&auto=format&fit=crop', 'categories' => ['historic', 'cultura', 'gastronomia']],
            ['title' => 'Ruta en bici per Girona', 'body' => 'Una escapada activa entre pobles medievals i vies verdes.', 'lat' => 41.9794, 'lng' => 2.8214, 'img' => 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop', 'categories' => ['aventura', 'familiar']],
            ['title' => 'Viena clàssica', 'body' => 'Palaus, música i cafeteries històriques.', 'lat' => 48.2082, 'lng' => 16.3738, 'img' => 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1200&auto=format&fit=crop', 'categories' => ['cultura', 'historic', 'romantic']],
            ['title' => 'Cap de setmana a Porto', 'body' => 'Celleres, ponts i carrers plens de vida.', 'lat' => 41.1579, 'lng' => -8.6291, 'img' => 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop', 'categories' => ['gastronomia', 'romantic']],
            ['title' => 'Parcs naturals del País Basc', 'body' => 'Natura verda, costa abrupta i menjar espectacular.', 'lat' => 43.2630, 'lng' => -2.9350, 'img' => 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop', 'categories' => ['muntanya', 'aventura', 'gastronomia']],
            ['title' => 'Londres cultural low-cost', 'body' => 'Museus gratuïts, mercats i rutes a peu.', 'lat' => 51.5072, 'lng' => -0.1276, 'img' => 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop', 'categories' => ['cultura', 'historic']],
            ['title' => 'Escapada romàntica a París', 'body' => 'Passejos pel Sena, Montmartre i sopars especials.', 'lat' => 48.8566, 'lng' => 2.3522, 'img' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop', 'categories' => ['romantic', 'cultura']],
            ['title' => 'Surf a Cantàbria', 'body' => 'Ones, penya-segats i ambient molt relaxat.', 'lat' => 43.4623, 'lng' => -3.8099, 'img' => 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop', 'categories' => ['aventura', 'platja']],
            ['title' => 'Ruta medieval per Carcassona', 'body' => 'Muralles, carrerons i història viva.', 'lat' => 43.2130, 'lng' => 2.3491, 'img' => 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?q=80&w=1200&auto=format&fit=crop', 'categories' => ['historic', 'cultura']],
        ];

        // Construïm 28 experiències totals aprox. (base + extres)
        $allExperiences = $baseExperiences;
        foreach ($extraTemplates as $index => $template) {
            $allExperiences[] = [
                'user_id' => $index % 2 === 0 ? 2 : 3,
                'title' => $template['title'],
                'body' => $template['body'],
                'image_url' => $template['img'],
                'latitude' => $template['lat'],
                'longitude' => $template['lng'],
                'status' => $statusPublicada,
                'days_ago' => 7 + $index,
                'categories' => $template['categories'],
            ];
        }

        $pivotRows = [];

        foreach ($allExperiences as $experience) {
            $isPublished = $experience['status'] === $statusPublicada;
            $publishedAt = $isPublished ? $now->copy()->subDays($experience['days_ago']) : null;
            $createdAt = $now->copy()->subDays($experience['days_ago'] + ($isPublished ? 1 : 0));

            $experienceId = DB::table('experiences')->insertGetId([
                'user_id' => $experience['user_id'],
                'title' => $experience['title'],
                'body' => $experience['body'],
                'image_url' => $experience['image_url'],
                'latitude' => $experience['latitude'],
                'longitude' => $experience['longitude'],
                'status' => $experience['status'],
                'is_reported' => false,
                'published_at' => $publishedAt,
                'created_at' => $createdAt,
                'updated_at' => $publishedAt ?? $createdAt,
            ]);

            foreach ($experience['categories'] as $categoryKey) {
                if (! isset($categoryMap[$categoryKey])) {
                    continue;
                }

                $pivotRows[] = [
                    'experience_id' => $experienceId,
                    'category_id' => $categoryMap[$categoryKey],
                ];
            }
        }

        if (! empty($pivotRows)) {
            DB::table('category_experience')->insert($pivotRows);
        }
    }
}
