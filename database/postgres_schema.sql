CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE SCHEMA IF NOT EXISTS marketplace;
SET search_path TO marketplace, public;

CREATE TYPE user_status AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');
CREATE TYPE role_code AS ENUM ('FREELANCER', 'BRAND_ADMIN', 'RECRUITER', 'FINANCE', 'SUPPORT', 'PLATFORM_ADMIN');
CREATE TYPE availability_status AS ENUM ('OPEN', 'LIMITED', 'UNAVAILABLE');
CREATE TYPE verification_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');
CREATE TYPE subscription_status AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED');
CREATE TYPE payment_provider AS ENUM ('STRIPE', 'RAZORPAY');
CREATE TYPE portfolio_source_type AS ENUM ('MANUAL', 'UPLOAD', 'GITHUB', 'BEHANCE', 'LINKEDIN');
CREATE TYPE visibility_scope AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');
CREATE TYPE asset_kind AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'LINK', 'CODE_REPO', 'AUDIO');
CREATE TYPE storage_provider AS ENUM ('S3', 'CLOUDINARY', 'EXTERNAL');
CREATE TYPE moderation_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FLAGGED');
CREATE TYPE job_status AS ENUM ('DRAFT', 'OPEN', 'PAUSED', 'CLOSED', 'FILLED', 'CANCELLED');
CREATE TYPE job_type AS ENUM ('FIXED_PRICE', 'HOURLY', 'RETAINER');
CREATE TYPE location_mode AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');
CREATE TYPE proposal_status AS ENUM ('SUBMITTED', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED');
CREATE TYPE contract_status AS ENUM ('ACTIVE', 'COMPLETED', 'TERMINATED', 'DISPUTED', 'CANCELLED');
CREATE TYPE milestone_status AS ENUM ('PENDING_FUNDING', 'FUNDED', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'RELEASED', 'DISPUTED', 'CANCELLED');
CREATE TYPE escrow_status AS ENUM ('PENDING', 'PARTIALLY_FUNDED', 'FUNDED', 'RELEASING', 'RELEASED', 'REFUNDED', 'DISPUTED', 'CLOSED');
CREATE TYPE payment_status AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'HELD', 'RELEASED', 'REFUNDED', 'FAILED', 'DISPUTED');
CREATE TYPE transaction_direction AS ENUM ('DEBIT', 'CREDIT');
CREATE TYPE escrow_transaction_type AS ENUM ('FUND', 'HOLD', 'RELEASE', 'REFUND', 'FEE', 'PAYOUT', 'REVERSAL');
CREATE TYPE chat_thread_type AS ENUM ('DIRECT', 'JOB_ROOM', 'CONTRACT_ROOM', 'SUPPORT');
CREATE TYPE message_type AS ENUM ('TEXT', 'FILE', 'SYSTEM', 'TASK');
CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'BLOCKED');
CREATE TYPE moderation_source AS ENUM ('AI', 'HUMAN', 'SYSTEM');
CREATE TYPE external_account_provider AS ENUM ('GITHUB', 'BEHANCE', 'LINKEDIN', 'DRIBBBLE', 'OTHER');

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_auth_provider TEXT NOT NULL,
    external_auth_subject TEXT NOT NULL UNIQUE,
    email CITEXT NOT NULL UNIQUE,
    phone_e164 TEXT,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    status user_status NOT NULL DEFAULT 'ACTIVE',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role role_code NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, role)
);

