import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ltiifsjomyaoiosjakyv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aWlmc2pvbXlhb2lvc2pha3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTM0OTgsImV4cCI6MjA1NTk4OTQ5OH0.PwwI55JvSQf9t9yTaxnOFnnEBsPXMEZcwJycB9CmMpk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;