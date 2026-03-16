SET search_path TO marketplace, public;

INSERT INTO skills (id, slug, name, category)
VALUES
  (1, 'ugc', 'UGC', 'creator'),
  (2, 'reels', 'Reels', 'creator'),
  (3, 'scriptwriting', 'Scriptwriting', 'creator'),
  (4, 'analytics', 'Analytics', 'creator'),
  (5, 'capcut', 'CapCut', 'creator'),
  (6, 'next.js', 'Next.js', 'engineering'),
  (7, 'nestjs', 'NestJS', 'engineering'),
  (8, 'postgresql', 'PostgreSQL', 'engineering'),
  (9, 'redis', 'Redis', 'engineering'),
  (10, 'docker', 'Docker', 'engineering'),
  (11, 'after-effects', 'After Effects', 'design'),
  (12, 'storyboarding', 'Storyboarding', 'design'),
  (13, 'branding', 'Branding', 'design'),
  (14, 'figma', 'Figma', 'design')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, external_auth_provider, external_auth_subject, email, display_name, status, email_verified)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'seed', 'seed-aira', 'aira@example.com', 'Aira Mehta', 'ACTIVE', TRUE),
  ('22222222-2222-2222-2222-222222222222', 'seed', 'seed-ravi', 'ravi@example.com', 'Ravi Kulkarni', 'ACTIVE', TRUE),
  ('33333333-3333-3333-3333-333333333333', 'seed', 'seed-sana', 'sana@example.com', 'Sana Arora', 'ACTIVE', TRUE),
  ('44444444-4444-4444-4444-444444444444', 'seed', 'seed-recruiter', 'ops@prooflane.dev', 'Prooflane Recruiter', 'ACTIVE', TRUE),
  ('55555555-5555-5555-5555-555555555555', 'seed', 'seed-admin', 'admin@prooflane.dev', 'Prooflane Admin', 'ACTIVE', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'FREELANCER'),
  ('22222222-2222-2222-2222-222222222222', 'FREELANCER'),
  ('33333333-3333-3333-3333-333333333333', 'FREELANCER'),
  ('44444444-4444-4444-4444-444444444444', 'RECRUITER'),
  ('55555555-5555-5555-5555-555555555555', 'PLATFORM_ADMIN')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO freelancer_profiles (
  user_id,
  headline,
  bio,
  country_code,
  city,
  time_zone,
  primary_currency,
  hourly_rate_min_minor,
  hourly_rate_max_minor,
  trust_score,
  availability,
  metadata
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'UGC Video Strategist',
    'Creator strategist focused on short-form launch content.',
    'IN',
    'Mumbai',
    'Asia/Kolkata',
    'INR',
    180000,
    350000,
    0.91,
    'OPEN',
    '{"proof":["12 brand reel launches","4.8 average rating","2.1M aggregate views"],"category":"Creator Marketing"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Full-Stack Product Engineer',
    'Builds marketplace and B2B SaaS systems across web and backend.',
    'IN',
    'Bengaluru',
    'Asia/Kolkata',
    'INR',
    300000,
    600000,
    0.95,
    'LIMITED',
    '{"proof":["Shipped 3 SaaS marketplaces","99.95% uptime on prior platform","Open-source maintainer"],"category":"Software Engineering"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Motion Designer',
    'Motion and campaign designer with brand storytelling focus.',
    'AE',
    'Dubai',
    'Asia/Dubai',
    'INR',
    250000,
    420000,
    0.88,
    'OPEN',
    '{"proof":["Behance feature","14 campaign explainers","92% repeat client rate"],"category":"Design"}'::jsonb
  )
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO user_skills (user_id, skill_id, proficiency, years_experience)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 5, 4.0),
  ('11111111-1111-1111-1111-111111111111', 2, 5, 4.0),
  ('11111111-1111-1111-1111-111111111111', 3, 4, 3.0),
  ('11111111-1111-1111-1111-111111111111', 4, 4, 3.0),
  ('11111111-1111-1111-1111-111111111111', 5, 4, 3.0),
  ('22222222-2222-2222-2222-222222222222', 6, 5, 6.0),
  ('22222222-2222-2222-2222-222222222222', 7, 5, 5.0),
  ('22222222-2222-2222-2222-222222222222', 8, 5, 6.0),
  ('22222222-2222-2222-2222-222222222222', 9, 4, 4.0),
  ('22222222-2222-2222-2222-222222222222', 10, 4, 4.0),
  ('33333333-3333-3333-3333-333333333333', 2, 4, 3.0),
  ('33333333-3333-3333-3333-333333333333', 11, 5, 5.0),
  ('33333333-3333-3333-3333-333333333333', 12, 4, 4.0),
  ('33333333-3333-3333-3333-333333333333', 13, 5, 4.0),
  ('33333333-3333-3333-3333-333333333333', 14, 4, 4.0)
