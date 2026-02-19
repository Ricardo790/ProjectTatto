
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * INSTRUCCIONES PARA TU CAPTURA:
 * 1. supabaseUrl: Búscala en Settings > API (suele estar arriba de las llaves).
 *    Tiene este aspecto: https://tu-id-de-proyecto.supabase.co
 * 
 * 2. supabaseAnonKey: Es la que ves en tu captura como "Publishable key" (default).
 *    Copia el código que empieza por 'sb_publishable_...'
 */

const supabaseUrl = 'https://vwlztwoiubrsjdxmfudx.supabase.co';
const supabaseAnonKey = 'sb_publishable_8pm6MIltJX1NAHrsVFe2Vg_BydIfd8y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