CREATE TABLE freelancer_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    headline TEXT,
    bio TEXT,
    country_code CHAR(2),
    city TEXT,
    time_zone TEXT,
    primary_currency CHAR(3) NOT NULL DEFAULT 'INR',
    hourly_rate_min_minor BIGINT,
    hourly_rate_max_minor BIGINT,
    visibility_score NUMERIC(8,4) NOT NULL DEFAULT 1.0000,
    trust_score NUMERIC(8,4) NOT NULL DEFAULT 0.0000,
    profile_completion_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    availability availability_status NOT NULL DEFAULT 'OPEN',
    open_to_relocate BOOLEAN NOT NULL DEFAULT FALSE,
    response_rate NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    average_rating NUMERIC(3,2) NOT NULL DEFAULT 0.00,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    completed_contracts_count INTEGER NOT NULL DEFAULT 0,
    featured_until TIMESTAMPTZ,
    ai_summary TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT freelancer_rate_bounds_chk
        CHECK (
            hourly_rate_min_minor IS NULL
            OR hourly_rate_max_minor IS NULL
            OR hourly_rate_min_minor <= hourly_rate_max_minor
        )
);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    country_code CHAR(2),
    billing_email CITEXT,
    verified_status verification_status NOT NULL DEFAULT 'PENDING',
    created_by_user_id UUID REFERENCES users(id),
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE organization_memberships (
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    membership_role TEXT NOT NULL CHECK (membership_role IN ('OWNER', 'ADMIN', 'RECRUITER', 'FINANCE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE subscription_plans (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    monthly_price_minor BIGINT NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    proposal_limit INTEGER,
    commission_bps INTEGER NOT NULL,
    visibility_multiplier NUMERIC(4,2) NOT NULL,
    early_access_hours INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT subscription_plan_values_chk
        CHECK (
            monthly_price_minor >= 0
            AND commission_bps >= 0
            AND visibility_multiplier >= 1.00
            AND early_access_hours >= 0
        )
);

INSERT INTO subscription_plans (code, name, monthly_price_minor, currency, proposal_limit, commission_bps, visibility_multiplier, early_access_hours)
VALUES
    ('FREE', 'Free', 0, 'INR', 10, 1000, 1.00, 0),
    ('PRO', 'Pro', 9900, 'INR', 100, 1000, 2.00, 0),
    ('ELITE', 'Elite', 49900, 'INR', NULL, 500, 5.00, 48);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    plan_code TEXT NOT NULL REFERENCES subscription_plans(code),
    provider payment_provider,
    provider_customer_ref TEXT,
    provider_subscription_ref TEXT,
    status subscription_status NOT NULL DEFAULT 'ACTIVE',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT subscription_owner_chk CHECK ((user_id IS NOT NULL) <> (organization_id IS NOT NULL))
);

CREATE TABLE user_usage_counters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric_code TEXT NOT NULL,
    plan_code TEXT NOT NULL REFERENCES subscription_plans(code),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    used_count INTEGER NOT NULL DEFAULT 0,
    limit_count INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, metric_code, period_start),
    CONSTRAINT usage_counter_period_chk CHECK (period_end >= period_start)
);

CREATE TABLE skills (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_skills (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency SMALLINT CHECK (proficiency BETWEEN 1 AND 5),
    years_experience NUMERIC(4,1),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    asset_type asset_kind NOT NULL,
    storage_type storage_provider NOT NULL,
    bucket_name TEXT,
    object_key TEXT,
    public_url TEXT,
    thumbnail_url TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    width_px INTEGER,
    height_px INTEGER,
    duration_sec NUMERIC(10,2),
    sha256 TEXT,
    transcript_text TEXT,
    ocr_text TEXT,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    moderation_state moderation_status NOT NULL DEFAULT 'PENDING',
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE external_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider external_account_provider NOT NULL,
    external_handle TEXT,
    external_url TEXT,
    access_scope TEXT,
    last_synced_at TIMESTAMPTZ,
    sync_status TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, provider, external_handle)
);

CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    primary_role TEXT,
    project_url TEXT,
    source_type portfolio_source_type NOT NULL DEFAULT 'MANUAL',
    source_reference TEXT,
    visibility visibility_scope NOT NULL DEFAULT 'PUBLIC',
    started_on DATE,
    completed_on DATE,
    team_size INTEGER,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    ai_summary TEXT,
    engagement_metrics JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, slug),
    CONSTRAINT portfolio_project_dates_chk CHECK (completed_on IS NULL OR started_on IS NULL OR completed_on >= started_on)
);

