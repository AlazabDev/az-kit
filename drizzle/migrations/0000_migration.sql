DROP POLICY IF EXISTS "Brand assets readable by name" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload brand assets" ON storage.objects;
CREATE POLICY "Users can upload own brand assets" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'brand-assets' AND (storage.foldername(name))[1] = (select auth.uid()::text));