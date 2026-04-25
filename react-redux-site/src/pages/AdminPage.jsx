import React from 'react'
import MovieCRUD from '../components/MovieCRUD'

const AdminPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#4fc3f7', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          🛠️ Админ-панель
        </h1>
        <p style={{ color: '#94a3b8' }}>Управление фильмами (CRUD операции)</p>
      </div>
      <MovieCRUD />
    </div>
  )
}

export default AdminPage