CREATE TABLE portfolio_project_assets (
    project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    caption TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (project_id, asset_id)
);

CREATE TABLE portfolio_project_skills (
    project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    weight NUMERIC(5,2) NOT NULL DEFAULT 1.00,
    PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    created_by_user_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    job_category TEXT,
    work_type job_type NOT NULL,
    location_type location_mode NOT NULL DEFAULT 'REMOTE',
    country_code CHAR(2),
    city TEXT,
    time_zone TEXT,
    budget_currency CHAR(3) NOT NULL DEFAULT 'INR',
    budget_min_minor BIGINT,
    budget_max_minor BIGINT,
    proposal_deadline TIMESTAMPTZ,
    early_access_until TIMESTAMPTZ,
    start_date DATE,
    duration_weeks INTEGER,
    requires_verified_badge BOOLEAN NOT NULL DEFAULT FALSE,
    status job_status NOT NULL DEFAULT 'DRAFT',
    ai_summary TEXT,
    custom_questions JSONB NOT NULL DEFAULT '[]'::JSONB,
    requirements_json JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, slug),
    CONSTRAINT job_budget_bounds_chk
        CHECK (
            budget_min_minor IS NULL
            OR budget_max_minor IS NULL
            OR budget_min_minor <= budget_max_minor
        )
);

CREATE TABLE job_assets (
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (job_id, asset_id)
);

CREATE TABLE job_skills (
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    weight NUMERIC(5,2) NOT NULL DEFAULT 1.00,
    is_required BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (job_id, skill_id)
);

CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    freelancer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status proposal_status NOT NULL DEFAULT 'SUBMITTED',
    cover_letter TEXT,
    pitch_asset_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    quote_currency CHAR(3) NOT NULL DEFAULT 'INR',
    quote_amount_min_minor BIGINT,
    quote_amount_max_minor BIGINT,
    estimated_duration_days INTEGER,
    match_score NUMERIC(8,5),
    rerank_score NUMERIC(8,5),
    hard_constraint_score NUMERIC(8,5),
    llm_match_percentage NUMERIC(5,2),
    visibility_multiplier NUMERIC(6,2) NOT NULL DEFAULT 1.00,
    subscription_plan_code TEXT REFERENCES subscription_plans(code),
    answers JSONB NOT NULL DEFAULT '{}'::JSONB,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    withdrawn_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (job_id, freelancer_user_id),
    CONSTRAINT proposal_quote_bounds_chk
        CHECK (
            quote_amount_min_minor IS NULL
            OR quote_amount_max_minor IS NULL
            OR quote_amount_min_minor <= quote_amount_max_minor
        )
);

CREATE TABLE proposal_assets (
    proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (proposal_id, asset_id)
);

CREATE TABLE job_candidate_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    freelancer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vector_score NUMERIC(8,5) NOT NULL,
    rerank_score NUMERIC(8,5),
    trust_score NUMERIC(8,5),
    hard_constraint_score NUMERIC(8,5),
    final_score NUMERIC(8,5) NOT NULL,
    match_explanation JSONB NOT NULL DEFAULT '{}'::JSONB,
    top_evidence JSONB NOT NULL DEFAULT '[]'::JSONB,
    computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (job_id, freelancer_user_id)
);

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id),
    proposal_id UUID NOT NULL UNIQUE REFERENCES proposals(id),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    freelancer_user_id UUID NOT NULL REFERENCES users(id),
    status contract_status NOT NULL DEFAULT 'ACTIVE',
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    agreed_amount_minor BIGINT NOT NULL,
    commission_bps INTEGER NOT NULL,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT contract_amount_chk CHECK (agreed_amount_minor >= 0)
);

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    sequence_no SMALLINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    amount_minor BIGINT NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    due_at TIMESTAMPTZ,
    status milestone_status NOT NULL DEFAULT 'PENDING_FUNDING',
    funded_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    released_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (contract_id, sequence_no),
    CONSTRAINT milestone_amount_chk CHECK (amount_minor >= 0)
);

