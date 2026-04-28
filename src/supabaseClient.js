import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ekqdxxqiwxvuiopdfxor.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcWR4eHFpd3h2dWlvcGRmeG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODU4NTksImV4cCI6MjA5Mjg2MTg1OX0.dtmQsho4q0nxofZcKPoW7-W9Xxekua3if2cD6eyQNw0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
