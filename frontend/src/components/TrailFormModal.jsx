import React, { useState } from 'react';
import { X, ImageUp, FileUp, Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { createTrail } from '../services/trailsService';

const TrailFormModal = ({ mode, trailData, onClose, onSubmit }) => {
  const isEditing = mode === 'edit';
  const [name, setName] = useState(trailData?.name || '');
  const [state, setState] = useState(trailData?.state || '');
  const [city, setCity] = useState(trailData?.city || '');
  const [description, setDescription] = useState(trailData?.description || '');
  const [difficulty, setDifficulty] = useState(trailData?.difficulty || 'Fácil');
  const [photos, setPhotos] = useState(trailData?.photos || []); // URLs/Paths (simulados)
  const [newPhotos, setNewPhotos] = useState([]); // File objects
  const [gpxFile, setGpxFile] = useState(null); // File object
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e, fileType) => {
    const files = Array.from(e.target.files);
    if (fileType === 'photos') {
      //TODO: Aqui fazer o upload imediato (ex.Supabase) e obter os paths/urls (Diagrama de sequencia 8)
      setNewPhotos(files);
    } else if (fileType === 'gpx') {
      //TODO: Aqui fazer o upload imediato (ex.Supabase) e obter os paths/urls (Diagrama de sequencia 8)
      setGpxFile(files[0]);
    }
  };

  // Simula criação de um ID único (TODO: vira do back ou Supabase)
  const generateId = () => `p-${crypto.randomUUID()}`;

  // Mapeia as novas fotos para o formato esperado
  const formattedNewPhotos = newPhotos.map((file, i) => {
    const id = generateId();
    const fileName = file.name.replace(/\s+/g, '_');
    const path = `/uploads/photos/${fileName}`;
    const url = `https://placehold.co/400x300/609072/ffffff?text=${encodeURIComponent(file.name)}`;
    return {
      id,
      url,
      path,
      trailId: trailData?.id || `t-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
  });

  const handleRemovePhoto = (index, isNew) => {
    if (isNew) {
      setNewPhotos(newPhotos.filter((_, i) => i !== index));
    } else {
      // Simula a exclusão de uma foto existente no Storage/DB (Diagrama de sequencia 10)
      setPhotos(photos.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const trailPayload = {
      name,
      state,
      city,
      description,
      difficulty,
      photos: [...formattedNewPhotos],
      filePath: gpxFile ? `gpx/${gpxFile.name}` : null,
      userId: 'mocked-user-id',
      distance: 'N/A',
    };

    try {
      const newTrail = await createTrail(trailPayload);
      console.log('✅ Trilha criada:', newTrail);

      // opcional: notificar o componente pai
      if (onSubmit) onSubmit(newTrail, mode);

      onClose();
    } catch (err) {
      console.error('Erro ao cadastrar trilha:', err);
      alert('Erro ao cadastrar trilha: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const DifficultyColors = {
    Fácil: 'text-green-500 border-green-500',
    Moderado: 'text-yellow-500 border-yellow-500',
    Difícil: 'text-red-500 border-red-500',
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 font-sans"
      onClick={onClose}
    >
      <div
        // className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        className="bg-white shadow-2xl w-full h-screen max-h-none overflow-y-auto transform transition-all duration-300 scale-100 rounded-none md:rounded-xl md:max-w-4xl md:max-h-[90vh] md:h-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-start p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Trilha' : 'Cadastrar Trilha'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <NavLink to="/minhas-trilhas">
              <X size={24} />
            </NavLink>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campos Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Nome da Trilha</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Estado (UF)</span>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-gray-700">Cidade</span>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-gray-700">Descrição</span>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows="3"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </label>

          {/* Dificuldade */}
          <div className="block">
            <span className="text-gray-700 mb-2 block">Dificuldade</span>
            <div className="flex space-x-4">
              {['Fácil', 'Moderado', 'Difícil'].map(level => (
                <label key={level} className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={() => setDifficulty(level)}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <span className={`ml-2 font-medium ${DifficultyColors[level]}`}>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upload de Fotos */}
          <div className="space-y-3">
            <span className="text-gray-700 block">
              Fotos ({photos.length + newPhotos.length} anexadas)
            </span>
            <div className="flex flex-wrap gap-3">
              {/* Fotos Existentes */}
              {photos.map((photoUrl, index) => (
                <div key={`existing-${index}`} className="relative">
                  <img
                    src={photoUrl}
                    alt={`Foto existente ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-green-300"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/80x80/aaaaaa/ffffff?text=X';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index, false)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 leading-none text-xs"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {/* Novas Fotos */}
              {newPhotos.map((file, index) => (
                <div key={`new-${index}`} className="relative">
                  <div className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-700 rounded-lg border border-dashed border-green-500 text-xs text-center p-1 overflow-hidden">
                    {file.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index, true)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 leading-none text-xs"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-green-300 text-green-600 rounded-lg cursor-pointer hover:bg-green-50 transition">
              <ImageUp size={20} className="mr-2" />
              Anexar novas Fotos (Upload Múltiplo)
              <input
                type="file"
                multiple
                onChange={e => handleFileChange(e, 'photos')}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {/* Upload de Arquivo GPX/KML */}
          <div className="space-y-3">
            <span className="text-gray-700 block">Arquivo de Rota (GPX/KML)</span>
            {gpxFile && (
              <div className="flex items-center justify-between p-2 border rounded-lg bg-green-50">
                <span className="text-sm text-green-800 truncate">{gpxFile.name}</span>
                <button
                  type="button"
                  onClick={() => setGpxFile(null)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            {!gpxFile && (
              <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <FileUp size={20} className="mr-2" />
                {isEditing && trailData?.arquivo_url
                  ? 'Substituir Rota'
                  : 'Anexar Rota (.gpx ou .kml)'}
                <input
                  type="file"
                  onChange={e => handleFileChange(e, 'gpx')}
                  className="hidden"
                  accept=".gpx,.kml"
                />
              </label>
            )}
            {isEditing && trailData?.arquivo_url && !gpxFile && (
              <p className="text-sm text-gray-500">
                Rota atual: {trailData.arquivo_url.split('/').pop()}
              </p>
            )}
          </div>

          {/* Botão de Envio (Diagramas 8 e 9) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:bg-green-400 flex justify-center items-center"
          >
            {' '}
            {/* <NavLink to="/minhas-trilhas"> */}
            {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
            {isEditing ? 'Salvar Edição' : 'Cadastrar Trilha'}
            {/* </NavLink> */}
            <NavLink to="/minhas-trilhas"></NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrailFormModal;
