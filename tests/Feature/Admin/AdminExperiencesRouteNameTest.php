<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;

class AdminExperiencesRouteNameTest extends TestCase
{
    public function test_admin_experiences_page_uses_existing_create_route_name(): void
    {
        $file = base_path('resources/js/Pages/Admin/Experiences/Index.jsx');
        $content = file_get_contents($file);

        $this->assertIsString($content);
        $this->assertStringNotContainsString("route('experiences.create')", $content);
        $this->assertStringContainsString("route('experiencies.create')", $content);
    }
}
