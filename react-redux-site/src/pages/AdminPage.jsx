import React from 'react'
import MovieCRUD from '../components/MovieCRUD'
import '../styles/adminPage.css'

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎬 Админ-панель</h1>
        <p>Управление фильмами (CRUD операции)</p>
      </div>
      
      <MovieCRUD />
    </div>
  )
}

export default AdminPage