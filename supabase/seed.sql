-- Datos de ejemplo para probar la web (opcional).
-- Ejecutar DESPUÉS de schema.sql. Las fotos usan Unsplash como placeholder.

insert into equipos (slug, nombre, marca, modelo, categoria_id, precio, estado, anio, horas_uso, descripcion, incluye, fotos, destacado)
values
  ('roland-dwx-52d-plus', 'Roland DWX-52D Plus', 'Roland', 'DWX-52D Plus',
   (select id from categorias where slug = 'fresadoras'), 19995, 'disponible', 2025, 650,
   'Fresadora dental de 5 ejes en excelente estado, revisada y calibrada. Procedente de laboratorio con mantenimiento al día.',
   E'Fresadora\nCambiador automático de 15 herramientas\nJuego de fresas nuevas\nCompresor\nManual y formación inicial',
   '{}', true),
  ('medit-t700', 'Medit T700', 'Medit', 'T700',
   (select id from categorias where slug = 'escaneres'), 4995, 'reservado', 2023, null,
   'Escáner de laboratorio de alta velocidad con brazo articulado. Excelente estado.',
   E'Escáner\nPlato de calibración\nLicencia software Medit Link',
   '{}', true),
  ('zirkonofen-600-v4', 'Zirkonofen 600/V4', 'Zirkonzahn', 'Zirkonofen 600/V4',
   (select id from categorias where slug = 'hornos'), 8500, 'disponible', 2024, 0,
   'Horno de sinterizado de zirconio sin uso, embalaje original.',
   E'Horno\nBandeja de sinterizado\nPerlas de circonio',
   '{}', true),
  ('asiga-max-uv-385', 'Asiga Max UV 385', 'Asiga', 'Max UV 385',
   (select id from categorias where slug = 'impresion-3d'), 4600, 'disponible', 2023, null,
   'Impresora 3D DLP de alta precisión para laboratorio dental. Excelente estado.',
   E'Impresora\n2 plataformas de impresión\nCubeta de resina',
   '{}', true),
  ('microscopio-zeiss-opmi-pico', 'Zeiss OPMI Pico', 'Zeiss', 'OPMI Pico',
   (select id from categorias where slug = 'microscopios'), 6900, 'vendido', 2019, null,
   'Microscopio quirúrgico dental con soporte de suelo.',
   E'Microscopio\nSoporte de suelo\nCámara integrada',
   '{}', false);

update equipos set vendido_at = now() - interval '12 days' where estado = 'vendido';

insert into articulos (slug, titulo, extracto, contenido, publicado, publicado_at) values
  ('que-tener-en-cuenta-al-comprar-fresadora-dental-segunda-mano',
   '¿Qué tener en cuenta al comprar una fresadora dental de segunda mano?',
   'Horas de uso, mantenimiento, husillo y calibración: las claves para acertar.',
   E'## Horas de uso\n\nLas horas de husillo son el dato más importante...\n\n## Mantenimiento\n\nPide el historial de mantenimiento y las últimas calibraciones.',
   true, now() - interval '3 days'),
  ('como-mantener-tu-escaner-dental-en-perfecto-estado',
   'Cómo mantener tu escáner dental en perfecto estado',
   'Consejos sencillos para alargar la vida útil de tu escáner de laboratorio.',
   E'## Limpieza\n\nUtiliza siempre paños de microfibra...',
   true, now() - interval '11 days'),
  ('ventajas-de-la-impresion-3d-en-el-laboratorio-dental',
   'Ventajas de la impresión 3D en el laboratorio dental',
   'Por qué cada vez más laboratorios incorporan impresoras 3D a su flujo digital.',
   E'## Velocidad\n\nModelos, férulas y guías en cuestión de horas...',
   true, now() - interval '19 days');
