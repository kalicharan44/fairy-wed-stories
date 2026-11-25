# Fairy Wed Stories — Supabase Configuration Checklist

This is the future setup checklist for an independent Fairy Wed Stories backend. No project has been linked, no SQL has been run, and no Edge Function has been deployed from this checkout.

## 1. Create the independent project

- Create a new Supabase project owned by Fairy Wed Stories and confirm the region with the owner.
- Confirm it is not the JP Events project before running any migration.
- Keep all service-role keys out of frontend variables and source control.
- Save the project URL and publishable key for the local frontend only after the owner supplies them.

## 2. Review and apply the local migrations

Review the ordered files in `supabase/migrations/` against a fresh Fairy project before running them:

1. `202611140001_cms.sql` — CMS tables, relationships, RLS, role helper, and private staging bucket.
2. `202611140002_venue_categories_pricing.sql` — reception venue categories and price fields.
3. `202611140003_fairy_wed_stories_media_bucket.sql` — published-media bucket and admin policies.
4. `202611140004_site_image_slots.sql` — stable visual image slots.
5. `202611220001_social_wall_rows.sql` — social-wall row and sort fields.

The published bucket is explicitly **public**. Every object placed in `fairy-wed-stories-media` can be fetched by URL. Put only approved publishable images there; drafts must stay in the private `cms-staging` bucket. Review this exposure with the project owner before applying the public-bucket migration. Never upload private, unreleased, or personal material to the public bucket.

## 3. Configure authentication

- Keep public sign-up and anonymous sign-in disabled, as set in `supabase/config.toml`.
- Configure the project's site URL and redirect allow-list for the final site plus local development (`http://localhost:5175` and `http://127.0.0.1:5175`). Include `/admin/recovery` as a valid password recovery destination.
- Invite the first administrator from the trusted project owner account and require email confirmation.
- Assign `app_metadata.cms_role = "admin"` using a trusted Supabase Admin API caller. Do not grant admin rights through editable `user_metadata` and do not place a service-role key in the browser.
- Enable TOTP MFA. The app and Edge Functions require an administrator session at assurance level `aal2`.
- Verify the invited administrator can enroll and verify MFA, recover a password, keep a session across reloads, and sign out.

## 4. Configure storage and Edge Functions

- Confirm `cms-staging` is private and the published bucket name is exactly `fairy-wed-stories-media`.
- Review storage policies from the migrations; staging reads and writes are admin-only, and published writes/deletes are admin-only. Public access is read-only through the public published bucket.
- Deploy `finalize-upload`, `publish-content`, `request-media-deletion`, `cleanup-orphan-media`, and `replace-site-image` only to the Fairy project.
- Confirm the functions receive `SUPABASE_URL`, `SUPABASE_ANON_KEY` or `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `CMS_ALLOWED_ORIGINS`. Supabase's built-in secrets may provide the first values; explicitly verify them. `CMS_ALLOWED_ORIGINS` must list only the approved local and production origins.
- Keep JWT verification enabled on every function. The client code uses an authenticated `aal2` administrator session; the service-role key stays server-side.

## 5. Connect the local frontend

Create an ignored `.env.local` from `.env.example` and set only:

```dotenv
VITE_DEMO_MODE=true
VITE_SUPABASE_URL=https://<fairy-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<fairy-project-publishable-key>
```

Do not put a service-role key in a `VITE_` variable. Keep demo mode enabled while verifying read access, sign-in, MFA, uploads to private staging, metadata finalization, publish promotion, public URLs, replacement, deletion, and refresh persistence with owner-approved test images. Only turn demo mode off after the independent backend and approved Fairy content are verified.

## 6. Media workflow verification

- Upload from desktop and a phone-sized browser with one image, then multiple images.
- Confirm client compression, MIME/dimension validation, progress, retry-safe storage paths, preview and metadata persistence.
- Confirm draft images remain private in staging and become public only after publishing.
- Replace an image and verify the previous object is cleaned only when no records reference it.
- Request deletion and confirm the cleanup grace period and orphan cleanup behavior.
- Open published URLs in a signed-out browser and another device.
- Check realtime updates, refresh persistence, and the local fallback behavior during a real service outage.

No production readiness claim is appropriate until every check above passes against the actual Fairy-owned project.
