'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function ActivatePage() {
  const [cardId, setCardId] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [pin, setPin] = useState('')
  const [phone, setPhone] = useState('')
  const [targetUrl, setTargetUrl] = useState('')
  const [message, setMessage] = useState('')

  const handleActivate = async (e) => {
    e.preventDefault()
    setMessage('Menyimpan data...')

    const { error } = await supabase
      .from('cards')
      .upsert({ 
        id: cardId, 
        business_name: businessName,
        pin: pin,
        phone: phone,
        target_url: targetUrl 
      })

    if (error) {
      setMessage('Gagal mengaktifkan: ' + error.message)
    } else {
      setMessage('Berhasil! Kartu Anda sekarang sudah aktif.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#2f3030', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Tombol Bahasa */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '20px' }}>
          <span style={{ background: '#0070f3', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ID</span>
          <span style={{ background: '#eee', color: '#666', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>EN</span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>Aktivasi Kartu</h2>
        <p style={{ color: '#ffffff', fontSize: '14px', marginBottom: '25px' }}>Isi semua kolom di bawah untuk mengaktifkan kartu.</p>

        <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* ID Kartu */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>ID Kartu / Kode Unik</label>
            <input 
              type="text" 
              value={cardId} 
              onChange={(e) => setCardId(e.target.value)} 
              placeholder="Contoh: card-001"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Nama Bisnis */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>Nama Bisnis</label>
            <input 
              type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              placeholder="Nama bisnis + kota"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Buat PIN */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>Buat PIN (4 Digit Angka)</label>
            <input 
              type="password" 
              maxLength="4"
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              placeholder="••••"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', letterSpacing: '4px' }}
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>Nomor HP (untuk pemulihan PIN)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ebeaea', background: '#666', fontSize: '14px' }}>
                <option>ID +62</option>
              </select>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="812 3456 789"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            <p style={{ fontSize: '11px', color: '#888', marginTop: '4px', lineHeight: '1.4' }}>
              Dipakai hanya kalau Anda lupa PIN: masukkan nomor ini di halaman edit untuk membuat PIN baru. Tidak dipakai untuk promosi.
            </p>
          </div>

          {/* Link Google Maps */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>Link Google Maps Review Toko</label>
            <input 
              type="url" 
              value={targetUrl} 
              onChange={(e) => setTargetUrl(e.target.value)} 
              placeholder="https://g.page/r/..."
              required
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tombol Submit */}
          <button type="submit" style={{ width: '100%', marginTop: '10px', padding: '14px', background: '#157188', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,112,243,0.3)' }}>
            Aktifkan Kartu
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: '500', fontSize: '13px', color: message.includes('Berhasil') ? 'green' : '#d9534f' }}>{message}</p>}
      </div>
    </div>
  )
}