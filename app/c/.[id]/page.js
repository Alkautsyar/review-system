
import { redirect } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default async function RedirectPage({ params }) {
  // Karena Next.js terbaru, params harus di-await terlebih dahulu
  const resolvedParams = await params
  const { id } = resolvedParams

  const { data, error } = await supabase
    .from('cards')
    .select('target_url')
    .eq('id', id)
    .single()

  if (error || !data || !data.target_url) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', padding: '20px' }}>
        <h2>Kartu Belum Diaktifkan</h2>
        <p>Silakan scan panduan aktivasi di dalam kotak produk untuk menghubungkan kartu ini.</p>
      </div>
    )
  }

  redirect(data.target_url)
}