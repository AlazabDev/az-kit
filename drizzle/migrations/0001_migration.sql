DROP POLICY IF EXISTS "Authenticated users can view all design doc versions" ON public.design_doc_versions;
CREATE POLICY "Users view own design doc versions" ON public.design_doc_versions FOR SELECT TO authenticated USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);