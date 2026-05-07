// Using mock client for reliable admin functionality
import { supabase as mockSupabase } from './mock-client';

export const supabase = mockSupabase;