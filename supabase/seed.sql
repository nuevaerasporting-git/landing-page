-- Seed for the public site configuration.
-- Idempotent: the INSERT only runs when localhost:3000 has no configuration.
-- This is a seed, not a migration. It does not create or alter schema objects.
-- If RLS is enabled on site_configurations, public reads need an appropriate
-- SELECT grant/policy (or a view). This seed executes no GRANT or policy:
-- defining that access is a security decision for the team.

INSERT INTO site_configurations (uuid, domain, sections, created_at, updated_at)
SELECT
  gen_random_uuid(),
  'localhost:3000',
  jsonb_build_object(
    'hero', jsonb_build_object(
      'eyebrow', 'María Teresa · Santa Fe',
      'titleLead', 'Mucho más que un club.',
      'titleEmphasis', 'Un lugar para encontrarnos.',
      'subtitle', 'Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club.',
      'primaryCta', jsonb_build_object('href', '#asociate', 'label', 'Quiero asociarme'),
      'secondaryCta', jsonb_build_object('href', '#actividades', 'label', 'Conocé las actividades'),
      'note', 'Desde 1961, parte de la comunidad de María Teresa.',
      'media', jsonb_build_object(
        'label', 'Imagen del club pendiente',
        'detail', 'Foto de deporte y comunidad'
      )
    ),
    'activities', jsonb_build_object(
      'title', 'Encontrá tu lugar en Nueva Era',
      'description', 'Un club con espacio para jugar, aprender y compartir.',
      'pendingBadge', 'Disciplinas a confirmar',
      'cardCta', jsonb_build_object('href', '#asociate', 'label', 'Consultar actividad'),
      'mediaLabel', 'Imagen del club pendiente',
      'note', 'La oferta actual de disciplinas, categorías y horarios está pendiente de confirmación con el club.',
      'items', jsonb_build_array(
        jsonb_build_object('name', 'Fútbol', 'consultationAriaLabel', 'Consultar sobre Fútbol'),
        jsonb_build_object('name', 'Hockey', 'consultationAriaLabel', 'Consultar sobre Hockey'),
        jsonb_build_object('name', 'Fútbol infantil', 'consultationAriaLabel', 'Consultar sobre Fútbol infantil'),
        jsonb_build_object('name', 'Tenis', 'consultationAriaLabel', 'Consultar sobre Tenis')
      )
    ),
    'membership', jsonb_build_object(
      'title', 'Sé parte de Nueva Era',
      'description', 'Sumate a nuestro club y compartí la pasión por el deporte, la familia y la comunidad',
      'note', 'Consultanos por requisitos, categorías y cuotas vigentes',
      'cta', jsonb_build_object('href', '#contacto', 'label', 'Consultar por WhatsApp'),
      'blocks', jsonb_build_array(
        jsonb_build_object('title', 'Cómo asociarte', 'description', 'Requisitos y pasos para iniciar la asociación.'),
        jsonb_build_object('title', 'Cuotas y categorías', 'description', 'Alternativas de asociación y valores vigentes.'),
        jsonb_build_object('title', 'Consultas', 'description', 'Canal oficial para resolver dudas antes de asociarte.')
      )
    ),
    'news', jsonb_build_object(
      'title', 'Lo que pasa en el club',
      'description', 'Novedades, encuentros y actividades del día a día.',
      'mediaLabel', 'Imagen del club pendiente',
      'cardTitle', 'Espacio reservado para una novedad',
      'cardDescription', 'Cuando el club confirme una publicación, se va a mostrar en este lugar.',
      'note', 'No publicamos novedades hasta contar con información confirmada por el club.',
      'placeholders', jsonb_build_array(1, 2, 3)
    ),
    'sponsors', jsonb_build_object(
      'title', 'Quienes nos acompañan',
      'description', 'Este espacio está reservado para las marcas que acompañan al club.',
      'carouselHelp', 'Carrusel automático de patrocinadores. Se pausa al pasar el cursor, al enfocar o al interactuar.',
      'regionLabel', 'Patrocinadores pendientes',
      'slotLabel', 'Logo pendiente',
      'note', 'Los logotipos se publican únicamente con autorización de cada marca.',
      'placeholders', jsonb_build_array(1, 2, 3, 4)
    ),
    'site', jsonb_build_object(
      'metadata', jsonb_build_object(
        'title', 'Nueva Era Sporting Club | María Teresa, Santa Fe',
        'description', 'Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club. Conocé las actividades y cómo asociarte.'
      ),
      'navigation', jsonb_build_array(
        jsonb_build_object('label', 'Actividades', 'href', '#actividades'),
        jsonb_build_object('label', 'Asociate', 'href', '#asociate'),
        jsonb_build_object('label', 'Novedades', 'href', '#novedades'),
        jsonb_build_object('label', 'Patrocinadores', 'href', '#patrocinadores')
      ),
      'wordmark', jsonb_build_object(
        'image', jsonb_build_object(
          'src', '/nesc-escudo-manual.png',
          'alt', '',
          'width', 430,
          'height', 463
        ),
        'primaryLine', 'Nueva Era',
        'secondaryLine', 'Sporting Club'
      ),
      'header', jsonb_build_object(
        'homeHref', '#inicio',
        'homeAriaLabel', 'Nueva Era Sporting Club — ir al inicio',
        'primaryNavLabel', 'Navegación principal',
        'cta', jsonb_build_object('href', '#asociate', 'label', 'Quiero asociarme')
      ),
      'mobileNav', jsonb_build_object(
        'openMenuLabel', 'Abrir menú',
        'closeMenuLabel', 'Cerrar menú',
        'navLabel', 'Navegación móvil',
        'cta', jsonb_build_object('href', '#asociate', 'label', 'Quiero asociarme')
      ),
      'footer', jsonb_build_object(
        'locationPrimary', 'María Teresa, Santa Fe',
        'locationSecondary', 'Argentina',
        'navLabel', 'Enlaces del pie de página',
        'sectionsLabel', 'Secciones',
        'contactLabel', 'Contacto',
        'contactDescription', 'Próximamente publicaremos los canales oficiales de contacto y redes sociales.',
        'locationLabel', 'Ubicación',
        'locationDescription', 'Polideportivo: Sáenz Peña y Sarmiento, María Teresa, Santa Fe.',
        'copyright', 'Nueva Era Sporting Club. Todos los derechos reservados.'
      ),
      'accessibility', jsonb_build_object('skipLinkLabel', 'Saltar al contenido')
    )
  ),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM site_configurations WHERE domain = 'localhost:3000'
);
