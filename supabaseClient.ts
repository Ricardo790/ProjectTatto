
import { createClient } from '@supabase/supabase-js';

// URL y Key obtenidas de tu configuración de Supabase
const supabaseUrl = 'https://vwlztwoiubrsjdxmfudx.supabase.co';
const supabaseAnonKey = 'sb_publishable_8pm6MIltJX1NAHrsVFe2Vg_BydIfd8y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