ON CONFLICT (user_id, skill_id) DO NOTHING;

INSERT INTO organizations (id, name, slug, description, country_code, billing_email, verified_status, created_by_user_id)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Northstar D2C',
    'northstar-d2c',
    'D2C consumer brand operating creator-led launches.',
    'IN',
    'finance@northstar.example',
    'VERIFIED',
    '44444444-4444-4444-4444-444444444444'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Prooflane Labs',
    'prooflane-labs',
    'Internal operating entity for the marketplace build.',
    'IN',
    'finance@prooflane.dev',
    'VERIFIED',
    '44444444-4444-4444-4444-444444444444'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO organization_memberships (organization_id, user_id, membership_role)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'RECRUITER'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'OWNER')
ON CONFLICT (organization_id, user_id) DO NOTHING;

INSERT INTO portfolio_projects (
  id,
  user_id,
  title,
  slug,
  summary,
  description,
  source_type,
  visibility,
  is_featured
)
VALUES
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Aira Social Reels',
    'aira-social-reels',
    'Creator-led launch reel portfolio.',
    'Proof-led campaign work for consumer launches.',
    'MANUAL',
    'PUBLIC',
    TRUE
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '22222222-2222-2222-2222-222222222222',
    'Ravi Next.js Platforms',
    'ravi-nextjs-platforms',
    'Marketplace and SaaS platform portfolio.',
    'Marketplace and SaaS product engineering work.',
    'MANUAL',
    'PUBLIC',
    TRUE
  ),
  (
    '77777777-7777-7777-7777-777777777777',
    '33333333-3333-3333-3333-333333333333',
    'Sana Brand Motion',
    'sana-brand-motion',
    'Motion design portfolio.',
    'Brand motion and campaign visual storytelling.',
    'MANUAL',
    'PUBLIC',
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO verification_checks (id, user_id, verification_type, provider, status, requested_at, verified_at)
VALUES
  (
    '88888888-8888-8888-8888-888888888881',
    '11111111-1111-1111-1111-111111111111',
    'identity',
    'manual',
    'VERIFIED',
    NOW(),
    NOW()
  ),
  (
    '88888888-8888-8888-8888-888888888882',
    '22222222-2222-2222-2222-222222222222',
    'identity',
    'manual',
    'VERIFIED',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO jobs (
  id,
  organization_id,
  created_by_user_id,
  title,
  slug,
  description,
  job_category,
  work_type,
  location_type,
  country_code,
  city,
  time_zone,
  budget_currency,
  budget_min_minor,
  budget_max_minor,
  requires_verified_badge,
  status,
  requirements_json
)
VALUES
  (
    '99999999-9999-9999-9999-999999999991',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    'Launch 20 creator-led product reels',
    'creator-led-launch-reels',
    'Need a freelancer who can concept, script, and deliver high-converting launch reels for a skincare brand.',
    'creator-marketing',
    'FIXED_PRICE',
    'REMOTE',
    'IN',
    'Mumbai',
    'Asia/Kolkata',
    'INR',
    150000,
    400000,
    FALSE,
    'OPEN',
    '{"proofSignals":["brand launches","short-form performance","creator portfolio"]}'::jsonb
  ),
  (
    '99999999-9999-9999-9999-999999999992',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '44444444-4444-4444-4444-444444444444',
    'Build the first marketplace MVP',
    'marketplace-platform-mvp',
    'Looking for a full-stack engineer to build Next.js, NestJS, PostgreSQL, and Redis foundations with AI matching hooks.',
    'software-engineering',
    'FIXED_PRICE',
    'REMOTE',
    'IN',
    'Bengaluru',
    'Asia/Kolkata',
    'INR',
    250000,
    650000,
    TRUE,
    'OPEN',
    '{"proofSignals":["marketplace builds","B2B SaaS","infra ownership"]}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO job_skills (job_id, skill_id, weight, is_required)
VALUES
  ('99999999-9999-9999-9999-999999999991', 1, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999991', 2, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999991', 3, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999991', 4, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999992', 6, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999992', 7, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999992', 8, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999992', 9, 1.0, TRUE),
  ('99999999-9999-9999-9999-999999999992', 10, 1.0, TRUE)
ON CONFLICT (job_id, skill_id) DO NOTHING;