CREATE TABLE milestone_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    submitted_by_user_id UUID NOT NULL REFERENCES users(id),
    asset_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE escrow_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL UNIQUE REFERENCES contracts(id) ON DELETE CASCADE,
    provider payment_provider NOT NULL,
    provider_escrow_ref TEXT,
    status escrow_status NOT NULL DEFAULT 'PENDING',
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    total_funded_minor BIGINT NOT NULL DEFAULT 0,
    total_released_minor BIGINT NOT NULL DEFAULT 0,
    total_refunded_minor BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    escrow_account_id UUID NOT NULL REFERENCES escrow_accounts(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    direction transaction_direction NOT NULL,
    transaction_type escrow_transaction_type NOT NULL,
    provider_event_ref TEXT,
    amount_minor BIGINT NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    status payment_status NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT escrow_transaction_amount_chk CHECK (amount_minor >= 0)
);

CREATE TABLE payout_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider payment_provider NOT NULL,
    provider_account_ref TEXT NOT NULL,
    account_label TEXT,
    status verification_status NOT NULL DEFAULT 'PENDING',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE chat_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_type chat_thread_type NOT NULL,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    created_by_user_id UUID REFERENCES users(id),
    last_message_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chat_thread_scope_chk
        CHECK (
            job_id IS NOT NULL
            OR contract_id IS NOT NULL
            OR thread_type IN ('DIRECT', 'SUPPORT')
        )
);

CREATE TABLE chat_participants (
    thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    last_read_message_id UUID,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    muted_until TIMESTAMPTZ,
    PRIMARY KEY (thread_id, user_id)
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
    sender_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message_kind message_type NOT NULL DEFAULT 'TEXT',
    body TEXT,
    reply_to_message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

ALTER TABLE chat_participants
    ADD CONSTRAINT chat_participants_last_read_fk
    FOREIGN KEY (last_read_message_id) REFERENCES chat_messages(id) ON DELETE SET NULL;

CREATE TABLE chat_message_assets (
    message_id UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (message_id, asset_id)
);

CREATE TABLE collaboration_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID REFERENCES chat_threads(id) ON DELETE SET NULL,
    contract_id UUID REFERENCES contracts(id) ON DELETE SET NULL,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    created_by_user_id UUID NOT NULL REFERENCES users(id),
    assignee_user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'TODO',
    priority SMALLINT NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    due_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    reviewer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (contract_id, reviewer_user_id)
);

CREATE TABLE verification_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL,
    provider TEXT,
    status verification_status NOT NULL DEFAULT 'PENDING',
    reference_id TEXT,
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    CONSTRAINT verification_subject_chk CHECK ((user_id IS NOT NULL) <> (organization_id IS NOT NULL))
);

CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    policy_version TEXT NOT NULL,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, consent_type, policy_version)
);

CREATE TABLE moderation_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    source moderation_source NOT NULL,
    reason_code TEXT NOT NULL,
    severity SMALLINT NOT NULL CHECK (severity BETWEEN 1 AND 5),
    status TEXT NOT NULL DEFAULT 'OPEN',
    details JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::JSONB,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_service TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    prize_pool_currency CHAR(3) DEFAULT 'USD',
    prize_pool_amount BIGINT,
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE competition_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    github_url TEXT,
    figma_url TEXT,
    live_url TEXT,
    ai_score NUMERIC(5,2),
    ai_feedback JSONB NOT NULL DEFAULT '{}'::JSONB,
    status TEXT NOT NULL DEFAULT 'SUBMITTED',
    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(competition_id, user_id)
);

