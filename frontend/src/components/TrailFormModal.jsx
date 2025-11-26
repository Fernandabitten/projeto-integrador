import React, { useState, useEffect } from 'react';
import { X, ImageUp, FileUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { createTrail, updateTrail } from '../services/trailsService';
import { getStates, getCitiesByState } from '../services/ibgeService';

const MAX_PHOTOS = 10;

const TrailFormModal = ({ mode, trailData, onClose, onSubmit }) => {
  const isEditing = mode === 'edit';

  // ----------------------------
  // Estados principais
  // ----------------------------
  const [name, setName] = useState(trailData?.name || '');
  const [state, setState] = useState(trailData?.state || '');
  const [city, setCity] = useState(trailData?.city || '');
  const [description, setDescription] = useState(trailData?.description || '');
  const [difficulty, setDifficulty] = useState(trailData?.difficulty || 'Fácil');
  const [photos, setPhotos] = useState(trailData?.photos || []);
  const [newPhotos, setNewPhotos] = useState([]);
  const [gpxFile, setGpxFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [removedPhotos, setRemovedPhotos] = useState([]);

  // Estados da API IBGE
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [_loadingCities, setLoadingCities] = useState(false);

  // ----------------------------
  // Helpers
  // ----------------------------
  const totalPhotos = photos.length + newPhotos.length;
  // Verifica se o GPX é obrigatório e está faltando
  const isGpxMissing = !gpxFile && !(isEditing && trailData?.gpxUrl);

  // ----------------------------
  // Load Estados
  // ----------------------------
  useEffect(() => {
    async function loadStates() {
      try {
        const list = await getStates();
        setStates(list);
      } catch (err) {
        console.error(err);
        toast.error('Erro ao carregar estados');
      }
    }
    loadStates();
  }, []);

  // ----------------------------
  // Load Cidades ao trocar Estado
  // ----------------------------
  useEffect(() => {
    async function loadCities() {
      if (!state) return;
      setLoadingCities(true);

      try {
        const list = await getCitiesByState(state);
        setCities(list);
      } catch (err) {
        console.error(err);
        toast.error('Erro ao carregar cidades');
      } finally {
        setLoadingCities(false);
      }
    }
    loadCities();
  }, [state]);

  // ----------------------------
  // Handlers: Upload
  // ----------------------------
  const handleFileChange = (e, fileType) => {
    const files = Array.from(e.target.files);
    if (fileType === 'photos') {
      const currentTotal = photos.length + newPhotos.length;
      const spaceLeft = MAX_PHOTOS - currentTotal;

      if (spaceLeft <= 0) {
        toast.error(`Limite de ${MAX_PHOTOS} fotos atingido.`);
        e.target.value = null; // Limpa o input
        return;
      }

      const filesToTake = files.slice(0, spaceLeft);

      if (files.length > spaceLeft) {
        toast.error(
          `Apenas ${spaceLeft} fotos adicionais foram anexadas. Limite total é de ${MAX_PHOTOS}.`
        );
      }

      setNewPhotos(prev => [...prev, ...filesToTake]);
      e.target.value = null; // Reseta o valor do input
    } else if (fileType === 'gpx') {
      setGpxFile(files[0]);
    }
  };

  const handleRemovePhoto = (index, isNew, photoObj) => {
    if (isNew) {
      setNewPhotos(newPhotos.filter((_, i) => i !== index));
    } else {
      setRemovedPhotos(prev => [...prev, photoObj.id]); // <-- registrar ID removido
      setPhotos(photos.filter((_, i) => i !== index));
    }
  };

  // ----------------------------
  // Submit
  // ----------------------------
  const handleSubmit = async e => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.id;

    const totalPhotos = photos.length + newPhotos.length;
    if (totalPhotos === 0) {
      toast.error('É obrigatório enviar pelo menos uma foto da trilha.');
      return;
    }
    const hasGpxFile = gpxFile || (isEditing && trailData?.gpxUrl);
    if (!hasGpxFile) {
      toast.error('É obrigatório anexar um arquivo de rota (GPX/KML).');
      return;
    }
    if (totalPhotos > MAX_PHOTOS) {
      toast.error(`O número máximo de fotos permitido é ${MAX_PHOTOS}.`);
      return;
    }

    setIsLoading(true);

    try {
      // Monta FormData
      const form = new FormData();
      // os dados básicos em um campo "data" (JSON)
      const payload = {
        name,
        state,
        city,
        description,
        difficulty,
        userId,
        distance: Number(0),
        removedPhotos,
      };
      form.append('data', JSON.stringify(payload));

      // anexar arquivos de fotos (File objects)
      for (const file of newPhotos) {
        form.append('photos', file, file.name);
      }

      // anexar gpx (se tiver)
      if (gpxFile) {
        form.append('gpx', gpxFile, gpxFile.name);
      }

      // Se estiver editando e não enviou novo gpx, não precisa mandar gpx
      // Também se quiser enviar fotos removidas, você poderia enviar lista de ids removidos etc.

      let savedTrail;
      if (isEditing) {
        // adaptar updateTrail para aceitar multipart (similar ao create)
        savedTrail = await updateTrail(trailData.id, form, true); // sinaliza que é form
      } else {
        savedTrail = await createTrail(form, true); // criado para aceitar FormData
      }

      if (onSubmit) onSubmit(savedTrail, mode);
      onClose();
    } catch (err) {
      console.error('Erro ao cadastrar trilha:', err);
      toast.error('Erro ao cadastrar trilha: ' + (err.message || err));
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  const DifficultyColors = {
    Fácil: 'text-green-500 border-green-500',
    Moderado: 'text-yellow-500 border-yellow-500',
    Difícil: 'text-red-500 border-red-500',
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 font-sans"
      onClick={e => e.stopPropagation()}
    >
      <div
        className="bg-white shadow-2xl w-full h-screen max-h-none overflow-y-auto transform transition-all duration-300 scale-100 rounded-none md:rounded-xl md:max-w-4xl md:max-h-[90vh] md:h-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-start p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold">{isEditing ? 'Editar Trilha' : 'Cadastrar Trilha'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <NavLink to="/minhas-trilhas">
              <X size={24} />
            </NavLink>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campos Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block md:col-span-2">
              <span className="text-gray-700">Nome da Trilha</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
            {/* Estado */}
            <label className="block">
              <span className="text-gray-700">Estado (UF)</span>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Selecione um estado</option>
                {states.map(state => (
                  <option key={state.id} value={state.sigla}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </label>
            {/* Cidade */}
            <label className="block">
              <span className="text-gray-700">Cidade</span>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                disabled={!state}
                required
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-white ${
                  !state ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <option value="">Selecione uma cidade</option>
                {cities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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

          {/* Upload de Fotos - Requisito: 1 a 10 fotos  */}
          <div className="space-y-3">
            <span className="text-gray-700 block">
              Fotos ({totalPhotos} / {MAX_PHOTOS} anexadas)
              {totalPhotos === 0 && (
                <span className="text-red-500 ml-2 text-sm font-semibold">
                  (Obrigatório, min 1)
                </span>
              )}
            </span>
            <div className="flex flex-wrap gap-3">
              {/* Fotos Existentes */}
              {photos.map((photo, index) => (
                <div key={`existing-${index}`} className="relative">
                  <img
                    src={photo.url}
                    alt={`Foto existente ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-green-300"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/80x80/aaaaaa/ffffff?text=X';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index, false, photo)}
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
            {/* Mostra Obrigatório se não houver GPX file E não for edição com arquivo existente */}
            {isGpxMissing && (
              <span className="text-red-500 ml-2 text-sm font-semibold">(Obrigatório)</span>
            )}

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
                {isEditing && trailData?.gpxUrl ? 'Substituir Rota' : 'Anexar Rota (.gpx ou .kml)'}
                <input
                  type="file"
                  onChange={e => handleFileChange(e, 'gpx')}
                  className="hidden"
                  accept=".gpx,.kml"
                />
              </label>
            )}
            {isEditing && trailData?.gpxUrl && !gpxFile && (
              <p className="text-sm text-gray-500">
                Rota atual: {trailData.gpxUrl.split('/').pop()}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:bg-green-400 flex justify-center items-center"
          >
            {' '}
            {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
            {isEditing ? 'Salvar Edição' : 'Cadastrar Trilha'}
            <NavLink to="/minhas-trilhas"></NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrailFormModal;
