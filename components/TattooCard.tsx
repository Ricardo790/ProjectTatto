
import React, { useState, useEffect } from 'react';
import { Tattoo, Comment } from '../types';
import { supabase } from '../supabaseClient';

interface Props {
  tattoo: Tattoo;
}

const TattooCard: React.FC<Props> = ({ tattoo }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar comentarios desde Supabase
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('tattoo_id', tattoo.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, tattoo.id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from('comments')
      .insert([
        { 
          tattoo_id: tattoo.id, 
          author: name, 
          content: text 
        }
      ]);

    if (!error) {
      setName('');
      setText('');
      fetchComments(); // Recargar lista
    } else {
      alert("Error al publicar comentario. Revisa la consola.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0a0a0a] border-ornamental flex flex-col h-full card-shadow transition-transform hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden border-b border-[#c5a059]/10">
        <img src={tattoo.imageUrl} alt={tattoo.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-serif-bold uppercase tracking-widest text-[#c5a059]">
          {tattoo.style}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-serif-bold text-2xl mb-2 text-[#c5a059]">{tattoo.title}</h3>
        <p className="text-zinc-500 text-sm italic mb-6 leading-relaxed flex-1">
          {tattoo.description}
        </p>
        
        <div className="pt-6 border-t border-[#c5a059]/10">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-[10px] font-serif-bold uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors"
          >
            {showComments ? 'Ocultar Comentarios' : `Ver Comentarios Reales`}
          </button>
          
          {showComments && (
            <div className="mt-6 space-y-6 animate-in fade-in duration-500">
              <form onSubmit={handleAddComment} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Tu Nombre" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212] border border-[#c5a059]/20 p-2 text-xs text-white outline-none focus:border-[#c5a059] transition-colors"
                />
                <textarea 
                  placeholder="Escribe tu opinión pública..." 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#121212] border border-[#c5a059]/20 p-2 text-xs text-white outline-none focus:border-[#c5a059] transition-colors min-h-[60px]"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-wine py-2 text-[10px] uppercase font-serif-bold tracking-widest disabled:opacity-50"
                >
                  {loading ? 'Publicando...' : 'Publicar Comentario'}
                </button>
              </form>
              
              <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {comments.length === 0 ? (
                  <p className="text-[10px] italic opacity-30 text-center py-4">Aún no hay opiniones. ¡Sé el primero en comentar este trabajo!</p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="border-l border-[#c5a059]/40 pl-4 py-2 bg-white/5 rounded-r">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif-bold text-[10px] text-[#c5a059] uppercase">{c.author}</span>
                        <span className="text-[8px] opacity-30">{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 italic leading-snug">"{c.content}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TattooCard;