CREATE INDEX idx_users_status ON users (status);
CREATE INDEX idx_freelancer_profiles_availability ON freelancer_profiles (availability);
CREATE INDEX idx_freelancer_profiles_country ON freelancer_profiles (country_code);
CREATE INDEX idx_organization_memberships_user ON organization_memberships (user_id);
CREATE INDEX idx_subscriptions_user_status ON subscriptions (user_id, status);
CREATE INDEX idx_subscriptions_org_status ON subscriptions (organization_id, status);
CREATE INDEX idx_user_usage_counters_lookup ON user_usage_counters (user_id, metric_code, period_start DESC);
CREATE INDEX idx_user_skills_skill ON user_skills (skill_id);
CREATE INDEX idx_media_assets_owner_created ON media_assets (owner_user_id, created_at DESC);
CREATE INDEX idx_media_assets_metadata_gin ON media_assets USING GIN (metadata);
CREATE INDEX idx_external_accounts_provider ON external_accounts (provider, sync_status);
CREATE INDEX idx_portfolio_projects_user_featured ON portfolio_projects (user_id, is_featured DESC, created_at DESC);
CREATE INDEX idx_jobs_org_status_created ON jobs (organization_id, status, created_at DESC);
CREATE INDEX idx_jobs_status_deadline ON jobs (status, proposal_deadline);
CREATE INDEX idx_job_skills_skill ON job_skills (skill_id, is_required);
CREATE INDEX idx_proposals_job_status ON proposals (job_id, status, submitted_at DESC);
CREATE INDEX idx_proposals_freelancer_created ON proposals (freelancer_user_id, created_at DESC);
CREATE INDEX idx_job_candidate_matches_rank ON job_candidate_matches (job_id, final_score DESC);
CREATE INDEX idx_contracts_freelancer_status ON contracts (freelancer_user_id, status);
CREATE INDEX idx_contracts_org_status ON contracts (organization_id, status);
CREATE INDEX idx_milestones_contract_status ON milestones (contract_id, status, sequence_no);
CREATE INDEX idx_escrow_transactions_escrow_created ON escrow_transactions (escrow_account_id, created_at DESC);
CREATE INDEX idx_chat_threads_job ON chat_threads (job_id);
CREATE INDEX idx_chat_threads_contract ON chat_threads (contract_id);
CREATE INDEX idx_chat_messages_thread_created ON chat_messages (thread_id, created_at DESC);
CREATE INDEX idx_collaboration_tasks_assignee_status ON collaboration_tasks (assignee_user_id, status);
CREATE INDEX idx_reviews_reviewee_created ON reviews (reviewee_user_id, created_at DESC);
CREATE INDEX idx_verification_checks_status ON verification_checks (status, requested_at DESC);
CREATE INDEX idx_moderation_flags_entity ON moderation_flags (entity_type, entity_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications (user_id, read_at, created_at DESC);
CREATE INDEX idx_audit_logs_entity_created ON audit_logs (entity_type, entity_id, created_at DESC);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_freelancer_profiles_updated_at
BEFORE UPDATE ON freelancer_profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_user_usage_counters_updated_at
BEFORE UPDATE ON user_usage_counters
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_media_assets_updated_at
BEFORE UPDATE ON media_assets
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_external_accounts_updated_at
BEFORE UPDATE ON external_accounts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_portfolio_projects_updated_at
BEFORE UPDATE ON portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_proposals_updated_at
BEFORE UPDATE ON proposals
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_contracts_updated_at
BEFORE UPDATE ON contracts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_milestones_updated_at
BEFORE UPDATE ON milestones
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_escrow_accounts_updated_at
BEFORE UPDATE ON escrow_accounts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_payout_accounts_updated_at
BEFORE UPDATE ON payout_accounts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_chat_threads_updated_at
BEFORE UPDATE ON chat_threads
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_collaboration_tasks_updated_at
BEFORE UPDATE ON collaboration_tasks
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
