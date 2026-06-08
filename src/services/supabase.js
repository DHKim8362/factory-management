import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqieritwihsgeifjoqcf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxaWVyaXR3aWhzZ2VpZmpvcWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDkxMzgsImV4cCI6MjA5NjQ4NTEzOH0.vRDbRGiDusqgf2bsVOONxt5nFLlzy05oqwPF80dfAkc'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)