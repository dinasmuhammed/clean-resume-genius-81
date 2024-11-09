import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xiqjwzpwvgxnakosfihaa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcWp3enB3dmd4bmFrb3NmaWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNTE4NTcsImV4cCI6MjA0NjcyNzg1N30.8dwJx5SyRHl1PU4c-6dc3y-ulb34Ek6fzl4nvNRyS9g';

export const supabase = createClient(supabaseUrl, supabaseKey);